/* Plans & pricing (simulated locally) */
const TIERS=[
 {id:'free',name:'Lantern Free',m:0,y:0,f:[['3 verse searches / day',1],['WEB translation',1],['Journal, 10 entries',1],['Care resources, always',1],['Voice input',0],['Themes and export',0]],cta:'Current plan'},
 {id:'plus',name:'Lantern Plus',m:4.99,y:3.99,hot:1,flag:'MOST LOVED',f:[['Unlimited searches',1],['All 4 translations',1],['Voice in and read-aloud',1],['Unlimited journal + export',1],['4 gradient themes',1],['Care-plan mode',0]],cta:'Go Plus'},
 {id:'shep',name:'Lantern Shepherd',m:9.99,y:7.99,flag:'CARE TEAMS',f:[['Everything in Plus',1],['Trusted-contact sharing',1],['Priority support',1],['Offline scripture packs',1],['Small-group and clergy tools',1],['Early features',1]],cta:'Choose Shepherd'}];
const CMP=[['Daily searches','3','unl','unl'],['Translations','1','4','4'],['Voice input','–','yes','yes'],['Read-aloud','–','yes','yes'],['Journal','10','unl','unl'],['Themes','1','4','4'],['Export','–','yes','yes'],['Care-plan mode','–','–','yes'],['Contact sharing','–','–','yes'],['Priority support','–','–','yes']];
const cell=v=>v==='yes'?'<span class="text-teal-500">✓</span>':v==='unl'?'<span class="font-black">∞</span>':v;
function renderPricing(){
  $('billM').className='flex-1 rounded-full py-2 text-[12px] font-extrabold '+(S.bill==='m'?'bg-neutral-900 text-white':'text-neutral-500');
  $('billY').className='flex-1 rounded-full py-2 text-[12px] font-extrabold '+(S.bill==='y'?'bg-neutral-900 text-white':'text-neutral-500');
  $('tiers').innerHTML=TIERS.map(t=>{const p=S.bill==='m'?t.m:t.y;return `<div class="relative rounded-3xl bg-white p-6 shadow-xl shadow-pink-200/40 ${t.hot?'border-2 border-neutral-900':''}">
    ${t.flag?`<span class="absolute -top-2.5 right-5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 px-3 py-1 text-[9px] font-extrabold tracking-widest text-white">${t.flag}</span>`:''}
    <h3 class="text-[16px] font-black">${t.name}</h3>
    <p class="mt-1 text-[30px] font-black tracking-tight">$${p}<span class="text-[12px] font-bold text-neutral-400">/mo${S.bill==='y'&&p?' billed yearly':''}</span></p>
    <ul class="mt-4 flex flex-col gap-2">${t.f.map(f=>`<li class="flex items-start gap-2 text-[12.5px] font-medium ${f[1]?'text-neutral-600':'text-neutral-300'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="mt-0.5 h-3.5 w-3.5 shrink-0 ${f[1]?'text-teal-500':'text-neutral-300'}">${f[1]?'<path d="m4 12 5 5L20 6"/>':'<path d="M5 12h14"/>'}</svg>${f[0]}</li>`).join('')}</ul>
    <button onclick="choosePlan('${t.id}')" class="mt-5 w-full rounded-full py-3 text-[13px] font-extrabold active:scale-95 ${S.plan===t.id?'bg-neutral-100 text-neutral-900':'bg-neutral-900 text-white'}">${S.plan===t.id?'Current plan':t.cta}</button></div>`;}).join('');
  $('cmpTable').innerHTML=`<div class="grid grid-cols-4 gap-1 border-b border-neutral-100 py-2.5 text-[9.5px] font-extrabold tracking-widest text-neutral-400"><span>FEATURE</span><span class="text-center">FREE</span><span class="text-center">PLUS</span><span class="text-center">SHEP</span></div>`+CMP.map(r=>`<div class="grid grid-cols-4 gap-1 border-b border-neutral-50 py-2.5 font-medium text-neutral-500 last:border-0"><span>${r[0]}</span><span class="text-center font-extrabold">${cell(r[1])}</span><span class="text-center font-extrabold">${cell(r[2])}</span><span class="text-center font-extrabold">${cell(r[3])}</span></div>`).join('');
}
function setBill(b){S.bill=b;save();renderPricing();}
function choosePlan(id){S.plan=id;save();$('planBadge').textContent=id.toUpperCase()+' PLAN';renderPricing();toast(id==='free'?'Switched to Free':id.charAt(0).toUpperCase()+id.slice(1)+' activated');haptic(20);}
$('planBadge').textContent=S.plan.toUpperCase()+' PLAN';
renderPricing();
