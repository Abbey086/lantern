/* Voice input */
let rec=null;
function mic(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR)return toast('Speech input not supported in this browser');
  if(rec){rec.stop();return;}
  rec=new SR();rec.lang=S.s.lang;rec.interimResults=true;
  rec.onresult=e=>{let t='';for(let i=e.resultIndex;i<e.results.length;i++)t+=e.results[i][0].transcript;$('sitInput').value=t;};
  rec.onend=()=>{$('micBtn').classList.remove('bg-rose-100','text-rose-600','animate-pulse');rec=null;};
  rec.start();$('micBtn').classList.add('bg-rose-100','text-rose-600','animate-pulse');toast('Listening — speak naturally');
}
