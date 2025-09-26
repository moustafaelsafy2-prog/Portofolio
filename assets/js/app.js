// ===== Utilities & State =====
const $ = (s, p=document)=>p.querySelector(s);
const $$ = (s, p=document)=>Array.from(p.querySelectorAll(s));
const LANGS = {
  ar: {
    nav:{home:"الرئيسية",about:"عني",services:"الخدمات",cases:"أعمال",insights:"نتائج",book:"احجز"},
    cta:{book:"احجز جلسة",call:"اتصال",whatsapp:"واتساب",email:"إيميل"},
    brandTitle:"مصطفى الصافي", brandSub:"أصنع نموًا قابلاً للقياس — بدون تعقيد",
    heroTitle:"أحوّل الاستراتيجية إلى <span class='grad'>نتائج تسويقية قابلة للقياس</span>",
    heroLead:"أُصمم عروض قيمة وقمع مبيعات، وأبني لوحات قياس وأتمتة خفيفة—لتضاعف العائد وتقلل الهدر بسرعة.",
    badge:"علامة شخصية • تنفيذ", heroCardH:"مصطفى الصافي", heroCardP:"Growth & Marketing Execution",
    v1h:"عرض قيمة مقنع", v1p:"صياغة Promise واضح + تفريق حقيقي + Social Proof يقنع دون خصومات.",
    v2h:"قمع مبيعات ذكي", v2p:"صفحات هبوط، رسائل متابعة، وتجارب A/B ترفع التحويل بأقل تكلفة.",
    v3h:"لوحات قياس", v3p:"KPIs يومية تربط التسويق بالمبيعات والخدمة لاتخاذ قرار سريع.",
    services:{h:"ماذا أقدّم", p:"حزم تنفيذية قصيرة المدى بنتائج ملموسة: من صياغة عرض القيمة حتى التشغيل والقياس."},
    s1:{h:"تحسين العرض والرسائل", p:"Promise واضح، مزايا تفاضلية، وCTA يحفّز الطلب.", b1:"قصة علامة شخصية تُباع", b2:"Landing Pages عالية التحويل", b3:"محتوى قصير مقنع (Social)"},
    s2:{h:"قمع مبيعات + متابعة", p:"تجارب A/B وسيناريوهات Follow-up تقلل التسرب.", b1:"نماذج/رسائل تحقّق", b2:"Automation خفيفة", b3:"تحسين أسبوعي"},
    s3:{h:"لوحات قياس وتنبيه", p:"KPIs يومية تربط التسويق بالمبيعات والخدمة.", b1:"Dashboards تنفيذية", b2:"تنبيهات الانحراف", b3:"تقارير مقتضبة"},
    cases:{h:"أعمال مختصرة", p:"نماذج تطبيق واقعية تعكس طريقة التنفيذ."},
    c1:{h:"تحسين صفحة هبوط", p:"رفع التحويل 22% خلال 3 أسابيع عبر اختبار CTA والمصداقية."},
    c2:{h:"قمع مبيعات قصير", p:"تقليل التسرب 18% بسيناريوهات متابعة ورسائل تحقق."},
    c3:{h:"لوحة قياس تنفيذية", p:"ربط التسويق بالمبيعات واتخاذ قرار أسرع يوميًا."},
    more:"التفاصيل",
    insights:{h:"نتائج مختصرة", p:"رسوم تفاعلية توضّح التأثير قبل/بعد."},
    chartsNote:"* أمثلة توضيحية لأسلوب التحليل؛ الأرقام قابلة للتخصيص حسب نشاطك.",
    contact:{h:"دعنا نبدأ", p:"جلسة قصيرة لتحديد الأولويات وتحويلها إلى خطة قابلة للتنفيذ."},
    modal:{call:"اتصال الآن", whatsapp:"واتساب", email:"إيميل"},
    footerName:"مصطفى الصافي"
  },
  en: {
    nav:{home:"Home",about:"About",services:"Services",cases:"Work",insights:"Insights",book:"Book"},
    cta:{book:"Book a Session",call:"Call",whatsapp:"WhatsApp",email:"Email"},
    brandTitle:"Mostafa Al-Safy", brandSub:"I drive measurable growth — without complexity",
    heroTitle:"I turn strategy into <span class='grad'>measurable marketing outcomes</span>",
    heroLead:"I craft value propositions & funnels, build dashboards and light automations—to boost ROI fast.",
    badge:"Personal Brand • Execution", heroCardH:"Mostafa Al-Safy", heroCardP:"Growth & Marketing Execution",
    v1h:"Compelling Value Proposition", v1p:"Clear promise + true differentiation + social proof that sells.",
    v2h:"Smart Sales Funnel", v2p:"Landing pages, follow-ups, and A/B tests that lift conversions.",
    v3h:"Dashboards & KPIs", v3p:"Daily KPIs linking marketing to sales & service for fast decisions.",
    services:{h:"What I Deliver", p:"Short, execution-first packages: from offer design to ops & measurement."},
    s1:{h:"Offer & Messaging", p:"Sharp promise, differentiation, and a CTA that triggers action.", b1:"A personal brand story that sells", b2:"High-converting landing pages", b3:"Concise social content"},
    s2:{h:"Funnel & Follow-ups", p:"A/B tests and follow-up scenarios to reduce leakage.", b1:"Verification forms/messages", b2:"Lightweight automation", b3:"Weekly optimization"},
    s3:{h:"Dashboards & Alerts", p:"Daily KPIs linking marketing to sales & service.", b1:"Executive dashboards", b2:"Deviation alerts", b3:"Brief reporting"},
    cases:{h:"Selected Work", p:"Practical samples of how I execute."},
    c1:{h:"Landing Page Optimization", p:"+22% conversion in 3 weeks via CTA & credibility tests."},
    c2:{h:"Tight Sales Funnel", p:"-18% leakage using follow-ups and verifications."},
    c3:{h:"Executive Dashboard", p:"Daily link between marketing & sales for fast action."},
    more:"Details",
    insights:{h:"Quick Results", p:"Interactive charts showing before/after impact."},
    chartsNote:"* Illustrative analytics. Numbers adapt to your business.",
    contact:{h:"Let’s Start", p:"A short session to prioritize and turn goals into action."},
    modal:{call:"Call Now", whatsapp:"WhatsApp", email:"Email"},
    footerName:"Mostafa Al-Safy"
  }
};
let LANG = 'ar';

