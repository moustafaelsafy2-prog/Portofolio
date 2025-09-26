// Helpers
const $ = (s, p=document)=>p.querySelector(s);
const $$ = (s, p=document)=>Array.from(p.querySelectorAll(s));

/* Year */
$('#year') && ($('#year').textContent = new Date().getFullYear());

/* Burger (show/hide nav) */
$('.burger')?.addEventListener('click', ()=>{
  const nav = $('.mainnav');
  nav.style.display = (getComputedStyle(nav).display === 'none') ? 'flex' : 'none';
});

/* Language Packs */
const i18n = {
  ar:{
    nav:{services:'الخدمات',work:'الأعمال',process:'المنهجية',gallery:'المعرض',book:'احجز'},
    brandTitle:'مصطفى الصافي', brandSub:'إدارة مشاريع وأعمال • تأسيس وتشغيل وتسويق',
    heroTitle:'أُحوّل الرؤية إلى <span class="accent">مشاريع تعمل وتُقاس</span>',
    heroLead:'تأسيس شركات، ضبط التشغيل، وخطط تسويق عملية — لتسليم نتائج واضحة في الوقت والميزانية والجودة.',
    'services.h':'ماذا أقدّم', 'services.p':'حزم تنفيذية مختصرة بنتائج قابلة للقياس.',
    's1.h':'إدارة مشاريع (PMO)','s1.p':'هيكلة PMO، خارطة طريق، مؤشرات، وإدارة مخاطر وتغيير.','s1.b1':'إطار حوكمة ومتابعة','s1.b2':'تخطيط سعة وموارد','s1.b3':'تقارير تنفيذية',
    's2.h':'تأسيس وتشغيل الشركات','s2.p':'تصميم الهيكل التشغيلي، SOPs، وLOE/SLAs قابلة للقياس.','s2.b1':'خرائط عمليات','s2.b2':'OKRs & KPIs','s2.b3':'لوحات متابعة يومية',
    's3.h':'خطط تسويق ونمو','s3.p':'عرض قيمة، قمع مبيعات، وجدولة محتوى واختبارات A/B.','s3.b1':'GTM & Positioning','s3.b2':'Funnels & Automation','s3.b3':'تقارير ROI',
    'cases.h':'دراسات حالة مختصرة','cases.p':'عينات عملية توضح الأسلوب والعائد.',
    'c1.h':'إطلاق PMO لجهة خدمات','c1.p':'تسليم 11 مشروعًا في 2 ربع مع خفض المخاطر 24%.',
    'c2.h':'تأسيس وتشغيل 5 فروع','c2.p':'SOPs، تدريب، ولوحات قياس — تقليص الزمن 31%.',
    'c3.h':'خطة تسويق مع قمع مبيعات','c3.p':'+27% تحويل ورفع LTV في 90 يومًا.',
    more:'التفاصيل',
    'process.h':'كيف أعمل','process.p':'خطوات مركزة تُسلم نتائج ضمن الوقت والميزانية.',
    'p1.h':'تقييم سريع','p1.p':'تحليل فجوات وKPI الحالي وخريطة مخاطر.',
    'p2.h':'تصميم النظام','p2.p':'حوكمة PMO، SOPs، ولوحات قياس.',
    'p3.h':'التنفيذ','p3.p':'إدارة موارد وجدولة، وWBS قابل للقياس.',
    'p4.h':'التحسين','p4.p':'تقارير تنفيذية، A/B، وتجربة مستمرة.',
    'gallery.h':'المعرض','gallery.p':'صور توضيحية من بيئات العمل، غرف عمليات، وتقارير.',
    'cta.h':'جاهز لتحويل الفكرة إلى تشغيل؟','cta.p':'احجز جلسة تعريفية قصيرة لنضع خطة تنفيذ حقيقية.',
    'cta.book':'احجز الآن','cta.call':'اتصال','cta.wa':'واتساب','cta.mail':'إيميل','cta.hint':'سيُفتح التطبيق المناسب دون عرض البيانات نصيًا.',
    'modal.call':'اتصال الآن','modal.wa':'واتساب','modal.mail':'إيميل',
    footerName:'مصطفى الصافي'
  },
  en:{
    nav:{services:'Services',work:'Work',process:'Process',gallery:'Gallery',book:'Book'},
    brandTitle:'Mostafa Al-Safy', brandSub:'Project & Business Management • Setup, Operations, Marketing',
    heroTitle:'I turn vision into <span class="accent">projects that ship & scale</span>',
    heroLead:'Company setup, lean operations, and actionable marketing plans—on time, on budget, on quality.',
    'services.h':'What I Deliver', 'services.p':'Execution-first packages with measurable outcomes.',
    's1.h':'Project Management (PMO)','s1.p':'PMO setup, roadmap, KPIs, and risk/change control.','s1.b1':'Governance & tracking','s1.b2':'Capacity & resourcing','s1.b3':'Executive reporting',
    's2.h':'Company Setup & Operations','s2.p':'Operating model, SOPs, measurable SLAs and LOE.','s2.b1':'Process maps','s2.b2':'OKRs & KPIs','s2.b3':'Daily dashboards',
    's3.h':'Marketing & Growth Plans','s3.p':'Value proposition, sales funnels, content & A/B tests.','s3.b1':'GTM & Positioning','s3.b2':'Funnels & Automation','s3.b3':'ROI reporting',
    'cases.h':'Selected Case Studies','cases.p':'Practical samples that show approach and ROI.',
    'c1.h':'PMO Launch for Services Org','c1.p':'11 projects delivered across 2 quarters; risk -24%.',
    'c2.h':'Setup & Operate 5 Branches','c2.p':'SOPs, training & dashboards; cycle time -31%.',
    'c3.h':'Marketing Plan + Funnel','c3.p':'+27% conversion and higher LTV in 90 days.',
    more:'Details',
    'process.h':'How I Work','process.p':'Focused steps that ship results on time and on budget.',
    'p1.h':'Rapid Assessment','p1.p':'Gap analysis, current KPIs, and risk map.',
    'p2.h':'System Design','p2.p':'PMO governance, SOPs, and dashboards.',
    'p3.h':'Execution','p3.p':'Resourcing, scheduling, and measurable WBS.',
    'p4.h':'Optimization','p4.p':'Executive reporting, A/B tests, continuous improvement.',
    'gallery.h':'Gallery','gallery.p':'Illustrative workplace, ops rooms, and reporting visuals.',
    'cta.h':'Ready to turn ideas into operations?','cta.p':'Book a short intro to map a real execution plan.',
    'cta.book':'Book Now','cta.call':'Call','cta.wa':'WhatsApp','cta.mail':'Email','cta.hint':'We will open the proper app without exposing details.',
    'modal.call':'Call Now','modal.wa':'WhatsApp','modal.mail':'Email',
    footerName:'Mostafa Al-Safy'
  }
};
let LANG = 'ar';

