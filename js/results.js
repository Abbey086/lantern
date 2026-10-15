/* Search flow and results view */
/* ---------- search ---------- */
async function search(text,reroll){
  let counted=false;
  text=(text!==undefined?text:$('sitInput').value).trim();
  if(!text)return toast('Tell Lantern what you are carrying first');
  if(S.plan==='free'&&!reroll){
    const d=new Date().toDateString();
    if(S.searches.d!==d)S.searches={d,n:0};
    if(S.searches.n>=3){openSheet('sheet-limit');return;}
    S.searches.n++;save();counted=true;
  }
  const btn=$('findBtn');btn.disabled=true;btn.innerHTML='Listening…';
  lastSit=text;lastIntent=classify(text);
  try{
    lastVerses=await getVerses(text,lastIntent,reroll?lastVerses.map(v=>v.book+' '+v.chapter).join(', '):null);
    renderResults();go('view-results');
    if(S.s.auto)lastVerses.forEach((v,i)=>speakEl('vt'+i));
  }catch(e){if(counted){S.searches.n--;save();}toast('Lantern could not find verses right now. Please try again.');}
  finally{btn.disabled=false;btn.innerHTML='Find my verse';}
}
function reroll(){search(lastSit,true);}
function careHTML(intent){
  if(intent==='harm')return `<div class="animate-pop rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-5 text-amber-900 shadow-xl">
    <h3 class="text-[15px] font-black">Before the verses — a word of care</h3>
    <p class="mt-2 text-[12.5px] font-medium leading-relaxed">Lantern can't help plan harm or anything illegal, and it won't leave you alone with it either. What you're feeling deserves a human voice tonight.</p>
    <ul class="mt-2 list-disc pl-5 text-[12.5px] font-medium"><li>US: call/text <b>988</b> · emergency <b>911</b></li><li>International: <a class="font-extrabold underline" href="https://findahelpline.com" target="_blank">findahelpline.com</a></li></ul></div>`;
  return `<div class="animate-pop rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100 p-5 text-rose-900 shadow-xl">
    <h3 class="text-[15px] font-black">You are not alone</h3>
    <p class="mt-2 text-[12.5px] font-medium leading-relaxed">I am not a mental health professional. If you are feeling overwhelmed or having thoughts of suicide, please reach out for immediate support:</p>
    <ul class="mt-2 list-disc pl-5 text-[12.5px] font-medium leading-relaxed"><li><b>US:</b> call or text <b>988</b> — 24/7</li><li><b>International:</b> <a class="font-extrabold underline" href="https://findahelpline.com" target="_blank">findahelpline.com</a></li></ul>
    <p class="mt-2 text-[12.5px] font-medium leading-relaxed">You deserve help and care. The verses below are meant to offer hope and remind you of God's enduring love and the value of your life. <b>Your life matters, and help is available.</b></p>
    <div class="mt-3 flex gap-2"><a href="tel:988" class="flex-1 rounded-full bg-neutral-900 py-2.5 text-center text-[12px] font-extrabold text-white">Call 988</a><a href="sms:988" class="flex-1 rounded-full bg-white py-2.5 text-center text-[12px] font-extrabold text-rose-700">Text 988</a></div></div>`;
}
function renderResults(){
  $('resEcho').textContent='“'+lastSit+'”';
  $('careSlot').innerHTML=(lastIntent!=='normal'||lastVerses.some(v=>v.mayneedprohelp))?careHTML(lastIntent):'';
  $('verseSlot').innerHTML=lastVerses.map((v,i)=>`
    <article class="animate-fadeup rounded-3xl bg-white p-5 shadow-xl shadow-pink-200/40" style="animation-delay:${i*90}ms">
      <div class="flex items-center justify-between"><h3 class="text-[17px] font-black">${esc(v.book)} ${v.chapter}:${v.verse.join('-')}</h3><span class="rounded-full bg-neutral-100 px-2.5 py-1 text-[9px] font-extrabold tracking-widest text-neutral-400">${i+1}/${lastVerses.length}</span></div>
      <p id="vt${i}" class="mt-3 rounded-2xl bg-gradient-to-br from-amber-50 to-pink-50 px-4 py-3.5 font-serif text-[16px] italic leading-relaxed text-neutral-800">…</p>
      ${S.s.why?`<p class="mt-3 text-[12.5px] font-medium leading-relaxed text-neutral-600"><span class="mb-1 block text-[9.5px] font-extrabold tracking-[0.14em] text-teal-600">WHY THIS VERSE</span>${esc(v.whythisverse)}</p>`:''}
      <div class="mt-4 flex gap-2">
        <button onclick="saveVerse(${i},this)" class="flex-1 rounded-xl bg-neutral-100 py-2.5 text-[11.5px] font-extrabold text-neutral-600 active:scale-95">Save</button>
        <button onclick="copyVerse(${i},this)" class="flex-1 rounded-xl bg-neutral-100 py-2.5 text-[11.5px] font-extrabold text-neutral-600 active:scale-95">Copy</button>
        <button onclick="speakEl('vt${i}')" class="flex-1 rounded-xl bg-neutral-100 py-2.5 text-[11.5px] font-extrabold text-neutral-600 active:scale-95">Speak</button>
      </div>
    </article>`).join('');
  lastVerses.forEach((v,i)=>scripture(v).then(t=>{const el=$('vt'+i);if(el)el.textContent=t;}));
}
function saveVerse(i,el){const v=lastVerses[i];S.journal.unshift({d:new Date().toISOString(),sit:lastSit,ref:`${v.book} ${v.chapter}:${v.verse.join('-')}`,why:v.whythisverse,text:$('vt'+i)?.textContent||''});save();el.textContent='Saved';el.classList.add('bg-teal-50','text-teal-600');renderJournal();haptic(14);toast('Saved to your journal');}
function copyVerse(i,el){const v=lastVerses[i];navigator.clipboard&&navigator.clipboard.writeText(`"${$('vt'+i).textContent}" — ${v.book} ${v.chapter}:${v.verse.join('-')}`);el.textContent='Copied';toast('Verse copied');}
function speakEl(id){const el=$(id);if(!el)return;const u=new SpeechSynthesisUtterance(el.textContent);u.rate=parseFloat(S.s.rate);speechSynthesis.speak(u);}
