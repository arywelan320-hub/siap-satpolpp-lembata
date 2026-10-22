/* SIAP SATPOL PP LEMBATA - bridge evaluasi Google Sheets v1.17.0
   Tidak ada akses baca ke Google Sheets dari browser peserta. */
(function () {
  "use strict";
  var cfg = window.SIAP_CONFIG || {};
  var endpoint = String(cfg.GOOGLE_SHEET_WEBAPP_URL || "").trim();
  var ready = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(?:\?.*)?$/.test(endpoint);
  var pending = false;
  function id() {
    var bits = new Uint8Array(16);
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bits);
    else for (var i=0;i<bits.length;i++) bits[i] = Math.floor(Math.random()*256);
    return "eval_" + Array.prototype.map.call(bits, function(n) {return n.toString(16).padStart(2,"0");}).join("");
  }
  function send(payload) {
    if (!ready) return Promise.resolve({ok:false, message:"Pengiriman ke pengelola belum diaktifkan. Data hanya tersimpan di perangkat ini."});
    if (pending) return Promise.resolve({ok:false, message:"Masih ada pengiriman sebelumnya. Jangan kirim berulang kali."});
    pending = true;
    return new Promise(function(resolve) {
      var frame = document.createElement("iframe");
      var form = document.createElement("form");
      var submissionId = id();
      var done = false, timeout;
      var frameName = "siap_eval_" + submissionId;
      frame.name = frameName;
      frame.title = "Pengiriman evaluasi";
      frame.style.display = "none";
      form.method = "POST";
      form.action = endpoint;
      form.target = frameName;
      form.style.display = "none";
      payload.submissionId = submissionId;
      function cleanup(result) {
        if (done) return;
        done = true;
        window.clearTimeout(timeout);
        window.removeEventListener("message", onMessage);
        form.remove();
        frame.remove();
        pending = false;
        resolve(result);
      }
      function onMessage(e) {
        var source = e.data || {};
        var host = "";
        try {host = new URL(e.origin).hostname;} catch(err) {}
        if (!(host === "script.google.com" || host === "script.googleusercontent.com" || host.endsWith(".googleusercontent.com"))) return;
        if (source.source !== "SIAP_SHEETS_V1170" || source.id !== submissionId) return;
        cleanup({ok:source.status === "ok",message:source.message || "Status tidak diketahui."});
      }
      try {
        Object.keys(payload).forEach(function(key) {
          var field = document.createElement("input");
          field.type = "hidden";
          field.name = key;
          field.value = String(payload[key] == null ? "" : payload[key]);
          form.appendChild(field);
        });
        window.addEventListener("message",onMessage);
        document.body.appendChild(frame);
        document.body.appendChild(form);
        timeout = window.setTimeout(function() {
          cleanup({ok:false,message:"Belum ada konfirmasi dari server. Periksa koneksi dan tab rekap sebelum mencoba kembali."});
        },30000);
        form.submit();
      } catch(err) {
        cleanup({ok:false,message:"Pengiriman gagal dibuka: " + (err.message || String(err))});
      }
    });
  }
  window.SIAP_EVAL_CLOUD = {ready:ready,send:send};
})();
