/* Helpers */
const $ = (s, p=document)=>p.querySelector(s);
const $$ = (s, p=document)=>Array.from(p.querySelectorAll(s));

/* Year */
$('#year') && ($('#year').textContent = new Date().getFullYear());

/* Burger */
$('.burger')?.addEventListener('click', ()=>{
  const nav = $('.mainnav');
  nav.style.display = (getComputedStyle(nav).display === 'none') ? 'flex' : 'none';
});

/* ===== i18n (يعمل فعليًا) ===== */
const I18N = {
  ar:{
    brandName:'مصطفى الصافي', brandTag:'إدارة مشاريع وأعمال • تأسيس وتشغيل وتسويق',
    'nav.services':'الخدمات','nav.work':'الأعمال','nav.process':'المنهجية','nav.contact':'تواصل','nav.book':'احجز',
    'hero.title_html':'أُحوّل الرؤية إلى <span class="accent">مشاريع تعمل وتُقاس</span>',
    'hero.lead':'تأسيس شركات، ضبط التشغيل، وخطط تسويق عملية — لتسليم نتائج واضحة في الوقت والميزانية والجودة.',
    'services.h':'خدمات تنفيذية سريعة','services.p':'حزم عملية تُسلم قيمة واضحة خلال أسابيع.',
    's1.h':'إدارة مشاريع (PMO)','s1.p':'حوكمة، خارطة طريق، KPIs، إدارة مخاطر وتغيير.','s1.b1':'Governance & Tracking','s1.b2':'Capacity & Resourcing','s1.b3':'Executive Reports',
    's2.h':'تأسيس وتشغيل الشركات','s2.p':'Operating Model، SOPs، SLAs قابلة للقياس.','s2.b1':'خرائط عمليات','s2.b2':'OKRs & KPIs','s2.b3':'Daily Dashboards',
    's3.h':'خطط تسويق ونمو','s3.p':'عرض قيمة، قمع مبيعات، محتوى واختبارات A/B.','s3.b1':'GTM & Positioning','s3.b2':'Funnels & Automation','s3.b3':'ROI Reporting',
    'cases.h':'نتائج مختصرة','cases.p':'عينات تُظهر الأسلوب والعائد.',
    'c1.h':'إطلاق PMO — خدمات','c1.p':'11 مشروعًا/ربعين • خفض مخاطر 24%.',
    'c2.h':'تشغيل 5 فروع','c2.p':'SOPs ولوحات قياس • -31% زمن دورة.',
    'c3.h':'خطة تسويق + قمع','c3.p':'+27% تحويل • رفع LTV خلال 90 يومًا.',
    'more':'التفاصيل',
    'cta.h':'لنحوّل الأهداف إلى تشغيل فعلي','cta.p':'جلسة تعريف قصيرة لوضع خطة تنفيذ قابلة للقياس.',
    'cta.book':'احجز الآن','cta.wa':'واتساب','cta.call':'اتصال','cta.mail':'إيميل','cta.hint':'سيتم فتح التطبيق المناسب دون إظهار البيانات.',
    'modal.call':'اتصال الآن','modal.wa':'واتساب','modal.mail':'إيميل'
  },
  en:{
    brandName:'Mostafa Al-Safy', brandTag:'Project & Business Management • Setup, Operations, Marketing',
    'nav.services':'Services','nav.work':'Work','nav.process':'Process','nav.contact':'Contact','nav.book':'Book',
    'hero.title_html':'I turn vision into <span class="accent">projects that ship & scale</span>',
    'hero.lead':'Company setup, lean operations, and actionable marketing—on time, on budget, on quality.',
    'services.h':'Execution-First Services','services.p':'Short, high-impact packages that deliver measurable value.',
    's1.h':'Project Management (PMO)','s1.p':'Governance, roadmap, KPIs, risk/change control.','s1.b1':'Governance & Tracking','s1.b2':'Capacity & Resourcing','s1.b3':'Executive Reports',
    's2.h':'Company Setup & Operations','s2.p':'Operating model, SOPs, and measurable SLAs.','s2.b1':'Process Maps','s2.b2':'OKRs & KPIs','s2.b3':'Daily Dashboards',
    's3.h':'Marketing & Growth Plans','s3.p':'Value prop, sales funnels, content & A/B tests.','s3.b1':'GTM & Positioning','s3.b2':'Funnels & Automation','s3.b3':'ROI Reporting',
    'cases.h':'Selected Results','cases.p':'Examples that demonstrate approach and ROI.',
    'c1.h':'PMO Launch — Services','c1.p':'11 projects / 2 quarters • risk -24%.',
    'c2.h':'Operate 5 Branches','c2.p':'Unified SOPs & dashboards • cycle time -31%.',
    'c3.h':'Marketing Plan + Funnel','c3.p':'+27% conversion • higher LTV in 90 days.',
    'more':'Details',
    'cta.h':'Let’s turn goals into operations','cta.p':'Book a short intro to map a measurable execution plan.',
    'cta.book':'Book Now','cta.wa':'WhatsApp','cta.call':'Call','cta.mail':'Email','cta.hint':'We will open the proper app without exposing details.',
    'modal.call':'Call Now','modal.wa':'WhatsApp','modal.mail':'Email'
  }
};
let LANG='ar';

