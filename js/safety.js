/* Local safety net — runs regardless of the AI */
const CRISIS_RE=/(suicid|kill myself|end my (life|it all)|want to die|better off without me|self.?harm|cut myself|no reason to live|hopeless)/i;
const HARM_RE=/(kill (him|her|them)|hurt (him|her|them|someone)|revenge|make (him|her|them) pay|steal|rob |weapon|attack|beat (him|her|them))/i;
const classify=t=>CRISIS_RE.test(t)?'crisis':HARM_RE.test(t)?'harm':'normal';
