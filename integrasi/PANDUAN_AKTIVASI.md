# Integrasi Evaluasi SIAP SATPOL PP LEMBATA v1.17.0

## Status
Sheet rekap sudah dibuat: https://docs.google.com/spreadsheets/d/1e0fI7UigqdM3nNdHU1ulbYGkKFM5m9iOPdVHiZ1nrTY/edit
Editor sudah diberikan kepada lembatasiapsatpolpp@gmail.com.
**Belum menerima jawaban dari aplikasi sebelum URL Web App Apps Script diaktifkan.** JANGAN mengumumkan sosialisasi sudah siap sebelum uji nyata.

## Aktivasi Google Apps Script (oleh pemilik file / akun yang diberi wewenang)
1. Buka Google Sheets rekap di atas. Masuk memakai akun yang dapat menjalankan Apps Script dan mengakses spreadsheet.
2. Menu Extensions / Ekstensi → Apps Script.
3. Ganti isi Code.gs dengan isi file \`integrasi/PENERIMA_EVALUASI.gs\` dari repositori.
4. Simpan. Periksa konstanta SIAP_SHEET_ID sudah benar.
5. Deploy / Terapkan → New deployment → Web app. Jalankan sebagai **Me** (akun yang memiliki akses tulis ke Sheet). Akses **Anyone** agar peserta tidak memerlukan login. Ini membuat endpoint pengiriman publik, sedangkan data Sheet tetap privat.
6. Salin URL yang berakhir dengan \`/exec\` (BUKAN URL \`/dev\`).
7. Ubah \`GOOGLE_SHEET_WEBAPP_URL\` di \`js/config.js\` menjadi URL tersebut, commit/publish.
8. Buka halaman GitHub Pages terbaru dalam mode incognito. Lakukan pre-test dan post-test dengan kode peserta yang sama, lalu satu kuesioner. Pastikan pesan **Terkirim ke pengelola** muncul dan 3 baris ada di ketiga tab Sheets.
9. Uji HP dan laptop, koneksi lambat, pengiriman ganda, pengisian tidak lengkap; cek tab Ringkasan. Jangan berikan URL Spreadsheet kepada peserta.

## Prinsip keselamatan data
- Data di Google Sheets hanya bisa dibaca oleh pemilik/editor yang diberi akses.
- Kolom nama, kode, unit, dan jawaban hanya untuk evaluasi sosialisasi. Sampaikan tujuan pengumpulan data kepada peserta.
- Aplikasi tetap dapat menyimpan salinan lokal apabila pengiriman gagal, tetapi **tidak boleh menampilkan seolah-olah sudah diterima pengelola**.
- Jangan menaruh token rahasia/API key dalam file GitHub publik. URL Apps Script adalah URL publik.
- Pantau spam karena Web App dengan akses Anyone menerima kiriman anonim; admin boleh mengganti deployment atau beralih ke Google Forms jika dibutuhkan.
- JANGAN membuka Spreadsheet untuk akses Anyone.

## Pemulihan
Backup GitHub: branch \`backup-before-v1170\`. Cabang kerja: \`fitur-evaluasi-v1170\`.