// ===== Year =====
$('#year').textContent = new Date().getFullYear();

// ===== Intersection Reveal =====
const reveals = $$('.reveal');
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{threshold:0.12});
reveals.forEach(r=>io.observe(r));

// ===== Tilt =====
$$('.tilt').forEach(el=>{
  let rAF;
  const onMove = (e)=>{
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    el.style.transform = `rotateY(${x*-6}deg) rotateX(${y*6}deg)`;
  };
  el.addEventListener('mousemove', (e)=>{ cancelAnimationFrame(rAF); rAF = requestAnimationFrame(()=>onMove(e)); });
  el.addEventListener('mouseleave', ()=>{ el.style.transform = ''; });
});

// ===== Burger =====
const burger = $('.burger');
burger?.addEventListener('click', ()=>{
  const nav = $('.menu');
  nav.style.display = (getComputedStyle(nav).display === 'none') ? 'flex' : 'none';
});

// ===== Active underline =====
const menu = $('.menu');
if (menu){
  const underline = $('.active-underline', menu);
  const links = $$('a:not(.cta)', menu);
  const setUnderline = (a)=>{
    const r = a.getBoundingClientRect(), pr = menu.getBoundingClientRect();
    underline.style.width = r.width + 'px';
    underline.style.right = (pr.right - r.right) + 'px';
  };
  links.forEach(a=>{ a.addEventListener('mouseenter', ()=>setUnderline(a)); a.addEventListener('click', ()=>setUnderline(a)); });
  setUnderline($('.active', menu) || links[0]);
}

