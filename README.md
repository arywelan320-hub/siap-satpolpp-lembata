# SIAP SATPOL PP LEMBATA

**Panduan Komunikasi dan Respons Lapangan**  
Satuan Polisi Pamong Praja Kabupaten Lembata  
Media pembelajaran aktualisasi Latsar CPNS 2026 oleh Mateus Kunradus Parera.

**Aplikasi:** https://arywelan320-hub.github.io/siap-satpolpp-lembata/

## Arsitektur publikasi
- GitHub Pages memuat aplikasi lengkap.
- Google Sites yang sudah ada hanya berfungsi sebagai landing page/pengantar dengan tombol menuju aplikasi.
- Identitas publik menggunakan SIAP SATPOL PP LEMBATA. Nama akun GitHub adalah bagian teknis pada URL, bukan nama aplikasi.

## Ruang lingkup
Cek kesiapan, respons awal, panduan komunikasi, panduan situasi, alur koordinasi, 9 kelompok SOP nasional, rujukan hukum, simulasi, evaluasi, dan masukan.

## Status hukum
SOP yang tampil di aplikasi merupakan ringkasan pembelajaran Permendagri No. 16 Tahun 2023, bukan SOP operasional yang ditetapkan instansi. Petunjuk teknis SOP daerah dan landasan Perda khusus harus dikonfirmasi sebelum tindakan atau penetapan sanksi.

## Evaluasi sosialisasi (v1.17.0)
Tiga formulir asli tetap dipertahankan: pre-test, post-test, serta kuesioner. Identitas dihubungkan melalui **kode peserta** yang sama. Google Sheets rekap telah dibuat dan dibagikan kepada editor proyek:
https://docs.google.com/spreadsheets/d/1e0fI7UigqdM3nNdHU1ulbYGkKFM5m9iOPdVHiZ1nrTY/edit

Penerimaan jawaban jarak jauh memerlukan deployment Apps Script oleh pengelola dan pemasangan alamat Web App /exec ke `js/config.js`. Buka `integrasi/PANDUAN_AKTIVASI.md` untuk prosedur dan uji awal. **Sebelum aktivasi, aplikasi secara jelas menandai jawaban BELUM terkirim**. Jangan menghitung hasil lokal sebagai respons pengelola.

## Privasi
Data nama, kode peserta, dan jawaban tidak boleh dipublikasikan. Spreadsheet hanya dibagikan kepada pengelola berwenang. Endpoint Apps Script penerimaan bersifat publik bila disetel untuk peserta tanpa login, tetapi URL spreadsheet bukan publik. Monitor penyalahgunaan dan lakukan pengujian antesosialisasi.

Versi aplikasi: **1.17.0**. Backup sebelum perubahan: `backup-before-v1170`. Backup historis: `backup-before-v1160`.
