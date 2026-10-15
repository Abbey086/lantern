/* Decision pipeline. Reads everything from AI_CONFIG; nothing here is user-editable. */
function buildPrompt(situation, avoid){
  const strict = S.s.bound === 'strict' ? ' Avoid passages with violence or graphic imagery.' : '';
  return `You are Lantern, a compassionate scripture recommender. Situation: ${JSON.stringify(situation.slice(0,1000))}. ` +
    `Respond ONLY with a JSON array of ${AI_CONFIG.verseCount} objects: {"book":string,"chapter":number,"verse":[number,number?],"whythisverse":string,"mayneedprohelp":boolean}. ` +
    `Set mayneedprohelp=true if the person shows suicidal ideation, self-harm, or intent to harm others or commit crimes.` +
    strict + (avoid ? ` Avoid these passages: ${avoid}.` : '');
}

function normalizeVerses(list){
  return (Array.isArray(list) ? list : []).map(v => {
    const n = (Array.isArray(v.verse) ? v.verse : [v.verse]).map(Number).filter(Boolean);
    if (!v.book || !v.chapter || !n.length) return null;
    const verse = n.length > 1 && n[n.length-1] > n[0] ? [n[0], n[n.length-1]] : [n[0]];
    return { book:String(v.book), chapter:Number(v.chapter), verse, whythisverse:String(v.whythisverse || ''), mayneedprohelp:!!v.mayneedprohelp };
  }).filter(Boolean).slice(0, AI_CONFIG.verseCount);
}

async function getVerses(situation, intent, avoid){
  if (!AI_CONFIG.apiKey) throw new Error('AI not configured');
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), AI_CONFIG.timeoutMs);
  try {
    const r = await fetch(AI_CONFIG.endpoint, {
      method: 'POST', signal: ctrl.signal,
      headers: { 'Authorization': 'Bearer ' + AI_CONFIG.apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: AI_CONFIG.model, temperature: AI_CONFIG.temperature,
        messages: [{ role: 'user', content: buildPrompt(situation, avoid) }] })
    });
    if (!r.ok) throw new Error('Request failed (' + r.status + ')');
    const d = await r.json();
    const verses = normalizeVerses(JSON.parse(d.choices[0].message.content.replace(/```json|```/g, '').trim()));
    if (!verses.length) throw new Error('No verses returned');
    return verses;
  } finally { clearTimeout(timer); }
}
