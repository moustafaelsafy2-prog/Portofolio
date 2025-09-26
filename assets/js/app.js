// توهج المؤشر
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e)=>{
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// سنة الفوتر
document.getElementById('year').textContent = new Date().getFullYear();

// عدادات KPI
const counters = document.querySelectorAll('.count');
const runCounter = (el)=>{
  const target = +el.dataset.target;
  let cur = 0;
  const step = Math.max(1, Math.floor(target/60));
  const t = setInterval(()=>{
    cur += step;
    if(cur >= target){ cur = target; clearInterval(t); }
    el.textContent = cur;
  }, 16);
};
setTimeout(()=> counters.forEach(runCounter), 900);

// قائمة الهاتف
const burger = document.querySelector('.burger');
if (burger){
  burger.addEventListener('click', ()=>{
    const links = document.querySelector('.links');
    const visible = getComputedStyle(links).display !== 'none';
    links.style.display = visible ? 'none' : 'flex';
  });
}

// سلايدر الأعمال
const track = document.getElementById('workTrack');
const dotsWrap = document.getElementById('dots');
const slides = Array.from(track.children);
let idx = 0;

function updateDots(){
  dotsWrap.querySelectorAll('button').forEach((b,i)=> b.classList.toggle('active', i===idx));
}
function go(n){
  idx = (n + slides.length) % slides.length;
  track.scrollTo({left: slides[idx].offsetLeft - track.offsetLeft, behavior:'smooth'});
  updateDots();
}
// إنشاء النقاط
slides.forEach((_,i)=>{
  const b = document.createElement('button');
  b.setAttribute('aria-label', `اذهب إلى الشريحة ${i+1}`);
  b.addEventListener('click', ()=>go(i));
  dotsWrap.appendChild(b);
});
updateDots();

document.querySelector('.prev').addEventListener('click', ()=>go(idx-1));
document.querySelector('.next').addEventListener('click', ()=>go(idx+1));

// سحب بالماوس
let isDown=false, startX, scrollLeft;
track.addEventListener('mousedown', (e)=>{ isDown=true; startX=e.pageX - track.offsetLeft; scrollLeft=track.scrollLeft; track.classList.add('grabbing'); });
track.addEventListener('mouseleave', ()=>{ isDown=false; track.classList.remove('grabbing'); });
track.addEventListener('mouseup', ()=>{ isDown=false; track.classList.remove('grabbing'); });
track.addEventListener('mousemove', (e)=>{
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 1.3;
  track.scrollLeft = scrollLeft - walk;
});

// لمس للجوال
let touchStartX = 0;
track.addEventListener('touchstart', (e)=>{ touchStartX = e.touches[0].clientX; }, {passive:true});
track.addEventListener('touchend', (e)=>{
  const dx = (e.changedTouches[0].clientX - touchStartX);
  if(Math.abs(dx) > 50){ dx > 0 ? go(idx-1) : go(idx+1); }
}, {passive:true});
