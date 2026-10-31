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

## Evaluasi sosialisasi (v1.18.0)
Tiga formulir asli tetap dipertahankan: pre-test, post-test, serta kuesioner. Peserta cukup mengisi **nama lengkap** dan memilih **unit/bagian** dari daftar. Kode internal dibuat otomatis dari gabungan nama dan unit untuk mencocokkan pre-test, post-test dan kuesioner. Nama dan unit harus sama di ketiga formulir; peserta bernama sama dalam unit sama perlu mencantumkan nama lengkap yang membedakan. Google Sheets rekap telah dibuat dan dibagikan kepada editor proyek:
https://docs.google.com/spreadsheets/d/1e0fI7UigqdM3nNdHU1ulbYGkKFM5m9iOPdVHiZ1nrTY/edit

Penerimaan jawaban jarak jauh memerlukan deployment Apps Script oleh pengelola dan pemasangan alamat Web App /exec ke `js/config.js`. Buka `integrasi/PANDUAN_AKTIVASI.md` untuk prosedur dan uji awal. **Sebelum aktivasi, aplikasi secara jelas menandai jawaban BELUM terkirim**. Jangan menghitung hasil lokal sebagai respons pengelola.

## Privasi
Data nama, kode peserta, dan jawaban tidak boleh dipublikasikan. Spreadsheet hanya dibagikan kepada pengelola berwenang. Endpoint Apps Script penerimaan bersifat publik bila disetel untuk peserta tanpa login, tetapi URL spreadsheet bukan publik. Monitor penyalahgunaan dan lakukan pengujian antesosialisasi.

Versi aplikasi: **1.18.0**. Backup sebelum perubahan: `backup-before-v1170`. Backup historis: `backup-before-v1160`.


### Koreksi 1.17.1
Handler pre-test, post-test dan kuesioner yang duplikat dalam runtime lama dinonaktifkan agar hanya pengiriman berbasis konfirmasi Google Sheets yang berjalan. Simulasi dan tata letak tidak diubah.

### Perubahan v1.18.0
Kode peserta tidak ditampilkan; unit/bagian menjadi dropdown yang mencakup Sekretariat, Penegakan Perundang-undangan Daerah, Ketertiban Umum dan Ketenteraman, Linmas, Sumber Daya Aparatur, Penanggulangan Kebakaran, Regu Trantibum, dan Lainnya. Endpoint Google Apps Script tidak perlu diubah karena tetap menerima kode internal otomatis.

### Evaluasi monitoring v1.18.0
- Pre-Test dan Post-Test terdiri dari dua set masing-masing 5 pertanyaan berbeda tetapi mengukur indikator sepadan: komunikasi awal, penanganan keberatan, kewenangan, pengendalian ketegangan, dan SOP/kode etik. Contoh kasus Post-Test mencakup pasar Lewoleba dan kegiatan masyarakat.
- Kunci kedua set dibuat kompatibel dengan Apps Script yang sudah terpasang (indeks jawaban [1,0,1,1,1]), sehingga nilai pada server sesuai nilai pada layar tanpa perlu deployment Apps Script ulang.
- Kuesioner: 4 pertanyaan tertutup (nilai 5/4/3/1) dan 1 saran bebas. Karena Apps Script aktif hanya menampung 3 nilai dan kolom saran, jawaban Q4 disimpan terstruktur sebagai `Q4_RESPONS=<jawaban>; SARAN=<teks>` di kolom H. Google Sheets Kuesioner J-K mengekstrak Q4 serta saran ke kolom terpisah, dan L menandai versi. Jangan menghapus rumus J2:L2.
- Penanda `v118_` di ID Pengiriman membedakan entri setelah pembaruan dari entri versi lama. Google Sheets Pre-Test/Post-Test kolom L menandai paket soal. Data lama tidak diubah. Perbandingan nilai sebelum/sesudah paling adil apabila menggunakan pasangan peserta yang sama dan paket yang sama.
- Kuesioner versi lama memakai skala lima opsi; versi baru memakai empat pilihan. Jangan langsung menyimpulkan kecenderungan dari agregat lintas versi tanpa memeriksa perbedaan skala.
- Formulir peserta hanya meminta nama dan unit; kode internal dibuat otomatis. Pengguna harus menggunakan nama lengkap dan unit yang sama untuk mencocokkan pengisian.
