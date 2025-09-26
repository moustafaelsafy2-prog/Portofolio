// Helpers
const $ = (s, p=document)=>p.querySelector(s);
const $$ = (s, p=document)=>Array.from(p.querySelectorAll(s));

// Year
$('#year').textContent = new Date().getFullYear();

// Reveal on scroll
const reveals = $$('.reveal');
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
},{threshold:0.12});
reveals.forEach(r=>io.observe(r));

// Tilt hover
$$('.tilt').forEach(el=>{
  let rAF;
  const onMove = (e)=>{
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    el.style.transform = `rotateY(${x*-6}deg) rotateX(${y*6}deg)`;
  };
  el.addEventListener('mousemove', e=>{ cancelAnimationFrame(rAF); rAF = requestAnimationFrame(()=>onMove(e)); });
  el.addEventListener('mouseleave', ()=>{ el.style.transform = ''; });
});

// Burger menu (mobile)
$('.burger')?.addEventListener('click', ()=>{
  const nav = $('.menu');
  const shown = getComputedStyle(nav).display !== 'none';
  nav.style.display = shown ? 'none' : 'flex';
});

// Active underline (desktop only)
const menu = $('.menu');
if (menu){
  const underline = $('.active-underline', menu);
  const links = $$('a:not(.cta)', menu);
  const setUnderline = (a)=>{
    if (getComputedStyle(menu).display === 'none') return; // skip on mobile
    const r = a.getBoundingClientRect();
    const pr = menu.getBoundingClientRect();
    underline.style.width = r.width + 'px';
    underline.style.right = (pr.right - r.right) + 'px';
  };
  links.forEach(a=>{ a.addEventListener('mouseenter', ()=>setUnderline(a)); a.addEventListener('click', ()=>setUnderline(a)); });
  setUnderline($('.active', menu) || links[0]);
}

// Carousel
const track = $('#caseTrack'), dotsWrap = $('#caseDots');
if (track && dotsWrap){
  const slides = Array.from(track.children);
  let idx = 0, auto;
  function updateDots(){ dotsWrap.querySelectorAll('button').forEach((b,i)=> b.classList.toggle('active', i===idx)); }
  function go(n){
    idx = (n + slides.length) % slides.length;
    track.scrollTo({left: slides[idx].offsetLeft - track.offsetLeft, behavior:'smooth'});
    updateDots();
  }
  slides.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('aria-label',`Slide ${i+1}`); b.onclick=()=>go(i); dotsWrap.appendChild(b); });
  updateDots();
  $('.prev').onclick=()=>go(idx-1); $('.next').onclick=()=>go(idx+1);
  const startAuto = ()=> auto = setInterval(()=>go(idx+1), 5000);
  const stopAuto  = ()=> clearInterval(auto);
  track.addEventListener('mouseenter', stopAuto); track.addEventListener('mouseleave', startAuto); startAuto();

  // Drag/Swipe
  let isDown=false, startX, scrollLeft;
  track.addEventListener('mousedown', e=>{ isDown=true; startX=e.pageX - track.offsetLeft; scrollLeft=track.scrollLeft; });
  track.addEventListener('mouseleave', ()=>{ isDown=false; });
  track.addEventListener('mouseup', ()=>{ isDown=false; });
  track.addEventListener('mousemove', e=>{ if(!isDown) return; e.preventDefault(); const x=e.pageX-track.offsetLeft; const walk=(x-startX)*1.3; track.scrollLeft=scrollLeft-walk; });
  let touchStartX=0;
  track.addEventListener('touchstart', e=>{ touchStartX=e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', e=>{ const dx=e.changedTouches[0].clientX - touchStartX; if(Math.abs(dx)>50){ dx>0?go(idx-1):go(idx+1);} }, {passive:true});
}

// Cases Modal (AR/EN data)
const caseModal = $('#caseModal');
const closeCase = caseModal?.querySelector('.modal-close');
const cTitle = $('#caseTitle'), cDesc = $('#caseDesc'), cBul = $('#caseBullets');
const CASES = {
  'ar': {
    1:{t:'تحسين صفحة هبوط', d:'اختبار CTA والمصداقية مع ترتيب العناصر حسب Heatmap.', b:['CTA واضح','أدلة اجتماعية','تقليل الإلهاء']},
    2:{t:'قمع مبيعات قصير', d:'رسائل تحقق ومتابعة تقلل التسرب.', b:['نماذج تحقق','رسائل قصيرة','مواعيد تلقائية']},
    3:{t:'لوحة قياس تنفيذية', d:'ربط التسويق بالمبيعات وتنبيهات يومية.', b:['KPIs يومية','تنبيهات فورية','تقارير مختصرة']}
  },
  'en': {
    1:{t:'Landing Page Optimization', d:'CTA & credibility tests; heatmap-driven layout.', b:['Crisp CTA','Social proof','Reduced distractions']},
    2:{t:'Tight Sales Funnel', d:'Verification & follow-ups to reduce leakage.', b:['Verification forms','Short messaging','Auto scheduling']},
    3:{t:'Executive Dashboard', d:'Daily link between marketing & sales with alerts.', b:['Daily KPIs','Instant alerts','Brief reports']}
  }
};
let LANG='ar';

$$('.open-modal').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.dataset.case;
    const data = CASES[LANG][id];
    cTitle.textContent = data.t; cDesc.textContent = data.d;
    cBul.innerHTML = ''; data.b.forEach(x=>{ const li=document.createElement('li'); li.textContent=x; cBul.appendChild(li); });
    caseModal.classList.add('show'); caseModal.setAttribute('aria-hidden','false');
  });
});
closeCase?.addEventListener('click', ()=>{ caseModal.classList.remove('show'); caseModal.setAttribute('aria-hidden','true'); });
caseModal?.addEventListener('click', e=>{ if(e.target===caseModal){ caseModal.classList.remove('show'); caseModal.setAttribute('aria-hidden','true'); }});

