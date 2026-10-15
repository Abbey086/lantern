/* Scenario starters */
const STARTERS=[
 ['Anxiety','COMFORT','text-teal-500','Panic before a big day','Calm for racing thoughts before interviews, exams and hard conversations.','I cannot stop worrying about tomorrow\'s interview'],
 ['Anxiety','COMFORT','text-teal-500','Cannot sleep at 2am','Verses for the ceiling-staring hours when thoughts will not settle.','My mind will not shut off and I cannot sleep'],
 ['Grief','COMFORT','text-teal-500','Losing someone I love','Scripture that sits with you in the valley of loss.','My grandfather passed away last week'],
 ['Relationships','HOPE','text-pink-500','Mending a friendship','Words for repair, apology and second chances.','I hurt my best friend and I want to fix it'],
 ['Relationships','HOPE','text-pink-500','Apologizing after a fight','Courage to say sorry first, and mean it.','We fight every night and I want to apologize'],
 ['Work','STRENGTH','text-amber-500','Burned out at work','Rest as holy, not weakness.','I am burned out and exhausted at my job'],
 ['Work','STRENGTH','text-amber-500','Money worries','Provision and peace for the budget that will not balance.','I am scared about rent and money this month'],
 ['Faith','GUIDANCE','text-violet-500','Doubting my faith','Honest verses for honest doubt.','I am doubting whether I even believe anymore'],
 ['Faith','GUIDANCE','text-violet-500','A big decision ahead','Guidance sized for the next step, not the whole map.','I have to choose between two job offers in different cities'],
 ['Loneliness','COMFORT','text-teal-500','Feeling invisible and lonely','Presence for the empty-room feelings.','I feel completely alone and forgotten'],
 ['Gratitude','GRATITUDE','text-emerald-500','A thankful heart','Mark the recovery, name the gifts.','I am so grateful for my recovery this year'],
 ['Forgiveness','HOPE','text-pink-500','When I have messed up','Mercy for the person in the mirror.','I cannot forgive myself for my past mistakes']];
let curCat='All';
const CATS=['All',...new Set(STARTERS.map(s=>s[0]))];
$('catChips').innerHTML=CATS.map((c,i)=>`<button onclick="setCat('${c}',this)" class="shrink-0 rounded-full border border-white/80 ${i===0?'bg-white text-neutral-900 shadow-lg':'bg-white/60 text-neutral-600'} px-4 py-2 text-[12.5px] font-bold backdrop-blur transition active:scale-95">${c}</button>`).join('');
function setCat(c,el){curCat=c;document.querySelectorAll('#catChips button').forEach(b=>{b.classList.remove('bg-white','text-neutral-900','shadow-lg');b.classList.add('bg-white/60','text-neutral-600');});el.classList.add('bg-white','text-neutral-900','shadow-lg');el.classList.remove('bg-white/60','text-neutral-600');renderScen();}
function renderScen(){
  const list=STARTERS.map((s,i)=>({s,i})).filter(x=>curCat==='All'||x.s[0]===curCat);
  $('scCount').textContent=list.length+' STARTERS';
  $('scList').innerHTML=list.map(({s,i},k)=>`<div class="animate-fadeup rounded-3xl bg-white p-5 shadow-xl shadow-pink-200/40" style="animation-delay:${k*50}ms">
    <span class="text-[9.5px] font-extrabold tracking-[0.16em] ${s[2]}">${s[1]}</span>
    <h4 class="mt-1.5 text-[15.5px] font-extrabold">${s[3]}</h4>
    <p class="mt-1 text-[12px] font-medium leading-relaxed text-neutral-400">${s[4]}</p>
    <button onclick="openScenario(${i})" class="mt-4 w-full rounded-full bg-neutral-900 py-2.5 text-[12.5px] font-extrabold text-white active:scale-95">See details</button></div>`).join('');
}
function openScenario(i){const s=STARTERS[i];$('ssTitle').textContent=s[3];$('ssDesc').textContent=s[4];
  $('ssPrompts').innerHTML=[s[5],'Today especially, '+s[5].toLowerCase()].map(p=>`<button onclick="closeSheets();$('sitInput').value=${JSON.stringify(p)};search(${JSON.stringify(p)})" class="rounded-2xl bg-neutral-100 px-4 py-3 text-left text-[12.5px] font-semibold text-neutral-600 active:scale-[.98]">“${p}”</button>`).join('');
  $('ssGo').onclick=()=>{closeSheets();$('sitInput').value=s[5];search(s[5]);};
  openSheet('sheet-scenario');}
renderScen();