// ===== Carousel (Cases) =====
const track = $('#caseTrack'), dotsWrap = $('#caseDots');
if (track && dotsWrap){
  const slides = Array.from(track.children);
  let idx = 0, auto;
  function updateDots(){ dotsWrap.querySelectorAll('button').forEach((b,i)=> b.classList.toggle('active', i===idx)); }
  function go(n){
    idx = (n + slides.length) % slides.length;
    track.scrollTo({left: slides[idx].offsetLeft - track.offsetLeft, behavior:'smooth'}); updateDots();
  }
  slides.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('aria-label',`Slide ${i+1}`); b.onclick=()=>go(i); dotsWrap.appendChild(b); });
  updateDots();
  $('.prev').onclick=()=>go(idx-1); $('.next').onclick=()=>go(idx+1);
  const startAuto = ()=> auto = setInterval(()=>go(idx+1), 5000);
  const stopAuto  = ()=> clearInterval(auto);
  track.addEventListener('mouseenter', stopAuto); track.addEventListener('mouseleave', startAuto); startAuto();
  // drag/swipe
  let isDown=false, startX, scrollLeft;
  track.addEventListener('mousedown', e=>{ isDown=true; startX=e.pageX - track.offsetLeft; scrollLeft=track.scrollLeft;});
  track.addEventListener('mouseleave', ()=>{ isDown=false;});
  track.addEventListener('mouseup', ()=>{ isDown=false;});
  track.addEventListener('mousemove', e=>{ if(!isDown) return; e.preventDefault(); const x=e.pageX-track.offsetLeft; const walk=(x-startX)*1.3; track.scrollLeft=scrollLeft-walk;});
  let touchStartX=0;
  track.addEventListener('touchstart', e=>{ touchStartX=e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', e=>{ const dx=e.changedTouches[0].clientX - touchStartX; if(Math.abs(dx)>50){ dx>0?go(idx-1):go(idx+1);} }, {passive:true});
}

// ===== Cases Modal =====
const caseModal = $('#caseModal');
const caseClose = caseModal?.querySelector('.modal-close');
const cTitle = $('#caseTitle'), cDesc = $('#caseDesc'), cBul = $('#caseBullets');
const CASES = {
  '1': { ar:{t:'تحسين صفحة هبوط', d:'اختبار CTA والمصداقية، وترتيب عناصر الصفحة حسب Heatmap.', b:['CTA واضح', 'أدلة اجتماعية', 'تقليل الإلهاء']},
         en:{t:'Landing Page Optimization', d:'CTA & credibility tests; heatmap-driven layout.', b:['Crisp CTA','Social proof','Reduced distractions']} },
  '2': { ar:{t:'قمع مبيعات قصير', d:'متابعة برسائل تحقق وبناء ثقة تقلل التسرب.', b:['نماذج تحقق','رسائل قصيرة','مواعيد تلقائية']},
         en:{t:'Tight Sales Funnel', d:'Verification & trust-building follow-ups reduce leakage.', b:['Verification forms','Short messaging','Auto scheduling']} },
  '3': { ar:{t:'لوحة قياس تنفيذية', d:'ربط التسويق بالمبيعات مع تنبيهات انحراف يومية.', b:['KPIs يومية','تنبيهات فورية','تقارير مختصرة']},
         en:{t:'Executive Dashboard', d:'Daily link between marketing & sales with deviation alerts.', b:['Daily KPIs','Instant alerts','Brief reports']} }
};
$$('.open-modal').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.dataset.case; const data = CASES[id][LANG];
    cTitle.textContent = data.t; cDesc.textContent = data.d;
    cBul.innerHTML = ''; data.b.forEach(x=>{ const li=document.createElement('li'); li.textContent=x; cBul.appendChild(li); });
    caseModal.classList.add('show'); caseModal.setAttribute('aria-hidden','false');
  });
});
caseClose?.addEventListener('click', ()=>{ caseModal.classList.remove('show'); caseModal.setAttribute('aria-hidden','true'); });
caseModal?.addEventListener('click', (e)=>{ if(e.target===caseModal){ caseModal.classList.remove('show'); caseModal.setAttribute('aria-hidden','true'); }});

