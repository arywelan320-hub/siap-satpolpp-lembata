# Audit rilis SIAP SATPOL PP LEMBATA 1.16.1
Tanggal: 13 Oktober 2026

## Pemeriksaan kode (terverifikasi)
- 10 target halaman navigasi ditemukan; seluruh data-page mengarah ke id yang ada.
- 9 kategori SOP di halaman hukum cocok dengan pembagian Pasal 3 Permendagri 16/2023.
- Seluruh referensi asset pada HTML sudah ditemukan di tree repository saat audit v1.16.0.
- Kode JS utama dapat diparse. Masalah temporal-dead-zone pada inisialisasi rute diperbaiki dengan memindahkan variabel menu sebelum pemanggilan showPage.
- Kondisi click handler saat elemen hamburger null diperbaiki.
- Sinkronisasi aria-hidden untuk menu checkbox dan aktivasi keyboard label drawer ditambahkan.
- CSS <=430px menambah keterbacaan paragraf kunci (13px), judul dan tombol, serta memperhatikan teks panjang.
- README diperbaiki dengan URL aplikasi yang benar dan posisi Google Sites hanya sebagai landing page.

## Audit hukum
- Permendagri 16/2023 berlaku dan mencabut Permendagri 54/2011 (Pasal 47).
- Terdapat sembilan kelompok SOP menurut Pasal 3, dan kebutuhan Perkada menurut Pasal 4.
- PP 16/2018 dan Permendagri 26/2020 diverifikasi berlaku lewat JDIH BPK/peraturan.go.id.
- JDIH Kabupaten Lembata memuat Perbup Tahun 2022 tentang petunjuk teknis SOP Satpol PP, ditetapkan 7 Juni 2022, berstatus berlaku menurut laman metadata. Nomor dan penyesuaiannya pasca-2023 belum dapat ditetapkan dari dokumen yang bisa diakses.
- Klaim Perda Lembata Nomor 12 Tahun 2012 tentang Ketertiban Umum tidak dapat diverifikasi dan tidak lagi dicantumkan sebagai dasar hukum yang sudah pasti. Nomor dan status Perda setempat harus dikonfirmasi.
- Aplikasi bersifat media pembelajaran, bukan SOP resmi maupun instrumen penetapan sanksi.

## Keterbatasan dan penerimaan
- Pemeriksaan mobile bersifat audit kode/aturan CSS, bukan tes visual langsung pada browser dan ponsel fisik.
- Pengujian interaksi penuh, responsif 320/375/390/430px, serta aksesibilitas dengan pembaca layar tetap memerlukan uji browser.
- Status deploy GitHub Pages harus dilihat pada GitHub Actions untuk commit rilis; tidak boleh disimpulkan hanya dari file audit.
- Google Sites tidak diedit/dipublikasi oleh commit ini. Tetap sebagai landing page terpisah.

Sumber:
https://peraturan.go.id/id/permendagri-no-16-tahun-2023
https://peraturan.bpk.go.id/Details/77284/pp-no-16-tahun-2018
https://peraturan.bpk.go.id/Details/143373/permendagri-no-26-tahun-2020
https://jdih.lembatakab.go.id/dokumen/view?id=41
