/**
 * SIAP SATPOL PP LEMBATA | Penerima evaluasi v1.17.0
 * Tempel kode ini di Apps Script dari akun pemilik spreadsheet, lalu Deploy > Web app.
 * Jalankan sebagai: Me; Akses: Anyone. Jangan bagikan alamat spreadsheet kepada peserta.
 * Peringatan: endpoint kirim publik; lakukan pemantauan spam berkala.
 */
var SIAP_SHEET_ID = '1e0fI7UigqdM3nNdHU1ulbYGkKFM5m9iOPdVHiZ1nrTY';
var SIAP_VERSION = '1.17.0';
var SIAP_ANSWERS = [1,0,1,1,1];

function doGet() {
  return ContentService.createTextOutput('SIAP SATPOL PP - penerima evaluasi aktif. Tidak ada data peserta yang ditampilkan.');
}

function doPost(e) {
  var submissionId = '';
  try {
    if (!e || !e.parameter) throw new Error('Permintaan kosong.');
    var p = e.parameter;
    submissionId = safeText(p.submissionId, 80);
    if (!/^[A-Za-z0-9_-]{8,80}$/.test(submissionId)) throw new Error('ID pengiriman tidak valid.');
    var mode = String(p.mode || '');
    if (['pre','post','feedback'].indexOf(mode) === -1) throw new Error('Jenis formulir tidak dikenal.');

    var code = safeText(p.code, 24).toUpperCase();
    if (!/^[A-Z0-9-]{4,24}$/.test(code)) throw new Error('Kode peserta wajib 4-24 karakter: huruf, angka, atau tanda hubung.');
    var name = safeText(p.name, 60);
    if (name.length < 2) throw new Error('Nama peserta harus diisi.');
    var unit = safeText(p.unit, 80);
    var sheetName = mode === 'pre' ? 'Pre-Test' : mode === 'post' ? 'Post-Test' : 'Kuesioner';
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(20000)) throw new Error('Server sibuk. Coba kirim ulang.');
    try {
      var sheet = SpreadsheetApp.openById(SIAP_SHEET_ID).getSheetByName(sheetName);
      if (!sheet) throw new Error('Tab rekap belum ditemukan.');
      var idCol = mode === 'feedback' ? 9 : 11;
      var count = sheet.getLastRow();
      if (count > 1) {
        var from = Math.max(2, count - 1000);
        var ids = sheet.getRange(from, idCol, count - from + 1, 1).getValues();
        if (ids.some(function (row) { return row[0] === submissionId; })) {
          return receipt(submissionId, 'ok', 'Jawaban sudah tercatat sebelumnya.');
        }
      }
      var now = new Date();
      if (mode === 'feedback') {
        var ease = rating(p.ease), help = rating(p.help), clarity = rating(p.clarity);
        sheet.appendRow([now, textCell(code), textCell(name), textCell(unit), ease, help, clarity, textCell(safeText(p.note, 500)), submissionId]);
      } else {
        var answers = [];
        for (var i = 0; i < 5; i++) {
          var n = Number(p['a' + i]);
          if (!Number.isInteger(n) || n < 0 || n > 2) throw new Error('Semua soal harus dijawab.');
          answers.push(n);
        }
        var correct = 0;
        for (var j = 0; j < 5; j++) if (answers[j] === SIAP_ANSWERS[j]) correct++;
        var score = correct * 20;
        sheet.appendRow([now, textCell(code), textCell(name), textCell(unit), score]
          .concat(answers.map(function (n) { return ['A','B','C'][n]; }), [submissionId]));
      }
    } finally {
      lock.releaseLock();
    }
    return receipt(submissionId, 'ok', 'Jawaban tercatat dalam Google Sheets pengelola.');
  } catch (err) {
    return receipt(submissionId, 'error', String(err.message || err).slice(0, 160));
  }
}

function rating(x) {
  var n = Number(x);
  if (!Number.isInteger(n) || n < 1 || n > 5) throw new Error('Nilai kuesioner harus 1 sampai 5.');
  return n;
}
function safeText(x, max) {
  return String(x == null ? '' : x).trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0,max);
}
function textCell(x) {
  var s = String(x || '');
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
function receipt(id, status, message) {
  var payload = JSON.stringify({source:'SIAP_SHEETS_V1170',id:id,status:status,message:message});
  var html = '<!doctype html><html><body><script>window.top.postMessage(' +
    payload.replace(/</g, '\\u003c') + ', "*");<\/script></body></html>';
  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