// Contact Modal (no public data)
const contactModal = $('#contactModal');
const contactClose = contactModal?.querySelector('.modal-close');
const contactTitle = $('#contactTitle'), contactDesc = $('#contactDesc');
const COPY = {
  ar:{callTitle:'اتصال', callDesc:'سنفتح تطبيق الاتصال مباشرة.',
      waTitle:'واتساب', waDesc:'سنفتح واتساب برسالة تمهيدية.',
      emTitle:'إيميل', emDesc:'سنفتح برنامج البريد.'},
  en:{callTitle:'Phone Call', callDesc:'We will open your dialer directly.',
      waTitle:'WhatsApp', waDesc:'We will open WhatsApp with a starter message.',
      emTitle:'Email', emDesc:'We will open your mail app.'}
};
$$('.open-contact').forEach(b=>{
  b.addEventListener('click', ()=>{
    const ch=b.dataset.channel;
    let t='',d='';
    if(ch==='call'){t=COPY[LANG].callTitle; d=COPY[LANG].callDesc;}
    if(ch==='whatsapp'){t=COPY[LANG].waTitle; d=COPY[LANG].waDesc;}
    if(ch==='email'){t=COPY[LANG].emTitle; d=COPY[LANG].emDesc;}
    contactTitle.textContent=t; contactDesc.textContent=d;
    contactModal.classList.add('show'); contactModal.setAttribute('aria-hidden','false');
    $$('.do-action').forEach(x=>x.classList.remove('primary'));
    $(`.do-action[data-action="${ch}"]`)?.classList.add('primary');
  });
});
contactClose?.addEventListener('click', ()=>{ contactModal.classList.remove('show'); contactModal.setAttribute('aria-hidden','true'); });
contactModal?.addEventListener('click', e=>{ if(e.target===contactModal){ contactModal.classList.remove('show'); contactModal.setAttribute('aria-hidden','true'); }});
$$('.do-action').forEach(btn=>btn.addEventListener('click', ()=>{ window.location.href = btn.dataset.hidden; }));

// Stars background
(function stars(){
  const c = $('#bgStars'); const ctx = c.getContext('2d'); const dpr = window.devicePixelRatio || 1;
  function resize(){ c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
  function draw(){
    const w=c.clientWidth, h=c.clientHeight; ctx.clearRect(0,0,w,h);
    for(let i=0;i<80;i++){ const x=Math.random()*w, y=Math.random()*h, r=Math.random()*1.6;
      ctx.fillStyle = `rgba(255,255,255,${.25+Math.random()*0.5})`; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); }
  }
  const ro = new ResizeObserver(()=>{ resize(); draw(); }); ro.observe(c); resize(); draw();
})();

