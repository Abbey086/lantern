/* Theme, router, toast, sheets */
function applyTheme(){
  $('appRoot').dataset.theme = S.s.theme;
  document.body.classList.toggle('rm', S.s.motion);
  $('careLink').classList.toggle('hidden', !S.s.careLink);
}

/* ---------- router ---------- */
function go(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));
  $(id).classList.remove('hidden');
  const tabbed=['view-home','view-scenarios','view-journal','view-settings'].includes(id);
  $('tabbar').classList.toggle('hidden',!tabbed);
  document.querySelectorAll('.tab').forEach(t=>{const on=t.dataset.tab===id;t.classList.toggle('text-neutral-900',on);t.classList.toggle('text-neutral-400',!on);});
  $('main').scrollTop=0;haptic(6);
}
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>go(t.dataset.tab));

/* ---------- toast / sheets ---------- */
let tT;function toast(m){const t=$('toast');t.textContent=m;t.classList.add('opacity-100','translate-y-0');clearTimeout(tT);tT=setTimeout(()=>t.classList.remove('opacity-100','translate-y-0'),2200);}
function openSheet(id){$('scrim').classList.add('opacity-100','pointer-events-auto');$(id).classList.remove('translate-y-full');}
function closeSheets(){$('scrim').classList.remove('opacity-100','pointer-events-auto');document.querySelectorAll('.sheet').forEach(s=>s.classList.add('translate-y-full'));}
