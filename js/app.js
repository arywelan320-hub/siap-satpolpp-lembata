const pages=document.querySelectorAll(".page");
const menu=document.getElementById("mobileMenu");
const burger=document.getElementById("hamburger");
const desktopMenuButton=document.getElementById("desktopMenuButton");
const menuBackdrop=document.getElementById("menuBackdrop");
const menuCloseBtn=document.getElementById("menuCloseBtn");

function showPage(id,push=true){
  const target=document.getElementById(id);
  if(!target)return;
  pages.forEach(p=>p.classList.remove("active"));
  target.classList.add("active");
  closeMainMenu();
  if(push)history.replaceState(null,"","#"+id);
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll(".navbtn").forEach(btn=>{
  btn.addEventListener("click",()=>showPage(btn.dataset.page));
});

/* ===== ROUTING AMAN v1.14.3 ===== */
(function(){
  function openHashPage(){
    const id=(location.hash||"#beranda").replace("#","");
    const target=document.getElementById(id);
    showPage(target ? id : "beranda", false);
  }
  openHashPage();
  window.addEventListener("hashchange",openHashPage);
})();
/* ===== END ROUTING AMAN v1.14.3 ===== */


/* ===== DRAWER MENU v1.7 ===== */

function setMenuA11y(open){
  menu.setAttribute("aria-hidden",open?"false":"true");
  if(menuBackdrop)menuBackdrop.setAttribute("aria-hidden",open?"false":"true");
  if(burger)burger.setAttribute("aria-expanded",open?"true":"false");
  if(desktopMenuButton)desktopMenuButton.setAttribute("aria-expanded",open?"true":"false");
}
function openMainMenu(){
  menu.classList.add("open");
  if(menuBackdrop)menuBackdrop.classList.add("open");
  document.body.classList.add("menu-open");
  setMenuA11y(true);
  window.setTimeout(()=>menuCloseBtn&&menuCloseBtn.focus(),120);
}
function closeMainMenu(){
  menu.classList.remove("open");
  if(menuBackdrop)menuBackdrop.classList.remove("open");
  document.body.classList.remove("menu-open");
  setMenuA11y(false);
}
function toggleMainMenu(){
  menu.classList.contains("open")?closeMainMenu():openMainMenu();
}
if(burger)burger.addEventListener("click",toggleMainMenu);
if(desktopMenuButton)desktopMenuButton.addEventListener("click",toggleMainMenu);
if(menuCloseBtn)menuCloseBtn.addEventListener("click",closeMainMenu);
if(menuBackdrop)menuBackdrop.addEventListener("click",closeMainMenu);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMainMenu();});
/* Sinkronkan aksesibilitas drawer berbasis checkbox dan tombol keyboard. */
const nativeToggle=document.getElementById("nativeMenuToggle");
if(nativeToggle){
  const syncNativeMenu=()=>{
    const open=nativeToggle.checked;
    if(menu) menu.setAttribute("aria-hidden",open?"false":"true");
    if(menuBackdrop) menuBackdrop.setAttribute("aria-hidden",open?"false":"true");
  };
  nativeToggle.addEventListener("change",syncNativeMenu);
  syncNativeMenu();
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape" && nativeToggle.checked){
      nativeToggle.checked=false;
      syncNativeMenu();
    }
  });
}
document.querySelectorAll('label.drawer-item[role="button"]').forEach(label=>{
  label.addEventListener("keydown",e=>{
    if(e.key==="Enter" || e.key===" "){
      e.preventDefault();
      label.click();
    }
  });
});
/* ===== END DRAWER MENU v1.7 ===== */

document.querySelectorAll(".acc-title").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const acc=btn.closest(".acc");
    acc.classList.toggle("open");
    btn.querySelector("i").textContent=acc.classList.contains("open")?"⌃":"⌄";
  });
});