function applyLang(l){
  LANG = l;
  document.documentElement.lang = (l==='ar'?'ar':'en');
  document.documentElement.dir  = (l==='ar'?'rtl':'ltr');
  document.body.setAttribute('data-lang', l);
  const t = i18n[l];
  // simple keys
  $('[data-i18n="nav.services"]').textContent = t.nav.services;
  $('[data-i18n="nav.work"]').textContent = t.nav.work;
  $('[data-i18n="nav.process"]').textContent = t.nav.process;
  $('[data-i18n="nav.gallery"]').textContent = t.nav.gallery;
  $('[data-i18n="nav.book"]').textContent = t.nav.book;
  $('#t.brandTitle').textContent = t.brandTitle;
  $('#t.brandSub').textContent   = t.brandSub;
  $('#t.heroTitle').innerHTML    = t.heroTitle;
  $('#t.heroLead').textContent   = t.heroLead;

  // bulk map
  const keys = ['services.h','services.p','s1.h','s1.p','s1.b1','s1.b2','s1.b3','s2.h','s2.p','s2.b1','s2.b2','s2.b3','s3.h','s3.p','s3.b1','s3.b2','s3.b3','cases.h','cases.p','c1.h','c1.p','c2.h','c2.p','c3.h','c3.p','more','process.h','process.p','p1.h','p1.p','p2.h','p2.p','p3.h','p3.p','p4.h','p4.p','gallery.h','gallery.p','cta.h','cta.p','cta.book','cta.call','cta.wa','cta.mail','modal.call','modal.wa','modal.mail','cta.hint'];
  keys.forEach(k=>{
    const el = document.querySelector(`[data-i18n="${k}"]`);
    if (el) el.textContent = t[k];
  });
  $('#t.footerName').textContent = t.footerName;
  $('#langToggle').textContent   = (l==='ar'?'EN':'AR');
}
applyLang('ar');

$('#langToggle').addEventListener('click', ()=>applyLang(LANG==='ar'?'en':'ar'));

/* Carousel */
const track = $('#caseTrack'), dotsWrap = $('#caseDots');
if (track && dotsWrap){
  const slides = Array.from(track.children);
  let idx = 0, auto;
  function updateDots(){ dotsWrap.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active', i===idx)); }
  function go(n){
    idx = (n + slides.length) % slides.length;
    const X = slides[idx].offsetLeft - track.offsetLeft;
    track.scrollTo({left:X, behavior:'smooth'}); updateDots();
  }
  slides.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('aria-label',`slide ${i+1}`); b.onclick=()=>go(i); dotsWrap.appendChild(b); });
  updateDots();
  document.querySelector('.prev').onclick=()=>go(idx-1);
  document.querySelector('.next').onclick=()=>go(idx+1);
  const startAuto=()=>auto=setInterval(()=>go(idx+1),5000);
  const stopAuto =()=>clearInterval(auto);
  track.addEventListener('mouseenter',stopAuto);
  track.addEventListener('mouseleave',startAuto);
  startAuto();
  // swipe
  let startX=0;
  track.addEventListener('touchstart',e=>{ startX=e.touches[0].clientX; },{passive:true});
  track.addEventListener('touchend',e=>{ const dx=e.changedTouches[0].clientX-startX; if(Math.abs(dx)>50){ dx>0?go(idx-1):go(idx+1);} },{passive:true});
}

