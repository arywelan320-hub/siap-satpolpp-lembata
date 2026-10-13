import { chromium } from 'playwright';
import fs from 'node:fs';
const origin='http://127.0.0.1:8765/';
const widths=[320,375,390,430,768];
const rows=[];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
fs.mkdirSync('qa-artifacts',{recursive:true});
for (const width of widths){
  const page=await browser.newPage({viewport:{width,height:820},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror', e=>errors.push(e.message));
  const item={width,checks:[],errors};
  const check=(name,ok)=>{item.checks.push({name,pass:!!ok});if(!ok) item.errors.push(name+' gagal');};
  try {
    await page.goto(origin,{waitUntil:'load',timeout:25000});
    await page.waitForTimeout(350);
    check('Beranda aktif', await page.locator('#beranda').evaluate(e=>e.classList.contains('active')));
    check('10 halaman terpasang', await page.locator('main > section.page').count()===10);
    const overflow=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}));
    check('Tidak ada overflow horizontal',overflow.scrollWidth<=overflow.clientWidth+2);
    const trigger=page.locator(width<=650?'.mobile-shell-menu-v1151':'.topbar .hamburger.native-menu-trigger-v1147');
    await trigger.click();
    check('Drawer terbuka',await page.locator('#nativeMenuToggle').isChecked());
    await page.locator('#mobileMenu label[data-page="hukum"]').click();
    check('Menu SOP dapat dibuka',await page.locator('#hukum').evaluate(e=>e.classList.contains('active')));
    check('9 kelompok SOP',await page.locator('#hukum .sop-card-v1160').count()===9);
    if(width<=430){
      await page.locator('.bottom-nav button[data-page="simulasi"]').click();
      check('Simulasi terbuka',await page.locator('#simulasi').evaluate(e=>e.classList.contains('active')));
      check('Pilihan simulasi tersedia',await page.locator('#simOptions button').count()>=3);
      await page.locator('#simOptions button').first().click();
      check('Umpan balik simulasi muncul',await page.locator('#simFeedback').isVisible());
      await page.locator('.bottom-nav button[data-page="tes"]').click();
      check('Tes dapat dibuka',await page.locator('#tes').evaluate(e=>e.classList.contains('active')));
      check('Lima soal tersedia',await page.locator('#quizForm fieldset').count()===5);
      for(let k=0;k<5;k++) await page.locator('input[name="q'+k+'"]').first().check();
      await page.locator('#submitQuiz').click();
      check('Hasil tes tampil',await page.locator('#quizResult').isVisible());
    }
    await page.evaluate(()=>showPage('beranda'));
    await page.screenshot({path:'qa-artifacts/beranda-'+width+'.png',fullPage:true});
    await page.evaluate(()=>showPage('hukum'));
    await page.screenshot({path:'qa-artifacts/sop-'+width+'.png',fullPage:true});
  }catch(e){item.errors.push('Pengecualian: '+String(e.message||e));}
  rows.push(item);
  await page.close();
}
await browser.close();
fs.writeFileSync('qa-artifacts/hasil-mobile.json',JSON.stringify({tested_at:new Date().toISOString(),widths,results:rows},null,2));
for(const row of rows){
  const pass=row.checks.filter(x=>x.pass).length;
  console.log(row.width+'px: '+pass+'/'+row.checks.length+' lulus '+(row.errors.length?' | ERROR: '+row.errors.join('; '):''));
}
if(rows.some(r=>r.errors.length)) process.exitCode=1;