// ===== Contact Modal (no public data) =====
const contactModal = $('#contactModal');
const contactTitle = $('#contactTitle'), contactDesc = $('#contactDesc');
const contactClose = contactModal?.querySelector('.modal-close');
const CONTACT_COPY = {
  ar:{callTitle:'اتصال', callDesc:'سيتم فتح تطبيق الاتصال مباشرة.', waTitle:'واتساب', waDesc:'سيتم فتح واتساب برسالة تمهيدية.', emTitle:'إيميل', emDesc:'سيتم فتح برنامج البريد.'},
  en:{callTitle:'Phone Call', callDesc:'We will open your dialer directly.', waTitle:'WhatsApp', waDesc:'We will open WhatsApp with a starter message.', emTitle:'Email', emDesc:'We will open your mail app.'}
};
$$('.open-contact').forEach(b=>{
  b.addEventListener('click', ()=>{
    const ch = b.dataset.channel;
    let t = '', d = '';
    if(ch==='call'){ t = CONTACT_COPY[LANG].callTitle; d = CONTACT_COPY[LANG].callDesc; }
    if(ch==='whatsapp'){ t = CONTACT_COPY[LANG].waTitle; d = CONTACT_COPY[LANG].waDesc; }
    if(ch==='email'){ t = CONTACT_COPY[LANG].emTitle; d = CONTACT_COPY[LANG].emDesc; }
    contactTitle.textContent = t; contactDesc.textContent = d;
    contactModal.classList.add('show'); contactModal.setAttribute('aria-hidden','false');
    // highlight default
    $$('.do-action').forEach(x=>x.classList.remove('primary')); $(`.do-action[data-action="${ch}"]`)?.classList.add('primary');
  });
});
contactClose?.addEventListener('click', ()=>{ contactModal.classList.remove('show'); contactModal.setAttribute('aria-hidden','true'); });
contactModal?.addEventListener('click', (e)=>{ if(e.target===contactModal){ contactModal.classList.remove('show'); contactModal.setAttribute('aria-hidden','true'); }});
$$('.do-action').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const url = btn.dataset.hidden;
    // فتح التطبيق دون عرض البيانات نصيًا على الشاشة
    window.location.href = url;
  });
});

// ===== Charts (Vanilla Canvas) =====
function barChart(ctx, labels, before, after){
  const dpr = window.devicePixelRatio || 1;
  const w = ctx.canvas.clientWidth, h = ctx.canvas.clientHeight;
  ctx.canvas.width = w * dpr; ctx.canvas.height = h * dpr; ctx.scale(dpr, dpr);
  ctx.clearRect(0,0,w,h);
  const pad = 36, barW = (w - pad*2) / (labels.length*2 + labels.length); // before+after+gap
  const max = Math.max(...before, ...after) * 1.2;
  const toY = v => h - pad - ( (h - pad*2) * (v/max) );
  // axes
  ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h-pad); ctx.lineTo(w-pad, h-pad); ctx.stroke();
  // bars
  let x = pad + 8;
  for(let i=0;i<labels.length;i++){
    // before
    ctx.fillStyle = 'rgba(109,75,255,.9)';
    const y1 = toY(before[i]); ctx.fillRect(x, y1, barW, h - pad - y1);
    // after
    const x2 = x + barW + 6;
    ctx.fillStyle = 'rgba(255,77,126,.9)';
    const y2 = toY(after[i]); ctx.fillRect(x2, y2, barW, h - pad - y2);
    // label
    ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.font = '12px Inter, Cairo';
    ctx.textAlign = 'center'; ctx.fillText(labels[i], x + barW + 3, h - pad + 16);
    x += barW*2 + 22;
  }
}
function sparkline(ctx, data){
  const dpr = window.devicePixelRatio || 1;
  const w = ctx.canvas.clientWidth, h = ctx.canvas.clientHeight;
  ctx.canvas.width = w * dpr; ctx.canvas.height = h * dpr; ctx.scale(dpr, dpr);
  ctx.clearRect(0,0,w,h);
  const pad = 10, max = Math.max(...data), min = Math.min(...data);
  const toXY = (i,v)=>[ pad + i*( (w-pad*2)/(data.length-1) ), h - pad - ((h-pad*2)*(v-min)/(max-min||1)) ];
  // grid
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1;
  for(let i=0;i<4;i++){ const y = pad + i*((h-pad*2)/3); ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(w-pad,y); ctx.stroke(); }
  // line
  ctx.beginPath(); data.forEach((v,i)=>{ const [x,y]=toXY(i,v); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); });
  ctx.strokeStyle = 'rgba(109,75,255,1)'; ctx.lineWidth = 2; ctx.stroke();
  // gradient overlay
  const grad = ctx.createLinearGradient(0,0,0,h); grad.addColorStop(0,'rgba(109,75,255,.35)'); grad.addColorStop(1,'transparent');
  ctx.lineTo(w-pad, h-pad); ctx.lineTo(pad, h-pad); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
  // last point
  const [lx,ly] = toXY(data.length-1, data[data.length-1]);
  ctx.fillStyle = 'rgba(255,77,126,1)'; ctx.beginPath(); ctx.arc(lx,ly,4,0,Math.PI*2); ctx.fill();
}
function drawCharts(){
  const barCtx = $('#barChart').getContext('2d');
  const sparkCtx = $('#sparkChart').getContext('2d');
  const labels = (LANG==='ar')? ['زيارات','تحويل','عائد'] : ['Visits','Conv','Revenue'];
  barChart(barCtx, labels, [100, 3, 10], [140, 3.7, 13.5]); // قبل -> بعد
  sparkline(sparkCtx, [20,23,21,26,30,28,34,37,35,41,44,47]);
}
window.addEventListener('load', drawCharts);
window.addEventListener('resize', ()=>{ clearTimeout(window._r); window._r=setTimeout(drawCharts,150); });