// Charts (responsive)
function barChart(ctx, labels, before, after){
  const w=ctx.canvas.clientWidth, h=ctx.canvas.clientHeight, dpr=window.devicePixelRatio||1;
  ctx.canvas.width=w*dpr; ctx.canvas.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,w,h);
  const pad=36, barW=(w-pad*2)/(labels.length*2 + labels.length);
  const max=Math.max(...before,...after)*1.2; const toY=v=>h-pad - ((h-pad*2)*(v/max));
  ctx.strokeStyle='rgba(255,255,255,.18)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(pad,pad); ctx.lineTo(pad,h-pad); ctx.lineTo(w-pad,h-pad); ctx.stroke();
  let x=pad+8;
  for(let i=0;i<labels.length;i++){
    ctx.fillStyle='rgba(109,75,255,.95)'; let y1=toY(before[i]); ctx.fillRect(x,y1,barW,h-pad-y1);
    ctx.fillStyle='rgba(255,77,126,.95)'; let x2=x+barW+6, y2=toY(after[i]); ctx.fillRect(x2,y2,barW,h-pad-y2);
    ctx.fillStyle='rgba(255,255,255,.85)'; ctx.font='12px Inter'; ctx.textAlign='center'; ctx.fillText(labels[i], x+barW+3, h-pad+16);
    x+=barW*2+22;
  }
}
function sparkline(ctx, data){
  const w=ctx.canvas.clientWidth, h=ctx.canvas.clientHeight, dpr=window.devicePixelRatio||1;
  ctx.canvas.width=w*dpr; ctx.canvas.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,w,h);
  const pad=10, max=Math.max(...data), min=Math.min(...data);
  const toXY=(i,v)=>[ pad + i*((w-pad*2)/(data.length-1)), h-pad - ((h-pad*2)*(v-min)/(max-min||1)) ];
  ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.lineWidth=1;
  for(let i=0;i<4;i++){ const y=pad + i*((h-pad*2)/3); ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(w-pad,y); ctx.stroke(); }
  ctx.beginPath(); data.forEach((v,i)=>{ const [x,y]=toXY(i,v); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); });
  ctx.strokeStyle='rgba(109,75,255,1)'; ctx.lineWidth=2; ctx.stroke();
  const grad=ctx.createLinearGradient(0,0,0,h); grad.addColorStop(0,'rgba(109,75,255,.35)'); grad.addColorStop(1,'transparent');
  ctx.lineTo(w-pad,h-pad); ctx.lineTo(pad,h-pad); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
  const [lx,ly]=toXY(data.length-1,data[data.length-1]); ctx.fillStyle='rgba(255,77,126,1)'; ctx.beginPath(); ctx.arc(lx,ly,4,0,Math.PI*2); ctx.fill();
}
function drawCharts(){
  const barCtx=$('#barChart').getContext('2d');
  const sparkCtx=$('#sparkChart').getContext('2d');
  const labels=(LANG==='ar')?['زيارات','تحويل','عائد']:['Visits','Conv','Revenue'];
  barChart(barCtx,labels,[100,3,10],[140,3.7,13.5]);
  sparkline(sparkCtx,[20,23,21,26,30,28,34,37,35,41,44,47]);
}
window.addEventListener('load', drawCharts);
window.addEventListener('resize', ()=>{ clearTimeout(window._r); window._r=setTimeout(drawCharts,160); });