/* Panduan komunikasi situasional */
const COMM={
  pkl:{
    title:"PKL / Pedagang Kaki Lima",
    open:"Sapa, perkenalkan diri, lalu sebutkan kondisi ruang publik yang menjadi perhatian. Dengarkan dulu alasan pedagang sebelum memberikan arahan.",
    example:"“Selamat pagi, Bapak/Ibu. Kami dari Satpol PP Kabupaten Lembata. Mohon izin, kami mau bicara sebentar terkait tempat jualan di bagian ini. Kami dengar dulu kondisi Bapak/Ibu, setelah itu kami jelaskan apa yang perlu ditata.”",
    reject:"Jika pedagang berkata sudah lama berjualan atau merasa hanya dirinya yang ditegur, akui bahwa keberatannya sudah didengar. Kembali pada kondisi di titik tersebut dan jangan mengubah percakapan menjadi perdebatan tentang siapa yang paling salah.",
    avoid:"Jangan membuka dengan ancaman, jangan mempermalukan, dan jangan menjanjikan relokasi/izin/keputusan yang belum pasti.",
    coord:"Ketika penolakan berlanjut, massa mulai berkumpul, situasi tidak aman, atau diperlukan keputusan/tindakan yang melampaui komunikasi awal."
  },
  bahujalan:{
    title:"Pedagang di Bahu Jalan / Trotoar",
    open:"Tunjukkan kondisi jalan atau trotoar yang menjadi perhatian. Gunakan bahasa konkret: jalur terhalang, ruang menyempit, atau keselamatan terganggu, bila memang itu yang terlihat.",
    example:"“Bapak/Ibu, kami mau menyampaikan soal bagian bahu jalan ini. Saat ini ruangnya menjadi sempit untuk pengguna jalan. Kami minta bantuannya supaya barang yang masuk ke jalur ini dirapikan.”",
    reject:"Jika dijawab 'orang lain juga begitu', catat informasinya tetapi tetap selesaikan pembicaraan tentang kondisi di titik ini.",
    avoid:"Jangan menyebut pasal atau sanksi yang belum dipastikan. Jangan menuduh pedagang sengaja mengganggu jalan.",
    coord:"Jika menyangkut pengaturan lalu lintas, rambu, lokasi parkir, keselamatan jalan, atau membutuhkan keputusan Dishub/Polri/atasan."
  },
  bbm:{
    title:"BBM Eceran / Bersubsidi",
    open:"Perkenalkan diri dan jelaskan tujuan komunikasi atau pemeriksaan. Tanyakan fakta terlebih dahulu. Hindari membuka percakapan dengan kata 'penimbunan', 'penyelewengan', atau tuduhan pidana.",
    example:"“Selamat siang, Bapak/Ibu. Kami dari Satpol PP Kabupaten Lembata. Kami sedang melaksanakan tugas terkait kondisi penjualan BBM di lokasi ini. Kami mau dengar dulu penjelasan Bapak/Ibu dan mencatat kondisi yang ada.”",
    reject:"Jika ditanya 'kenapa cuma saya?', jawab bahwa petugas sedang menangani kondisi di lokasi ini sesuai penugasan dan keberatan tersebut akan dicatat.",
    avoid:"Jangan menetapkan sendiri tindak pidana Migas, jangan mengancam penyitaan, dan jangan menyatakan pelanggaran yang belum diverifikasi.",
    coord:"Ketika temuan berkaitan dengan distribusi, izin, BBM subsidi, dugaan tindak pidana, atau membutuhkan OPD teknis/Pertamina/BPH Migas/Polri."
  },
  sampah:{
    title:"Sampah & Kebersihan Ruang Publik",
    open:"Sapa, tunjukkan perilaku atau kondisi sampah yang perlu diperbaiki, lalu minta tindakan sederhana yang jelas.",
    example:"“Permisi, Bapak/Ibu. Mohon bantuannya, sampah ini jangan ditinggalkan di sini. Bisa dipindahkan ke tempat yang semestinya supaya area ini tetap bersih dan tidak mengganggu?”",
    reject:"Jika dijawab 'cuma sedikit', tetap jelaskan bahwa imbauannya ditujukan pada perilaku dan kebersihan lokasi, bukan pada besar-kecilnya jumlah semata.",
    avoid:"Jangan mengejek, mempermalukan, atau langsung menentukan denda tanpa dasar yang sudah dipastikan.",
    coord:"Jika kejadian berulang, volume besar, lokasi membutuhkan penanganan teknis, atau tindak lanjut perlu melibatkan OPD persampahan/lingkungan."
  },
  ternak:{
    title:"Ternak Berkeliaran",
    open:"Cari pemilik bila memungkinkan. Jelaskan gangguan yang benar-benar terlihat pada jalan, kebun, atau aktivitas masyarakat.",
    example:"“Selamat siang, Bapak/Ibu. Kami mau menyampaikan soal ternak yang berada di bagian jalan ini. Mohon bantuannya supaya ternaknya diamankan dulu agar tidak mengganggu pengguna jalan dan tidak menimbulkan masalah.”",
    reject:"Jika pemilik merasa ternaknya tidak mengganggu, tunjukkan kondisi objektif yang menjadi perhatian dan hindari perdebatan tentang kebiasaan lama.",
    avoid:"Jangan langsung membuat ancaman denda, penangkapan, atau penahanan ternak jika dasar lokal dan prosedurnya belum dipastikan.",
    coord:"Jika pemilik tidak ditemukan, gangguan berulang, ada kerusakan/sengketa, atau diperlukan desa/kelurahan dan OPD peternakan/pertanian."
  },
  pelajar:{
    title:"Pelajar pada Jam Sekolah",
    open:"Dekati secara wajar dan tidak mengintimidasi. Tanyakan keadaan, sekolah, dan alasan berada di luar sekolah tanpa mempermalukan.",
    example:"“Adik-adik, selamat siang. Kami dari Satpol PP. Sekarang masih jam sekolah, jadi kami mau tanya dulu kenapa berada di sini dan apakah pihak sekolah sudah tahu?”",
    reject:"Jika pelajar defensif, tetap gunakan nada pembinaan. Jangan memaksa pengakuan atau membuat ancaman yang tidak sesuai.",
    avoid:"Jangan mempermalukan, memaki, memotret untuk publikasi, atau memperlakukan pelajar sebagai pelaku kriminal hanya karena berada di luar sekolah.",
    coord:"Jika perlu konfirmasi, hubungi sekolah/orang tua/wali atau layanan terkait. Utamakan perlindungan anak."
  },
  parkir:{
    title:"Parkir & Penggunaan Ruang Jalan",
    open:"Jelaskan kondisi kendaraan atau ruang jalan yang menjadi perhatian. Dengarkan juru parkir sebelum memberi arahan.",
    example:"“Selamat siang. Kami mau menyampaikan soal pengaturan kendaraan di bagian ini. Posisi kendaraan sekarang membuat ruang jalan menyempit. Bisa kita atur supaya jalurnya lebih aman?”",
    reject:"Jika juru parkir merasa sudah mengatur dengan benar, tunjukkan kondisi yang menjadi perhatian dan arahkan pada perbaikan konkret.",
    avoid:"Jangan menyerang pribadi, jangan mencampur penertiban ruang publik dengan kewenangan penindakan lalu lintas.",
    coord:"Jika berkaitan dengan rambu, lokasi resmi parkir, tarif/retribusi, atau penindakan lalu lintas yang memerlukan Dishub/Polri."
  },
  kerumunan:{
    title:"Kerumunan / Konflik Ringan",
    open:"Baca situasi sebelum mendekat. Jika aman untuk berkomunikasi, gunakan satu petugas sebagai penyampai utama dan minta satu orang mewakili penjelasan.",
    example:"“Bapak/Ibu, kami ingin dengar penjelasannya, tapi mari satu orang dulu yang bicara supaya informasinya jelas dan tidak saling potong.”",
    reject:"Jika suara mulai meninggi, jangan berlomba meninggikan suara. Ulangi tujuan komunikasi dan beri batas bahwa pembicaraan akan dihentikan bila situasi tidak aman.",
    avoid:"Jangan memprovokasi, menyentuh orang tanpa kebutuhan dan dasar, atau menganggap kritik/unjuk rasa damai sebagai pelanggaran dengan sendirinya.",
    coord:"Segera koordinasikan jika ada ancaman keselamatan, perkelahian, senjata, dugaan tindak pidana, massa bertambah, atau situasi membutuhkan pengamanan Polri."
  }
};

const commDetail=document.getElementById("commDetail");
if(commDetail){
  document.querySelectorAll(".comm-case").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const d=COMM[btn.dataset.case];
      if(!d)return;

      commDetail.innerHTML=`
        <button type="button" aria-label="Tutup" id="closeCommDetail">×</button>
        <span class="comm-detail-kicker-v1143">CONTOH KOMUNIKASI</span>
        <h2 id="commTitle">${d.title}</h2>
        <div class="comm-detail-grid-v1143">
          <article>
            <small>PEMBUKA</small>
            <p>${d.open}</p>
          </article>
          <article>
            <small>CONTOH KALIMAT</small>
            <p>${d.example}</p>
          </article>
          <article>
            <small>JIKA ADA KEBERATAN</small>
            <p>${d.reject}</p>
          </article>
          <article>
            <small>HINDARI</small>
            <p>${d.avoid}</p>
          </article>
        </div>
        <div class="comm-detail-coord-v1143">
          <b>Koordinasikan bila:</b>
          <span>${d.coord}</span>
        </div>
      `;
      commDetail.classList.remove("hidden");
      setTimeout(()=>commDetail.scrollIntoView({behavior:"smooth",block:"start"}),50);
    });
  });

  commDetail.addEventListener("click",e=>{
    if(e.target.closest("#closeCommDetail")){
      commDetail.classList.add("hidden");
    }
  });
}