function applyLang(l){
  LANG=l;
  document.documentElement.lang = (l==='ar'?'ar':'en');
  document.documentElement.dir  = (l==='ar'?'rtl':'ltr');
  document.body.setAttribute('data-lang', l);
  const pack = I18N[l];

  // بدّل كل العناصر التي لها data-i18n
  $$('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const val = pack[key];
    if (val == null) return;
    if (key.endsWith('_html') || /<[^>]+>/.test(val)) el.innerHTML = val;
    else el.textContent = val;
  });

  $('#langToggle').textContent = (l==='ar'?'EN':'AR');
}
applyLang('ar');
$('#langToggle').addEventListener('click', ()=>applyLang(LANG==='ar'?'en':'ar'));

/* ===== Carousel (يعمل) ===== */
const track = $('#caseTrack'), dotsWrap = $('#caseDots');
if (track && dotsWrap){
  const slides = Array.from(track.children);
  let idx=0, auto;
  function updateDots(){ dotsWrap.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active', i===idx)); }
  function go(n){ idx=(n+slides.length)%slides.length; track.scrollTo({left:slides[idx].offsetLeft-track.offsetLeft,behavior:'smooth'}); updateDots(); }
  slides.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('aria-label','slide '+(i+1)); b.onclick=()=>go(i); dotsWrap.appendChild(b); });
  updateDots();
  $('.prev').onclick=()=>go(idx-1); $('.next').onclick=()=>go(idx+1);
  const start=()=>auto=setInterval(()=>go(idx+1),5000), stop=()=>clearInterval(auto);
  track.addEventListener('mouseenter',stop); track.addEventListener('mouseleave',start); start();
  let sx=0; track.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
  track.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>50){dx>0?go(idx-1):go(idx+1)}},{passive:true});
}

/* ===== Case Modal ===== */
const CASES={
  ar:{1:{t:'إطلاق PMO — خدمات',d:'حوكمة، تقارير أسبوعية، ومصفوفة مخاطر. 11 مشروعًا خلال ربعين وخفض مخاطر 24%.',b:['PMO Governance','تقارير تنفيذية','-24% مخاطر']},
      2:{t:'تشغيل 5 فروع',d:'SOPs موحدة، تدريب ولوحات قياس. -31% زمن الدورة وارتفاع رضا العملاء.',b:['SOPs','Daily Dashboards','-31% زمن']},
      3:{t:'خطة تسويق + قمع',d:'عرض قيمة، اختبارات A/B ورسائل متابعة. +27% تحويل في 90 يومًا.',b:['Value Prop','A/B + Follow-ups','+27% تحويل']}},
  en:{1:{t:'PMO Launch — Services',d:'Governance, weekly reporting, and risk matrix. 11 projects in two quarters; risk -24%.',b:['PMO Governance','Executive Reports','-24% risk']},
      2:{t:'Operate 5 Branches',d:'Unified SOPs, training, dashboards. Cycle time -31%; CSAT up.',b:['Unified SOPs','Daily Dashboards','-31% cycle time']},
      3:{t:'Marketing Plan + Funnel',d:'Value prop, A/B tests, follow-ups. +27% conversion in 90 days.',b:['Value Prop','A/B + Follow-ups','+27% conversion']}}
};
const caseModal = $('#caseModal');
const cTitle = $('#caseTitle'), cDesc = $('#caseDesc'), cBul = $('#caseBullets');
$$('.open-case').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const data = CASES[LANG][btn.dataset.case];
    cTitle.textContent = data.t; cDesc.textContent = data.d;
    cBul.innerHTML=''; data.b.forEach(x=>{const li=document.createElement('li'); li.textContent=x; cBul.appendChild(li);});
    caseModal.classList.add('show'); caseModal.setAttribute('aria-hidden','false');
  });
});
caseModal?.querySelector('.close')?.addEventListener('click', ()=>{ caseModal.classList.remove('show'); caseModal.setAttribute('aria-hidden','true'); });
caseModal?.addEventListener('click', e=>{ if(e.target===caseModal){ caseModal.classList.remove('show'); caseModal.setAttribute('aria-hidden','true'); }});

/* ===== Contact Modal (الأزرار تعمل) ===== */
const contactModal = $('#contactModal');
const contactCopy = {
  ar:{call:['اتصال','سيتم فتح تطبيق الاتصال مباشرة.'],
      whatsapp:['واتساب','سيتم فتح واتساب برسالة تمهيدية.'],
      email:['إيميل','سيتم فتح برنامج البريد.']},
  en:{call:['Call','We will open your dialer directly.'],
      whatsapp:['WhatsApp','We will open WhatsApp with a starter message.'],
      email:['Email','We will open your mail app.']}
};
$$('.open-contact').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const ch = btn.dataset.channel;
    const [t,d] = contactCopy[LANG][ch];
    $('#contactTitle').textContent = t;
    $('#contactDesc').textContent  = d;
    contactModal.classList.add('show'); contactModal.setAttribute('aria-hidden','false');
    $$('.do-action').forEach(x=>x.classList.remove('primary'));
    $(`.do-action[data-action="${ch}"]`)?.classList.add('primary');
  });
});
contactModal?.querySelector('.close')?.addEventListener('click', ()=>{ contactModal.classList.remove('show'); contactModal.setAttribute('aria-hidden','true'); });
contactModal?.addEventListener('click', e=>{ if(e.target===contactModal){ contactModal.classList.remove('show'); contactModal.setAttribute('aria-hidden','true'); }});
$$('.do-action').forEach(btn=>btn.addEventListener('click', ()=>{ window.location.href = btn.dataset.hidden; }));