// ===== Language Switch (AR/EN) =====
function applyLang(l){
  LANG = l;
  const t = LANGS[l];
  document.documentElement.lang = (l==='ar'?'ar':'en');
  document.documentElement.dir = (l==='ar'?'rtl':'ltr');
  document.body.setAttribute('data-lang', l);
  // nav
  $$('[data-i18n]').forEach(el=>{
    const path = el.getAttribute('data-i18n').split('.');
    let val = t;
    path.forEach(k=>{ val = val?.[k]; });
    if(typeof val === 'string'){ el.textContent = val; }
  });
  // hero text with HTML spans
  $('#t.heroTitle').innerHTML = t.heroTitle;
  $('#t.heroLead').textContent = t.heroLead;
  $('#t.badge').textContent = t.badge;
  $('#t.heroCardH').textContent = t.heroCardH;
  $('#t.heroCardP').textContent = t.heroCardP;
  // value cards
  $('#t.v1h').textContent = t.v1h; $('#t.v1p').textContent = t.v1p;
  $('#t.v2h').textContent = t.v2h; $('#t.v2p').textContent = t.v2p;
  $('#t.v3h').textContent = t.v3h; $('#t.v3p').textContent = t.v3p;
  // brand + footer
  $('#t.brandTitle').textContent = t.brandTitle; $('#t.brandSub').textContent = t.brandSub;
  $('#t.footerName').textContent = t.footerName;
  // services header/desc
  // charts note
  $('#t.chartsNote').textContent = t.chartsNote;
  // redraw charts labels
  drawCharts();
  // toggle button label
  $('#langToggle').textContent = (l==='ar'?'EN':'AR');
}
applyLang('ar');
$('#langToggle').addEventListener('click', ()=>{
  applyLang(LANG==='ar'?'en':'ar');
});

// ===== Decorative stars background =====
(function stars(){
  const c = $('#bgStars'); const ctx = c.getContext('2d'); const dpr = window.devicePixelRatio || 1;
  function resize(){
    c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; ctx.scale(dpr,dpr);
  }
  function draw(){
    const w=c.clientWidth, h=c.clientHeight; ctx.clearRect(0,0,w,h);
    for(let i=0;i<80;i++){
      const x=Math.random()*w, y=Math.random()*h, r=Math.random()*1.6;
      ctx.fillStyle = `rgba(255,255,255,${.2+Math.random()*0.6})`;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
  }
  const ro = new ResizeObserver(()=>{ resize(); draw(); });
  ro.observe(c); resize(); draw();
})();