/* Panduan situasi ringkas */
const detail=document.getElementById("detail");
document.querySelectorAll(".situations button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.getElementById("detailTitle").textContent=btn.dataset.title;
    document.getElementById("detailText").textContent=btn.dataset.text;
    detail.classList.remove("hidden");
    setTimeout(()=>detail.scrollIntoView({behavior:"smooth",block:"center"}),50);
  });
});

const closeDetail=document.getElementById("closeDetail"); if(closeDetail) closeDetail.addEventListener("click",()=>detail.classList.add("hidden"));

const searchSituasi=document.getElementById("searchSituasi");
if(searchSituasi){
  searchSituasi.addEventListener("input",e=>{
    const q=e.target.value.toLowerCase().trim();
    document.querySelectorAll(".situations button").forEach(btn=>{
      const hay=(btn.textContent+" "+(btn.dataset.title||"")).toLowerCase();
      btn.style.display=hay.includes(q)?"":"none";
    });
  });
}

document.addEventListener("click",e=>{
  if(menu && !menu.contains(e.target) && (!burger || !burger.contains(e.target))) menu.classList.remove("open");
});





/* ===== MATERI BELAJAR v1.0 ===== */
const MATERIALS = {
  komunikasi:{
    title:"Komunikasi Persuasif",
    body:`<div class="material-points">
      <h3>Ingat pola 4 langkah</h3>
      <ol>
        <li><b>Sapa</b> — buka komunikasi dengan sikap tenang.</li>
        <li><b>Dengar</b> — beri ruang orang menjelaskan kondisinya.</li>
        <li><b>Jelaskan</b> — sampaikan tujuan atau imbauan dengan kalimat singkat.</li>
        <li><b>Arahkan</b> — tutup dengan langkah berikutnya yang jelas.</li>
      </ol>
      <aside>Komunikasi persuasif tidak berarti kehilangan ketegasan. Tegas pada tujuan, tetap baik pada cara penyampaiannya.</aside>
    </div>`
  },
  respons:{
    title:"Respons Awal",
    body:`<div class="material-points">
      <h3>Sebelum bertindak, cek 3 hal</h3>
      <ul>
        <li>Apa yang sebenarnya terjadi?</li>
        <li>Apakah kondisi aman untuk didekati?</li>
        <li>Apakah situasi masih bisa ditangani di tingkat personel?</li>
      </ul>
      <p>Setelah itu barulah lakukan komunikasi, dokumentasi seperlunya, dan koordinasi jika diperlukan.</p>
    </div>`
  },
  eskalasi:{
    title:"De-eskalasi",
    body:`<div class="material-points">
      <h3>Saat situasi memanas</h3>
      <ul>
        <li>Jangan ikut menaikkan volume suara.</li>
        <li>Gunakan kalimat pendek dan tidak provokatif.</li>
        <li>Jangan memaksa orang menerima penjelasan panjang saat emosi tinggi.</li>
        <li>Jaga posisi aman dan kenali kapan komunikasi perlu dihentikan.</li>
      </ul>
      <aside>Tujuan pertama bukan memenangkan perdebatan, tetapi menjaga situasi tetap terkendali.</aside>
    </div>`
  },
  dokumentasi:{
    title:"Dokumentasi",
    body:`<div class="material-points">
      <h3>Catat yang penting</h3>
      <ul>
        <li>Waktu dan lokasi kegiatan.</li>
        <li>Jenis situasi yang ditemui.</li>
        <li>Pihak yang terkait seperlunya.</li>
        <li>Respons atau langkah yang sudah dilakukan.</li>
        <li>Kebutuhan tindak lanjut atau koordinasi.</li>
      </ul>
      <p>Hindari dokumentasi yang tidak perlu atau mempermalukan masyarakat.</p>
    </div>`
  },
  koordinasi:{
    title:"Koordinasi",
    body:`<div class="material-points">
      <h3>Koordinasi diperlukan ketika</h3>
      <ul>
        <li>Situasi mulai melebihi kemampuan personel.</li>
        <li>Diperlukan keputusan dari atasan.</li>
        <li>Ada risiko keselamatan.</li>
        <li>Diperlukan keterlibatan pihak atau instansi lain.</li>
        <li>Informasi aturan atau kewenangan belum cukup jelas.</li>
      </ul>
    </div>`
  },
  evaluasi:{
    title:"Evaluasi Diri",
    body:`<div class="material-points">
      <h3>Setelah tugas, tanyakan 4 hal</h3>
      <ol>
        <li>Apa yang berjalan baik?</li>
        <li>Apa yang membuat komunikasi sulit?</li>
        <li>Apakah saya tetap tenang dan jelas?</li>
        <li>Apa yang akan saya lakukan lebih baik pada situasi berikutnya?</li>
      </ol>
      <aside>Evaluasi singkat membantu pengalaman lapangan berubah menjadi pembelajaran.</aside>
    </div>`
  }
};

const learnDetail=document.getElementById("learnDetail");
document.querySelectorAll(".learn-card").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const m=MATERIALS[btn.dataset.topic];
    if(!m)return;
    document.getElementById("learnTitle").textContent=m.title;
    document.getElementById("learnBody").innerHTML=m.body;
    learnDetail.classList.remove("hidden");
    setTimeout(()=>learnDetail.scrollIntoView({behavior:"smooth",block:"start"}),50);
  });
});
if(document.getElementById("closeLearnDetail")){
  document.getElementById("closeLearnDetail").addEventListener("click",()=>learnDetail.classList.add("hidden"));
}