/* Case Modal */
const CASES = {
  ar:{
    1:{t:'إطلاق PMO لجهة خدمات', d:'إعداد إطار الحوكمة، تقارير أسبوعية، ومصفوفة مخاطر. تم تسليم 11 مشروعًا خلال ربعين وتقليل المخاطر 24%.', b:['حوكمة PMO','تقارير تنفيذية','خفض المخاطر 24%']},
    2:{t:'تأسيس وتشغيل 5 فروع', d:'SOPs موحدة، تدريب، ولوحات قياس. تقليص زمن الدورة 31% وتحسن رضا العملاء.', b:['SOPs موحدة','لوحات قياس يومية','-31% زمن الدورة']},
    3:{t:'خطة تسويق + قمع مبيعات', d:'صياغة عرض قيمة وتجارب A/B ورسائل متابعة. +27% تحويل خلال 90 يومًا.', b:['عرض قيمة','A/B + Follow-ups','+27% تحويل']}
  },
  en:{
    1:{t:'PMO Launch for Services Org', d:'Governance framework, weekly reporting, risk matrix. 11 projects shipped in two quarters; risks down 24%.', b:['PMO governance','Exec reporting','-24% risk']},
    2:{t:'Setup & Operate 5 Branches', d:'Unified SOPs, training, dashboards. Cycle time down 31%; CSAT up.', b:['Unified SOPs','Daily dashboards','-31% cycle time']},
    3:{t:'Marketing Plan + Funnel', d:'Value prop, A/B tests, follow-ups. +27% conversion in 90 days.', b:['Value proposition','A/B + follow-ups','+27% conversion']}
  }
};
const caseModal = $('#caseModal');
const cTitle = $('#caseTitle'), cDesc = $('#caseDesc'), cBul = $('#caseBullets');
$$('.open-modal').forEach(b=>{
  b.addEventListener('click', ()=>{
    const id=b.dataset.case;
    const data = CASES[LANG][id];
    cTitle.textContent=data.t; cDesc.textContent=data.d;
    cBul.innerHTML=''; data.b.forEach(x=>{ const li=document.createElement('li'); li.textContent=x; cBul.appendChild(li); });
    caseModal.classList.add('show'); caseModal.setAttribute('aria-hidden','false');
  });
});
caseModal?.querySelector('.close')?.addEventListener('click', ()=>{ caseModal.classList.remove('show'); caseModal.setAttribute('aria-hidden','true'); });
caseModal?.addEventListener('click', e=>{ if(e.target===caseModal) { caseModal.classList.remove('show'); caseModal.setAttribute('aria-hidden','true'); }});

/* Contact Modal (no public data) */
const contactModal = $('#contactModal');
const contactTitle = $('#contactTitle'), contactDesc = $('#contactDesc');
const copy = {
  ar:{callTitle:'اتصال',callDesc:'سيتم فتح تطبيق الاتصال مباشرة.',waTitle:'واتساب',waDesc:'سيتم فتح واتساب برسالة تمهيدية.',emTitle:'إيميل',emDesc:'سيتم فتح برنامج البريد.'},
  en:{callTitle:'Phone Call',callDesc:'We will open your dialer directly.',waTitle:'WhatsApp',waDesc:'We will open WhatsApp with a starter message.',emTitle:'Email',emDesc:'We will open your mail app.'}
};
$$('.open-contact').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const ch=btn.dataset.channel; const c=copy[LANG];
    const m = {call:[c.callTitle,c.callDesc], whatsapp:[c.waTitle,c.waDesc], email:[c.emTitle,c.emDesc]}[ch];
    contactTitle.textContent = m[0]; contactDesc.textContent = m[1];
    contactModal.classList.add('show'); contactModal.setAttribute('aria-hidden','false');
    $$('.do-action').forEach(x=>x.classList.remove('primary'));
    $(`.do-action[data-action="${ch}"]`)?.classList.add('primary');
  });
});
contactModal?.querySelector('.close')?.addEventListener('click', ()=>{ contactModal.classList.remove('show'); contactModal.setAttribute('aria-hidden','true'); });
contactModal?.addEventListener('click', e=>{ if(e.target===contactModal) { contactModal.classList.remove('show'); contactModal.setAttribute('aria-hidden','true'); }});
$$('.do-action').forEach(btn=>btn.addEventListener('click', ()=>{ window.location.href = btn.dataset.hidden; }));

/* Gallery modal */
const imgModal = $('#imgModal'), imgBig = $('#imgBig');
$('#galGrid')?.addEventListener('click', e=>{
  const t = e.target.closest('.gimg'); if(!t) return;
  imgBig.src = t.src; imgModal.classList.add('show'); imgModal.setAttribute('aria-hidden','false');
});
imgModal?.querySelector('.close')?.addEventListener('click', ()=>{ imgModal.classList.remove('show'); imgModal.setAttribute('aria-hidden','true'); });
imgModal?.addEventListener('click', e=>{ if(e.target===imgModal) { imgModal.classList.remove('show'); imgModal.setAttribute('aria-hidden','true'); }});
