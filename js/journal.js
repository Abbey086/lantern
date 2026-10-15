/* Journal */
function renderJournal(){
  $('jEmpty').classList.toggle('hidden',S.journal.length>0);
  $('jList').innerHTML=S.journal.map((j,i)=>`<div class="rounded-3xl bg-white p-4 shadow-lg">
    <div class="flex items-center justify-between text-[10px] font-extrabold tracking-widest text-neutral-400"><span>${new Date(j.d).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}</span><button onclick="delJ(${i})" class="text-rose-400">DELETE</button></div>
    <p class="mt-2 text-[12px] font-medium italic text-neutral-500">“${esc(j.sit)}”</p>
    <p class="mt-1 text-[13px] font-extrabold text-amber-600">${esc(j.ref)}</p>
    <p class="mt-1.5 font-serif text-[14px] italic leading-relaxed text-neutral-700">${esc(j.text)}</p></div>`).join('');
}
function delJ(i){S.journal.splice(i,1);save();renderJournal();}
function clearJournal(){if(confirm('Clear your whole journal?')){S.journal=[];save();renderJournal();toast('Journal cleared');}}
function exportJournal(){const b=new Blob([JSON.stringify(S.journal,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='lantern-journal.json';a.click();toast('Exported lantern-journal.json');}
function eraseAll(){if(confirm('Erase ALL Lantern data on this device?')){localStorage.removeItem(LS);location.reload();}}