/* ===== MENU AKTIF v1.7.2 ===== */
(function(){
  function getDrawer(){ return document.getElementById("mobileMenu"); }
  function getBackdrop(){ return document.getElementById("menuBackdrop"); }

  function setExpanded(value){
    document.querySelectorAll("#desktopMenuButton,#hamburger,.menu-trigger").forEach(btn=>{
      btn.setAttribute("aria-expanded", value ? "true" : "false");
    });
  }

  function openDrawer(){
    const drawer=getDrawer();
    const backdrop=getBackdrop();
    if(!drawer) return;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden","false");
    if(backdrop){
      backdrop.classList.add("open");
      backdrop.setAttribute("aria-hidden","false");
    }
    document.body.classList.add("menu-open");
    setExpanded(true);
  }

  function closeDrawer(){
    const drawer=getDrawer();
    const backdrop=getBackdrop();
    if(drawer){
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden","true");
    }
    if(backdrop){
      backdrop.classList.remove("open");
      backdrop.setAttribute("aria-hidden","true");
    }
    document.body.classList.remove("menu-open");
    setExpanded(false);
  }

  // Listener capture: memastikan tombol Menu yang SEKARANG terlihat selalu membuka drawer.
  document.addEventListener("click", function(e){
    const trigger=e.target.closest("#desktopMenuButton,#hamburger,.menu-trigger");
    if(trigger){
      e.preventDefault();
      e.stopImmediatePropagation();
      const drawer=getDrawer();
      if(drawer && drawer.classList.contains("open")) closeDrawer();
      else openDrawer();
      return;
    }

    if(e.target.closest("#menuCloseBtn") || e.target.id==="menuBackdrop"){
      e.preventDefault();
      closeDrawer();
      return;
    }

    // Saat memilih salah satu item drawer, halaman dibuka oleh navbtn lama,
    // lalu drawer ditutup tanpa mengganggu navigasinya.
    if(e.target.closest("#mobileMenu .drawer-item")){
      window.setTimeout(closeDrawer, 40);
    }
  }, true);

  document.addEventListener("keydown", function(e){
    if(e.key==="Escape") closeDrawer();
  });

  // state awal
  closeDrawer();
})();
 /* ===== END MENU AKTIF v1.7.2 ===== */


