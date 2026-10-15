/* Scripture text from bible-api.com */
async function scripture(v){
  const key=v.book+v.chapter+v.verse.join('-')+S.s.trans;
  if(scCache[key])return scCache[key];
  const vs=v.verse.length>1?v.verse[0]+'-'+v.verse[v.verse.length-1]:v.verse[0];
  try{
    const r=await fetch(`https://bible-api.com/${encodeURIComponent(v.book)}+${v.chapter}:${vs}?translation=${S.s.trans}`);
    const d=await r.json();scCache[key]=d.text||(d.verses||[]).map(x=>x.text).join(' ')||'(scripture unavailable)';
  }catch(e){scCache[key]='(scripture offline)';}
  return scCache[key];
}