// Language data
const LANGS={
  ar:{nav:{home:"الرئيسية",about:"عني",services:"الخدمات",cases:"أعمال",insights:"نتائج",book:"احجز"},
      cta:{book:"احجز جلسة",call:"اتصال",whatsapp:"واتساب",email:"إيميل"},
      brandTitle:"مصطفى الصافي", brandSub:"أصنع نموًا قابلاً للقياس — بدون تعقيد",
      heroTitle:"أحوّل الاستراتيجية إلى <span class='grad'>نتائج تسويقية قابلة للقياس</span>",
      heroLead:"أصمم عروض قيمة وقمع مبيعات، وأبني لوحات قياس وأتمتة خفيفة — لزيادة العائد وتقليل الهدر بسرعة.",
      badge:"علامة شخصية • تنفيذ", heroCardH:"مصطفى الصافي", heroCardP:"Growth & Marketing Execution",
      v1h:"عرض قيمة مقنع", v1p:"Promise واضح + تفريق حقيقي + Social Proof يقنع دون خصومات.",
      v2h:"قمع مبيعات ذكي", v2p:"Landing + Follow-ups + A/B لرفع التحويل بأقل تكلفة.",
      v3h:"لوحات قياس", v3p:"KPIs يومية تربط التسويق بالمبيعات والخدمة.",
      services:{h:"ماذا أقدّم", p:"حزم تنفيذية قصيرة المدى بنتائج واضحة."},
      s1:{h:"تحسين العرض والرسائل", p:"Promise واضح، مزايا تفاضلية، وCTA محفّز."},
      s2:{h:"قمع مبيعات + متابعة", p:"A/B + سيناريوهات Follow-up تقلّل التسرب."},
      s3:{h:"لوحات قياس وتنبيه", p:"KPIs يومية تربط التسويق بالمبيعات والخدمة."},
      cases:{h:"أعمال مختصرة", p:"نماذج تطبيق واقعية تعكس أسلوب التنفيذ."},
      c1:{h:"تحسين صفحة هبوط", p:"+22% تحويل خلال 3 أسابيع عبر CTA/مصداقية."},
      c2:{h:"قمع مبيعات قصير", p:"-18% تسرب برسائل تحقق ومتابعة."},
      c3:{h:"لوحة قياس تنفيذية", p:"ربط التسويق بالمبيعات لاتخاذ قرار أسرع."},
      more:"التفاصيل",
      insights:{h:"نتائج مختصرة", p:"رسوم تفاعلية توضّح التأثير قبل/بعد."},
      chartsNote:"* أمثلة توضيحية؛ تُخصص حسب نشاطك.",
      contact:{h:"دعنا نبدأ", p:"جلسة قصيرة لتحديد الأولويات وتحويلها إلى خطة تنفيذية."},
      modal:{call:"اتصال الآن", whatsapp:"واتساب", email:"إيميل"},
      footerName:"مصطفى الصافي"},
  en:{nav:{home:"Home",about:"About",services:"Services",cases:"Work",insights:"Insights",book:"Book"},
      cta:{book:"Book a Session",call:"Call",whatsapp:"WhatsApp",email:"Email"},
      brandTitle:"Mostafa Al-Safy", brandSub:"I drive measurable growth — without complexity",
      heroTitle:"I turn strategy into <span class='grad'>measurable marketing outcomes</span>",
      heroLead:"I craft offers & funnels, build dashboards and light automations — to boost ROI fast.",
      badge:"Personal Brand • Execution", heroCardH:"Mostafa Al-Safy", heroCardP:"Growth & Marketing Execution",
      v1h:"Compelling Value Proposition", v1p:"Clear promise + differentiation + social proof.",
      v2h:"Smart Funnel", v2p:"Landing + follow-ups + A/B to lift conversions.",
      v3h:"Dashboards & KPIs", v3p:"Daily KPIs linking marketing to sales & service.",
      services:{h:"What I Deliver", p:"Short, execution-first packages with clear results."},
      s1:{h:"Offer & Messaging", p:"Sharp promise, differentiation, and a strong CTA."},
      s2:{h:"Funnel & Follow-ups", p:"A/B tests and follow-up scenarios to reduce leakage."},
      s3:{h:"Dashboards & Alerts", p:"Daily KPIs connecting marketing to sales & service."},
      cases:{h:"Selected Work", p:"Practical samples of execution."},
      c1:{h:"Landing Page Optimization", p:"+22% conversion in 3 weeks (CTA/credibility)."},
      c2:{h:"Tight Sales Funnel", p:"-18% leakage via verification & follow-ups."},
      c3:{h:"Executive Dashboard", p:"Daily link between marketing & sales."},
      more:"Details",
      insights:{h:"Quick Results", p:"Interactive charts showing before/after."},
      chartsNote:"* Illustrative; adapted to your business.",
      contact:{h:"Let’s Start", p:"A short session to prioritize and execute."},
      modal:{call:"Call Now", whatsapp:"WhatsApp", email:"Email"},
      footerName:"Mostafa Al-Safy"}
};
function applyLang(l){
  LANG=l;
  const t=LANGS[l];
  document.documentElement.lang=(l==='ar'?'ar':'en');
  document.documentElement.dir=(l==='ar'?'rtl':'ltr');
  document.body.setAttribute('data-lang', l);
  // simple mapping
  $$('[data-i18n]').forEach(el=>{
    const path=el.getAttribute('data-i18n').split('.');
    let val=t; path.forEach(k=>val=val?.[k]);
    if(typeof val==='string'){ el.textContent=val; }
  });
  $('#t.brandTitle').textContent=t.brandTitle;
  $('#t.brandSub').textContent=t.brandSub;
  $('#t.heroTitle').innerHTML=t.heroTitle;
  $('#t.heroLead').textContent=t.heroLead;
  $('#t.badge').textContent=t.badge;
  $('#t.heroCardH').textContent=t.heroCardH;
  $('#t.heroCardP').textContent=t.heroCardP;
  $('#t.v1h').textContent=t.v1h; $('#t.v1p').textContent=t.v1p;
  $('#t.v2h').textContent=t.v2h; $('#t.v2p').textContent=t.v2p;
  $('#t.v3h').textContent=t.v3h; $('#t.v3p').textContent=t.v3p;
  $('#t.chartsNote').textContent=t.chartsNote;
  $('#t.footerName').textContent=t.footerName;
  $('#langToggle').textContent=(l==='ar'?'EN':'AR');
  drawCharts();
}
applyLang('ar');
$('#langToggle').addEventListener('click', ()=>applyLang(LANG==='ar'?'en':'ar'));