/* ===== HUKUM KASUS LEMBATA v1.8 ===== */
(function(){
  const search=document.getElementById("lawSearch");
  const filters=[...document.querySelectorAll(".law-filter")];
  const cards=[...document.querySelectorAll(".law-case")];
  const count=document.getElementById("lawCount");
  if(!cards.length)return;
  let level="all";
  function norm(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
  function apply(){
    const q=norm(search?search.value:"").trim();
    let visible=0;
    cards.forEach(card=>{
      const hay=norm((card.dataset.keywords||"")+" "+card.textContent);
      const okText=!q||hay.includes(q);
      const okLevel=level==="all"||card.dataset.level===level;
      const show=okText&&okLevel;
      card.hidden=!show;
      if(show)visible++;
    });
    if(count)count.textContent=visible+" panduan ditampilkan";
  }
  filters.forEach(btn=>btn.addEventListener("click",()=>{
    filters.forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    level=btn.dataset.lawfilter||"all";
    apply();
  }));
  if(search)search.addEventListener("input",apply);
  apply();
})();
/* ===== END HUKUM KASUS LEMBATA v1.8 ===== */


/* ===== VISUAL HUKUM v1.9 ===== */
(function(){
  const visualCards=[...document.querySelectorAll(".law-visual-card")];
  if(!visualCards.length)return;

  visualCards.forEach(btn=>btn.addEventListener("click",()=>{
    const term=(btn.dataset.lawterm||"").toLowerCase();
    const search=document.getElementById("lawSearch");

    if(search)search.value="";
    const allFilter=document.querySelector('.law-filter[data-lawfilter="all"]');
    if(allFilter) allFilter.click();
    else document.querySelectorAll(".law-case").forEach(c=>c.hidden=false);

    const target=[...document.querySelectorAll(".law-case")]
      .find(c=>(c.dataset.keywords||"").toLowerCase().includes(term));

    if(target){
      target.hidden=false;
      target.open=true;
      setTimeout(()=>target.scrollIntoView({behavior:"smooth",block:"center"}),60);
    }
  }));
})();
/* ===== END VISUAL HUKUM v1.9 ===== */


/* ===== AUDIT TOTAL v1.9.1 ===== */
(function(){
  document.querySelectorAll(".acc-title").forEach(btn=>{
    const acc=btn.closest(".acc");
    btn.setAttribute("aria-expanded",acc&&acc.classList.contains("open")?"true":"false");
    btn.addEventListener("click",()=>{
      requestAnimationFrame(()=>{
        btn.setAttribute("aria-expanded",acc&&acc.classList.contains("open")?"true":"false");
      });
    });
  });

  window.addEventListener("hashchange",()=>{
    const id=(location.hash||"#beranda").slice(1);
    if(document.getElementById(id)) showPage(id,false);
  });

  document.querySelectorAll("img").forEach(img=>{
    img.addEventListener("error",()=>{
      img.classList.add("image-load-error");
      img.setAttribute("aria-hidden","true");
    },{once:true});
  });
})();
/* ===== END AUDIT TOTAL v1.9.1 ===== */


/* ===== HUKUM INLINE FOTO v1.9.6 ===== */
(function(){
  const grid=document.querySelector(".law-visual-grid");
  if(!grid)return;

  const links={
    pp16:"https://peraturan.bpk.go.id/Details/77284/pp-no-16-tahun-2018",
    perm26:"https://peraturan.bpk.go.id/Details/143373/permendagri-no-26-tahun-2020",
    perda2024:"https://peraturan.bpk.go.id/Details/310243/perda-kab-lembata-no-1-tahun-2024",
    jdih:"https://jdih.lembatakab.go.id/",
    child:"https://jdih.lembatakab.go.id/dokumen/view?id=9",
    pklCase:"https://kumparan.com/florespedia/petugas-tertibkan-pkl-yang-berjualan-di-atas-badan-jalan-dan-trotoar-di-lewoleba-1yVXji3Eufi"
  };

  const data={
    pkl:{
      title:"PKL / Pedagang Kaki Lima",
      intro:"Dasar hukum ditampilkan langsung pada situasi yang dipilih.",
      national:[
        ["PP Nomor 16 Tahun 2018","Dasar tugas Satpol PP dalam penegakan Perda/Perkada, ketertiban umum, ketenteraman, dan pelindungan masyarakat.",links.pp16],
        ["Permendagri Nomor 26 Tahun 2020","Rujukan penyelenggaraan Trantibum dan pelindungan masyarakat.",links.perm26]
      ],
      local:[
        ["Rujukan Perda ketertiban umum Kabupaten Lembata (nomor dan status belum terverifikasi)","Nomor, status keberlakuan, serta pasal yang relevan belum dapat dipastikan dari sumber resmi yang diakses. Jangan gunakan sebagai dasar sanksi sebelum diperiksa melalui JDIH/Bagian Hukum.",links.jdih,true]
      ],
      action:["Utamakan imbauan dan komunikasi persuasif.","Pastikan lokasi memang termasuk ruang yang dilarang/dibatasi.","Penertiban atau penyitaan hanya berdasarkan aturan dan prosedur yang sudah diverifikasi."],
      extra:[["Konteks penertiban PKL Lewoleba 2022",links.pklCase]]
    },
    bahu:{
      title:"Pedagang di Bahu Jalan / Trotoar",
      intro:"Penanganan berfokus pada fungsi jalan, keselamatan, dan ketertiban ruang publik.",
      national:[
        ["PP Nomor 16 Tahun 2018","Dasar umum pelaksanaan tugas Satpol PP.",links.pp16],
        ["UU Nomor 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan","Relevan bila aktivitas mengganggu fungsi jalan, keselamatan, atau kelancaran lalu lintas.","https://peraturan.bpk.go.id/"]
      ],
      local:[
        ["Perda Trantibum Lembata","Nomor/pasal yang tepat harus diverifikasi dari naskah resmi sebelum dipakai untuk penindakan.",links.jdih,true]
      ],
      action:["Identifikasi ruang jalan/trotoar yang digunakan.","Berikan penjelasan dan kesempatan untuk menata atau memindahkan barang bila memungkinkan.","Koordinasikan aspek lalu lintas dengan Dishub/Polri."]
    },
    bbm:{
      title:"BBM Bersubsidi & Penjualan Eceran",
      intro:"Satpol PP menjaga ketertiban dan mendukung operasi terpadu, bukan menetapkan sendiri tindak pidana Migas.",
      national:[
        ["UU Nomor 22 Tahun 2001 tentang Minyak dan Gas Bumi","Kerangka hukum utama kegiatan usaha minyak dan gas bumi.","https://peraturan.bpk.go.id/"],
        ["Perpres Nomor 191 Tahun 2014 beserta perubahannya","Mengatur penyediaan, pendistribusian, dan harga jual eceran BBM.","https://peraturan.bpk.go.id/"]
      ],
      local:[
        ["Aturan lokal / surat tugas operasi","Belum dicantumkan Perda Lembata khusus BBM karena belum terverifikasi. Gunakan surat tugas dan aturan sektoral yang berlaku.",links.jdih,true]
      ],
      action:["Jaga ketertiban lokasi/antrean.","Dokumentasikan temuan secara objektif.","Koordinasikan aspek distribusi atau dugaan pidana dengan instansi berwenang."]
    },
    sampah:{
      title:"Sampah & Kebersihan Ruang Publik",
      intro:"Kategori ini memiliki dasar daerah yang lebih jelas untuk penanganan sampah.",
      national:[
        ["UU Nomor 18 Tahun 2008 tentang Pengelolaan Sampah","Dasar nasional pengurangan dan penanganan sampah.","https://peraturan.bpk.go.id/"],
        ["PP Nomor 16 Tahun 2018","Dasar umum tugas Satpol PP dalam penegakan Perda/Perkada.",links.pp16]
      ],
      local:[
        ["Perda Kabupaten Lembata Nomor 5 Tahun 2017 tentang Pengelolaan Sampah","Rujukan daerah untuk pengelolaan sampah. Pasal larangan dan sanksi harus dibaca dari naskah resmi sebelum penindakan.",links.jdih,false],
        ["Perda Kabupaten Lembata Nomor 1 Tahun 2024","Relevan untuk aspek Pajak Daerah dan Retribusi Daerah, termasuk retribusi pelayanan persampahan.",links.perda2024,false]
      ],
      action:["Lakukan imbauan dan dokumentasi lokasi.","Untuk pelanggaran berulang, gunakan pasal Perda yang sudah diverifikasi.","Koordinasikan aspek teknis dengan OPD yang membidangi persampahan."]
    },
    ternak:{
      title:"Ternak Berkeliaran",
      intro:"Gangguan ternak dapat ditangani dalam kerangka Trantibum, tetapi dasar lokal khusus harus dipastikan.",
      national:[
        ["PP Nomor 16 Tahun 2018","Dasar umum tugas Satpol PP.",links.pp16],
        ["Permendagri Nomor 26 Tahun 2020","Rujukan penyelenggaraan ketertiban umum dan ketenteraman masyarakat.",links.perm26]
      ],
      local:[
        ["Perda/Perkada Lembata khusus ternak","Belum dicantumkan nomor Perda karena belum terverifikasi. Jangan memakai Perda daerah lain sebagai dasar.",links.jdih,true]
      ],
      action:["Identifikasi pemilik ternak.","Utamakan komunikasi dan pencegahan gangguan.","Koordinasikan dengan desa/kelurahan dan OPD pertanian/peternakan."]
    },
    pelajar:{
      title:"Pelajar Bolos / Pembinaan Remaja",
      intro:"Pendekatan harus mengutamakan perlindungan anak, pembinaan, dan koordinasi dengan sekolah/orang tua.",
      national:[
        ["UU Nomor 35 Tahun 2014 tentang Perlindungan Anak","Menegaskan perlindungan hak anak dan kewajiban perlindungan.","https://peraturan.bpk.go.id/"],
        ["PP Nomor 16 Tahun 2018","Dasar umum pelaksanaan tugas Satpol PP.",links.pp16]
      ],
      local:[
        ["Perda Kabupaten Lembata Nomor 17 Tahun 2015 tentang Perlindungan Anak","Tercatat berlaku di JDIH Kabupaten Lembata.",links.child,false]
      ],
      action:["Lakukan pendekatan humanis.","Jaga privasi anak.","Koordinasikan dengan sekolah, orang tua/wali, dan layanan terkait."]
    },
    parkir:{
      title:"Parkir & Penggunaan Ruang Jalan",
      intro:"Masalah parkir perlu dibedakan antara ketertiban ruang publik, lalu lintas, dan retribusi.",
      national:[
        ["UU Nomor 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan","Dasar nasional penyelenggaraan lalu lintas dan ketertiban jalan.","https://peraturan.bpk.go.id/"],
        ["PP Nomor 16 Tahun 2018","Dasar umum penegakan Perda/Perkada oleh Satpol PP.",links.pp16]
      ],
      local:[
        ["Perda Kabupaten Lembata Nomor 1 Tahun 2024 tentang Pajak Daerah dan Retribusi Daerah","Berstatus berlaku dan menjadi rujukan terbaru untuk aspek retribusi daerah.",links.perda2024,false]
      ],
      action:["Identifikasi apakah masalahnya parkir, penggunaan ruang jalan, atau retribusi.","Koordinasikan aspek teknis lalu lintas dengan Dishub/Polri.","Jangan memakai tarif atau Perda retribusi lama yang sudah dicabut."]
    },
    kerumunan:{
      title:"Kerumunan, Konflik Ringan & Unjuk Rasa",
      intro:"Jaga ketertiban tanpa menganggap unjuk rasa damai sebagai pelanggaran dengan sendirinya.",
      national:[
        ["UU Nomor 9 Tahun 1998","Dasar kemerdekaan menyampaikan pendapat di muka umum.","https://peraturan.bpk.go.id/Details/45478/uu-no-9-tahun-1998"],
        ["Permendagri Nomor 26 Tahun 2020","Rujukan pelaksanaan ketertiban umum dan ketenteraman masyarakat.",links.perm26]
      ],
      local:[
        ["Perda Trantibum Lembata","Status dan pasal lokal yang tepat harus diverifikasi sebelum penindakan.",links.jdih,true]
      ],
      action:["Gunakan komunikasi dan de-eskalasi.","Jaga akses pelayanan/aset sesuai penugasan.","Koordinasikan pengamanan massa dan dugaan pidana dengan Polri."]
    }
  };

  // Bungkus setiap kartu agar detail bisa muncul persis di bawah foto itu.
  [...grid.querySelectorAll(".law-visual-card")].forEach(card=>{
    if(card.parentElement.classList.contains("law-visual-item"))return;
    const wrap=document.createElement("div");
    wrap.className="law-visual-item";
    card.parentNode.insertBefore(wrap,card);
    wrap.appendChild(card);

    const detail=document.createElement("div");
    detail.className="law-inline-detail";
    detail.hidden=true;
    wrap.appendChild(detail);
  });

  function lawBox(label,item,kind){
    const [title,desc,url,caution]=item;
    return `
      <div class="law-inline-box ${kind} ${caution?"caution":""}">
        <span class="law-inline-label">${label}</span>
        <strong>${title}</strong>
        <p>${desc}</p>
        ${url?`<div class="law-inline-links"><a href="${url}" target="_blank" rel="noopener">Buka sumber ↗</a></div>`:""}
      </div>`;
  }

  function render(card,key){
    const d=data[key];
    if(!d)return;
    const wrap=card.closest(".law-visual-item");
    const detail=wrap.querySelector(".law-inline-detail");
    const alreadyOpen=!detail.hidden;

    document.querySelectorAll(".law-inline-detail").forEach(x=>x.hidden=true);
    document.querySelectorAll(".law-visual-card").forEach(x=>x.classList.remove("is-selected"));

    if(alreadyOpen)return;

    card.classList.add("is-selected");

    const national=d.national.map((x,i)=>lawBox(i===0?"DASAR HUKUM NASIONAL":"ATURAN NASIONAL",x,"national")).join("");
    const local=d.local.map((x,i)=>lawBox(i===0?"PERDA / ATURAN LEMBATA":"ATURAN DAERAH",x,"local")).join("");
    const action=`
      <div class="law-inline-box action">
        <span class="law-inline-label">TINDAKAN SATPOL PP</span>
        <strong>Arah tindakan di lapangan</strong>
        <ul>${d.action.map(x=>`<li>${x}</li>`).join("")}</ul>
      </div>`;
    const extra=(d.extra||[]).length
      ? `<div class="law-inline-links">${d.extra.map(x=>`<a href="${x[1]}" target="_blank" rel="noopener">${x[0]} ↗</a>`).join("")}</div>`
      : "";

    detail.innerHTML=`
      <div class="law-inline-head">
        <div class="law-inline-kicker">DASAR HUKUM LANGSUNG</div>
        <h3>${d.title}</h3>
        <p>${d.intro}</p>
      </div>
      <div class="law-inline-sections">
        ${national}
        ${local}
        ${action}
        ${extra}
      </div>
      <div class="law-inline-note">
        <b>Catatan:</b> pasal, sanksi, penyitaan, atau tindakan paksa hanya digunakan setelah naskah resmi dan SOP yang berlaku sudah diverifikasi.
      </div>`;
    detail.hidden=false;
  }

  // Menangkap klik sebelum handler v1.9 lama, jadi tidak lagi meloncat ke daftar bawah.
  document.addEventListener("click",e=>{
    const card=e.target.closest(".law-visual-card");
    if(!card || !grid.contains(card))return;
    const key=(card.dataset.lawterm||"").toLowerCase();
    if(!data[key])return;
    e.preventDefault();
    e.stopImmediatePropagation();
    render(card,key);
  },true);
})();
/* ===== END HUKUM INLINE FOTO v1.9.6 ===== */



/* ===== DYNAMIC NAV v1.10 ===== */
document.addEventListener("click",e=>{
  const btn=e.target.closest(".detail .navbtn");
  if(btn&&btn.dataset.page){
    e.preventDefault();
    showPage(btn.dataset.page);
  }
});
/* ===== END DYNAMIC NAV v1.10 ===== */





/* ===== KOREKSI MENTOR v1.15 ===== */
(function(){
  function parseHistory(){
    try{
      const arr=JSON.parse(localStorage.getItem("siap_test_history_v112")||"[]");
      return Array.isArray(arr)?arr:[];
    }catch(e){return []}
  }

  function latest(mode){
    return [...parseHistory()].reverse().find(x=>x && x.mode===mode) || null;
  }

  function refreshMentorIndicatorV115(){
    const pre=latest("pre");
    const post=latest("post");
    const p=document.getElementById("mentorPreV115");
    const q=document.getElementById("mentorPostV115");
    const d=document.getElementById("mentorDeltaV115");

    if(p) p.textContent=pre ? pre.score+"/100" : "Belum ada";
    if(q) q.textContent=post ? post.score+"/100" : "Belum ada";

    if(d){
      if(pre && post){
        const delta=Number(post.score)-Number(pre.score);
        d.textContent=(delta>0?"+":"")+delta+" poin";
        d.classList.toggle("up",delta>0);
        d.classList.toggle("down",delta<0);
      }else{
        d.textContent="-";
        d.classList.remove("up","down");
      }
    }
  }

  document.addEventListener("click",function(e){
    if(e.target.closest('[data-page="progress"],#submitQuiz,.test-tab')){
      setTimeout(refreshMentorIndicatorV115,60);
    }
  },true);

  window.addEventListener("hashchange",()=>setTimeout(refreshMentorIndicatorV115,50));
  window.addEventListener("storage",refreshMentorIndicatorV115);
  refreshMentorIndicatorV115();
  window.refreshMentorIndicatorV115=refreshMentorIndicatorV115;
})();
/* ===== END KOREKSI MENTOR v1.15 ===== */


/* ===== FINAL MOBILE SHELL v1.15.1 ===== */
(function(){
  const btn=document.getElementById("shellMenuV1151");
  if(!btn) return;

  btn.addEventListener("click",function(){
    const old=document.getElementById("hamburger") || document.getElementById("desktopMenuButton");
    if(old){
      old.click();
      return;
    }

    const menu=document.getElementById("mobileMenu");
    const backdrop=document.getElementById("menuBackdrop");
    if(menu){
      menu.classList.add("open");
      menu.setAttribute("aria-hidden","false");
      document.body.classList.add("menu-open");
    }
    if(backdrop){
      backdrop.classList.add("show","open");
      backdrop.setAttribute("aria-hidden","false");
    }
  });
})();
/* ===== END FINAL MOBILE SHELL v1.15.1 ===== */


/* ===== SIMULASI SEDERHANA v1.13 ===== */
(function(){
  const SIMS={
    pkl:{n:"01",title:"PKL keberatan ditata",story:"Pedagang berkata, “Saya sudah lama jualan di sini. Kenapa sekarang baru ditegur?”",img:"assets/visual/m2-01-pkl.webp",opts:[["kurang","“Tidak perlu banyak alasan. Ikuti saja arahan petugas.”","Terlalu cepat menutup komunikasi.","“Kami dengar dulu keberatannya, lalu kami jelaskan bagian yang perlu ditata.”"],["baik","Dengarkan keberatan, lalu jelaskan bagian yang perlu ditata.","Paling sesuai dengan komunikasi humanis dan persuasif.","“Kami paham Bapak sudah lama di sini. Mari kita lihat dulu bagian yang perlu dirapikan.”"],["cukup","Tinggalkan lokasi agar tidak terjadi perdebatan.","Bisa diperlukan jika situasi tidak aman, tetapi kondisi ini masih bisa dikomunikasikan.","Tetap komunikasikan maksud secara singkat lalu koordinasikan bila penolakan berlanjut."]]},
    bahujalan:{n:"02",title:"Pedagang di bahu jalan",story:"Pedagang berkata, “Orang lain juga jualan di sini. Kenapa saya yang ditegur?”",img:"assets/visual/m2-02-bahu-jalan.webp",opts:[["baik","Akui informasi tentang pedagang lain, lalu kembali pada kondisi di titik yang sedang ditangani.","Tetap fokus tanpa mengabaikan keberatan.","“Lokasi lain kami catat. Untuk titik ini, bagian yang perlu dirapikan adalah yang mengganggu akses.”"],["cukup","“Kalau orang lain salah, bukan berarti Bapak boleh salah.”","Mudah terdengar menggurui.","Fokuskan pada akses dan keselamatan."],["kurang","“Kalau tidak pindah sekarang kami tindak.”","Ancaman sebelum dasar tindakan dipastikan dapat memperburuk situasi.","Jelaskan kondisi, arahkan perbaikan, lalu koordinasikan."]]},
    bbm:{n:"03",title:"Penjual BBM eceran",story:"Penjual berkata keras, “Kenapa hanya saya? Memangnya saya menimbun?”",img:"assets/visual/m2-03-bbm-eceran.webp",opts:[["kurang","Langsung menyatakan penjualan itu pasti melanggar aturan.","Belum cukup fakta untuk membuat kesimpulan.","Hindari tuduhan dan catat kondisi yang terlihat."],["baik","Jelaskan bahwa petugas sedang mencatat kondisi, dengarkan penjelasan, lalu koordinasikan bila menyangkut kewenangan teknis lain.","Menjaga batas kewenangan.","“Kami belum menyimpulkan pelanggaran. Kami sedang melihat kondisi dan mencatat informasi.”"],["cukup","Mengakhiri percakapan karena penjual mulai meninggikan suara.","Belum tentu perlu jika situasi masih aman.","Redakan dulu dan gunakan kalimat singkat."]]},
    sampah:{n:"04",title:"Sampah sembarangan",story:"Warga berkata, “Cuma sedikit. Yang lain juga buang di sini.”",img:"assets/visual/m2-04-sampah.webp",opts:[["baik","Minta warga memperbaiki perilakunya dan jelaskan dampak kebersihan tanpa mempermalukan.","Fokus pada perilaku yang perlu diperbaiki.","“Mohon bantuannya sampah ini dipindahkan ke tempat yang semestinya.”"],["kurang","Foto warga lalu ancam menyebarkan foto agar jera.","Mempermalukan bukan pendekatan pembinaan.","Dokumentasi resmi tidak digunakan sebagai ancaman."],["cukup","Membiarkan karena sampahnya sedikit.","Fungsi imbauan tidak berjalan.","Berikan imbauan singkat dan proporsional."]]},
    parkir:{n:"05",title:"Juru parkir mempertanyakan teguran",story:"Juru parkir berkata, “Saya sudah atur baik-baik. Tidak ada masalah.”",img:"assets/visual/m2-05-juru-parkir.webp",opts:[["kurang","“Cara parkir Bapak memang salah dari awal.”","Menyerang cara kerja orangnya, bukan kondisi.","Tunjukkan posisi kendaraan yang menjadi perhatian."],["baik","Dengarkan penjelasan, tunjukkan posisi kendaraan yang mengganggu, lalu beri arahan konkret.","Fokus pada kondisi dan solusi.","“Kami lihat bagian ini mulai menyempit. Bisa kendaraan diatur sedikit ke bagian yang lebih aman?”"],["cukup","Ulangi teguran yang sama sampai juru parkir berhenti membantah.","Mengulang tanpa mendengar tidak membuat pesan lebih jelas.","Dengarkan dulu lalu kembali ke fakta."]]}
  };
  const ORDER=["pkl","bahujalan","bbm","sampah","parkir"];let current="pkl";const $=id=>document.getElementById(id);
  function load(key){
    if(!SIMS[key])return;current=key;const s=SIMS[key];
    document.querySelectorAll(".sim-select").forEach(b=>b.classList.toggle("active",b.dataset.sim===key));
    if($("simHero")){$("simHero").src=s.img;$("simHero").alt=s.title}
    if($("simNumber"))$("simNumber").textContent=`SKENARIO ${s.n} / 05`;
    if($("simTitle"))$("simTitle").textContent=s.title;if($("simStory"))$("simStory").textContent=s.story;
    if($("simOptions")){$("simOptions").innerHTML="";s.opts.forEach((o,i)=>{const b=document.createElement("button");b.type="button";b.className="sim-option";b.innerHTML=`<span>${String.fromCharCode(65+i)}</span><p>${o[1]}</p>`;b.addEventListener("click",()=>{document.querySelectorAll(".sim-option").forEach(x=>x.classList.remove("selected-good","selected-mid","selected-bad"));b.classList.add(o[0]==="baik"?"selected-good":o[0]==="cukup"?"selected-mid":"selected-bad");$("simFeedbackTitle").textContent=o[0]==="baik"?"Respons paling tepat":o[0]==="cukup"?"Masih bisa diperbaiki":"Perlu dipikirkan kembali";$("simFeedbackText").textContent=o[2];$("simBetter").textContent=o[3];$("simFeedback").classList.remove("hidden")});$("simOptions").appendChild(b)})}
    $("simFeedback")?.classList.add("hidden");
  }
  document.querySelectorAll(".sim-select").forEach(b=>b.addEventListener("click",()=>load(b.dataset.sim)));
  $("simNext")?.addEventListener("click",()=>load(ORDER[(ORDER.indexOf(current)+1)%ORDER.length]));
  if($("simTitle"))load("pkl");
})();
/* ===== END SIMULASI SEDERHANA v1.13 ===== */



/* ===== EVALUASI CLOUD v1.17.0 ===== */
(function(){
  "use strict";
  const Q=[
    {q:"Saat mulai berbicara dengan masyarakat, langkah yang paling tepat adalah...",o:["Langsung menyebut pelanggaran","Sapa, perkenalkan diri, jelaskan maksud, lalu dengarkan","Menaikkan nada agar terlihat tegas"],a:1},
    {q:"Jika masyarakat keberatan terhadap teguran, petugas sebaiknya...",o:["Mendengarkan dulu lalu menjelaskan kembali maksud secara singkat","Memotong pembicaraan agar tidak melebar","Langsung mengancam tindakan"],a:0},
    {q:"Jika dasar aturan atau kewenangan belum jelas...",o:["Tetap bertindak berdasarkan perkiraan","Klarifikasi dan koordinasikan terlebih dahulu","Gunakan kebiasaan lama sebagai dasar"],a:1},
    {q:"Pada situasi yang mulai tegang tetapi masih aman...",o:["Balas dengan suara lebih keras","Redakan percakapan dan gunakan kalimat singkat","Langsung menuduh masyarakat menghambat tugas"],a:1},
    {q:"SIAP SATPOL PP LEMBATA digunakan sebagai...",o:["SOP baru pengganti aturan resmi","Panduan praktis komunikasi lapangan yang tetap mengikuti SOP dan kewenangan","Aplikasi untuk menentukan sanksi"],a:1}
  ];
  const $=id=>document.getElementById(id);
  let mode="pre";
  const cloud=window.SIAP_EVAL_CLOUD;
  const configured=!!(cloud&&cloud.ready);
  function render(){
    const f=$("quizForm");if(!f)return;
    f.innerHTML=Q.map((q,i)=>'<fieldset class="quiz-question-v113"><legend>'+(i+1)+'. '+q.q+'</legend>'+q.o.map((o,j)=>'<label><input type="radio" name="q'+i+'" value="'+j+'"><span>'+String.fromCharCode(65+j)+'. '+o+'</span></label>').join("")+'</fieldset>').join("");
  }
  function setMode(m){
    mode=m;
    document.querySelectorAll(".test-tab").forEach(b=>b.classList.toggle("active",b.dataset.test===m));
    if($("submitQuiz"))$("submitQuiz").textContent="Kirim Hasil "+(m==="pre"?"Pre-Test":"Post-Test");
    $("quizResult")?.classList.add("hidden");
    render();
  }
  function identity(prefix){
    const name=($(prefix==="quiz"?"participantName":"fbName")?.value||"").trim();
    const code=($(prefix==="quiz"?"participantCode":"fbCode")?.value||"").trim().toUpperCase();
    const unit=($(prefix==="quiz"?"participantUnit":"fbUnit")?.value||"").trim();
    if(name.length<2||name.length>60){alert("Isi nama peserta (2–60 karakter).");return null;}
    if(!/^[A-Z0-9-]{4,24}$/.test(code)){alert("Isi kode peserta 4–24 karakter (huruf, angka, tanda hubung). Gunakan kode yang sama untuk pre-test, post-test, dan kuesioner.");return null;}
    return {name,code,unit};
  }
  function saveLocal(key,data){
    try{localStorage.setItem(key,JSON.stringify(data));return true;}catch(e){return false;}
  }
  async function deliver(data,status,button){
    const label=button?button.textContent:"";
    if(button){button.disabled=true;button.textContent="Mengirim ke pengelola…";}
    status.textContent=configured?"Menunggu konfirmasi Google Sheets…":"Belum terhubung ke Google Sheets; salinan lokal saja.";
    let result;
    try{result=await cloud.send(data);}
    catch(e){result={ok:false,message:"Pengiriman gagal. Tidak ada konfirmasi dari pengelola."};}
    status.textContent=(result.ok?"Terkirim ke pengelola. ":"BELUM terkirim ke pengelola. ")+result.message;
    status.style.color=result.ok?"#166534":"#9a3412";
    if(button){button.disabled=false;button.textContent=label;}
    return result.ok;
  }
  document.querySelectorAll(".test-tab").forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.test)));
  if($("evalConnectionNote")){
    $("evalConnectionNote").textContent=configured?
      "Jawaban akan dikirim ke rekap Google Sheets pengelola setelah mendapat konfirmasi. Gunakan kode peserta yang sama pada semua formulir.":
      "Pengiriman ke Google Sheets belum diaktifkan pengelola. Hasil belum dapat dipantau dari perangkat lain. Jangan gunakan untuk pendataan resmi sebelum aktif.";
  }
  $("submitQuiz")?.addEventListener("click",async ()=>{
    const person=identity("quiz");if(!person)return;
    let correct=0,answers=[];
    for(let i=0;i<Q.length;i++){
      const x=document.querySelector('input[name="q'+i+'"]:checked');
      if(!x){alert("Soal nomor "+(i+1)+" belum dijawab.");return;}
      const v=Number(x.value);answers.push(v);if(v===Q[i].a)correct++;
    }
    const score=correct*20;
    saveLocal(mode==="pre"?"siap_simple_pre_v113":"siap_simple_post_v113",{...person,score,answers,timestamp:new Date().toISOString()});
    $("quizScore").textContent=(mode==="pre"?"Pre-Test":"Post-Test")+": "+score+"/100";
    $("quizReview").innerHTML=Q.map((q,i)=>'<p>'+(answers[i]===q.a?"✓":"×")+' Soal '+(i+1)+'</p>').join("");
    $("quizResult").classList.remove("hidden");
    const packet={mode:mode,name:person.name,code:person.code,unit:person.unit};
    answers.forEach((v,i)=>packet["a"+i]=v);
    await deliver(packet,$("quizMessage"),$("submitQuiz"));
  });
  $("feedbackForm")?.addEventListener("submit",async e=>{
    e.preventDefault();
    const person=identity("feedback");if(!person)return;
    const ease=Number($("fbEase")?.value),help=Number($("fbHelp")?.value),clarity=Number($("fbClarity")?.value);
    if([ease,help,clarity].some(n=>!Number.isInteger(n)||n<1||n>5)){alert("Lengkapi tiga penilaian kuesioner.");return;}
    const note=($("fbNote")?.value||"").trim();
    const data={...person,ease,help,clarity,note,timestamp:new Date().toISOString()};
    saveLocal("siap_simple_feedback_v113",data);
    $("feedbackSaved")?.classList.remove("hidden");
    await deliver({...data,mode:"feedback"},$("feedbackStatus"),$("feedbackForm").querySelector('button[type="submit"]'));
  });
  render();
})();
/* ===== END EVALUASI CLOUD v1.17.0 ===== */
