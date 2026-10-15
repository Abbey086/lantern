/* Settings bindings (user-facing preferences only) */
function bindInput(id,key,fx){const el=$(id);el.value=S.s[key];el.onchange=()=>{S.s[key]=el.type==='range'?parseFloat(el.value):el.value;save();fx&&fx(S.s[key]);haptic(6);};}
bindInput('setTrans','trans');bindInput('setTheme','theme',applyTheme);
bindInput('setLang','lang');bindInput('setRate','rate');bindInput('setBound','bound');
document.querySelectorAll('.tg').forEach(t=>{
  const sync=()=>{const on=!!S.s[t.dataset.tg];t.classList.toggle('bg-neutral-900',on);t.classList.toggle('bg-neutral-200',!on);t.firstElementChild.style.left=on?'26px':'4px';};
  sync();t.onclick=()=>{S.s[t.dataset.tg]=!S.s[t.dataset.tg];save();sync();applyTheme();haptic(10);};
});
