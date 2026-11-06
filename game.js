(()=>{
const $=id=>document.getElementById(id),player=$("you"),rival=$("foe");
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const opponents=[
{name:"IRON MAKO",health:100,pace:2,damage:9,style:"pressure",intro:"IRON MAKO: “I don't chase victories. I run straight through them.”"},
{name:"VICIOUS VELVET",health:112,pace:1.75,damage:10,style:"counter",intro:"VICIOUS VELVET: “Every punch tells me what you'll do next.”"},
{name:"BRUISER NOVA",health:124,pace:1.48,damage:12,style:"power",intro:"BRUISER NOVA: “One clean hit. That's all I need.”"},
{name:"DUKE DYNAMITE",health:132,pace:1.62,damage:11,style:"pressure",intro:"DUKE DYNAMITE: “The crowd came for fireworks. Let's give them a show.”"},
{name:"EL TORO ROJO",health:140,pace:1.36,damage:13,style:"power",intro:"EL TORO ROJO: “Stand your ground. I dare you.”"},
{name:"MIDNIGHT JACKAL",health:146,pace:1.22,damage:12,style:"counter",intro:"MIDNIGHT JACKAL: “You won't see the punch that ends this.”"},
{name:"QUEEN COBRA",health:154,pace:1.32,damage:13,style:"counter",intro:"QUEEN COBRA: “Fast hands. Cold eyes. No second chances.”"},
{name:"ATLAS PRIME",health:170,pace:1.18,damage:15,style:"champion",intro:"ATLAS PRIME: “This ring is my kingdom. Come take it.”"}
];
const boxers={
balanced:{name:"THE TECHNICIAN",damage:1,accuracy:1,stamina:1,skin:"#a86c4d",short:"#236fc5",glove:"#e74343",emoji:"🥊",tag:"ALL-ROUND"},
speed:{name:"FLASH FURY",damage:.88,accuracy:1.12,stamina:1.2,skin:"#bd8059",short:"#168c83",glove:"#f1c644",emoji:"⚡",tag:"SPEED"},
power:{name:"THE HAMMER",damage:1.28,accuracy:.9,stamina:.86,skin:"#80543e",short:"#7038a6",glove:"#e8752d",emoji:"💥",tag:"POWER"},
counter:{name:"SILK SHADOW",damage:1.04,accuracy:1.08,stamina:1.05,skin:"#9b684e",short:"#513b82",glove:"#b18aff",emoji:"🌙",tag:"COUNTER"},
southpaw:{name:"LEFTY LEGEND",damage:1.08,accuracy:1.02,stamina:.98,skin:"#bd8968",short:"#277b55",glove:"#e8d36b",emoji:"👊",tag:"SOUTHPAW"},
endurance:{name:"IRON LUNGS",damage:.96,accuracy:1,stamina:1.32,skin:"#754b38",short:"#4c647b",glove:"#54c8b5",emoji:"🛡️",tag:"ENDURANCE"},
technical:{name:"RAZOR EDGE",damage:1.12,accuracy:1.16,stamina:.92,skin:"#d09a70",short:"#9b3348",glove:"#f0f0f0",emoji:"🎯",tag:"PRECISION"},
wild:{name:"WILDFIRE",damage:1.16,accuracy:.94,stamina:1.08,skin:"#86563f",short:"#bb4b20",glove:"#ffb13b",emoji:"🔥",tag:"COMBOS"}
};
const SAVE_KEY="super-knockout-world-tour-v1";
function loadCareer(){
 try{
  const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||"{}");
  return {boxer:boxers[saved.boxer]?saved.boxer:"balanced",career:clamp(Number(saved.career)||0,0,opponents.length-1),wins:Math.max(0,Number(saved.wins)||0),losses:Math.max(0,Number(saved.losses)||0)};
 }catch(error){return {boxer:"balanced",career:0,wins:0,losses:0}}
}
const savedCareer=loadCareer();
let boxer=savedCareer.boxer,career=savedCareer.career,wins=savedCareer.wins,losses=savedCareer.losses;
function saveCareer(){
 try{localStorage.setItem(SAVE_KEY,JSON.stringify({boxer,career,wins,losses}));}catch(error){}
}
let audioContext=null,audioMuted=false;
function sound(kind){
 if(audioMuted)return;
 const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
 try{
  audioContext=audioContext||new Audio();if(audioContext.state==="suspended")audioContext.resume();
  const now=audioContext.currentTime;
  const tones={bell:[740,988,.32],star:[880,440,.38],jab:[170,95,.11],hook:[115,62,.18],upper:[90,48,.24],impact:[95,52,.16],miss:[260,180,.08],dodge:[420,680,.13],block:[150,230,.12],cheer:[520,780,.35],down:[75,42,.48],warning:[330,220,.1]};
  const [a,b,duration]=tones[kind]||tones.impact;
  [a,b].forEach((freq,index)=>{
   const osc=audioContext.createOscillator(),gain=audioContext.createGain();
   osc.type=kind==="cheer"?"triangle":"sawtooth";
   osc.frequency.setValueAtTime(freq,now+index*.025);
   if(kind==="bell")osc.frequency.exponentialRampToValueAtTime(freq*1.45,now+duration);
   gain.gain.setValueAtTime(.0001,now+index*.025);
   gain.gain.exponentialRampToValueAtTime(kind==="cheer"?.045:.075,now+index*.025+.012);
   gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
   osc.connect(gain);gain.connect(audioContext.destination);
   osc.start(now+index*.025);osc.stop(now+duration+.03);
  });
 }catch(error){}
}

let s={hp:100,rh:100,st:100,rs:100,t:120,x:0,depth:0,active:false,block:false,dodging:false,enemy:2,enemyMove:"jab",rivalDowns:0,playerDowns:0,downTimer:0,combo:0,stars:0,lastAttack:"",attackCounts:{jab:0,hook:0,upper:0},feint:false};
function opponent(){return opponents[career]}
function update(){
 rival.classList.remove("style-pressure","style-counter","style-power","style-champion");rival.classList.add("style-"+opponent().style);
 $("ph").style.width=s.hp+"%";$("rh").style.width=(s.rh/opponent().health*100)+"%";
 $("ps").style.width=s.st+"%";$("rs").style.width=s.rs+"%";
 $("pht").textContent=Math.ceil(s.hp);$("rht").textContent=Math.ceil(s.rh);
 $("timer").textContent=Math.floor(s.t/60)+":"+String(s.t%60).padStart(2,"0");
 $("record").textContent=wins+"–"+losses;$("kds").textContent=s.rivalDowns;$("combo").textContent=s.combo;const starDisplay=$("star-display");if(starDisplay)starDisplay.textContent="★".repeat(s.stars)+"☆".repeat(3-s.stars);const starButton=document.querySelector('[data-a="star"]');if(starButton)starButton.disabled=s.stars<1||!s.active;
 const range=$("range");if(range)range.textContent=s.depth>=7?"CLOSE":s.depth<=-3?"FAR":"MID";
 player.style.left="calc(50% - var(--fighter-half, 71px) + "+s.x+"px)";player.style.bottom=(8+s.depth*1.15)+"%";
 player.style.transform="scale("+(1+(12-s.depth)*.004).toFixed(3)+")";
 const label=document.querySelector(".rival b");if(label)label.textContent="RIVAL · "+opponent().name;
 const round=document.querySelector(".clock small");if(round)round.textContent="TOUR FIGHT 0"+(career+1);
}
function say(message){$("status").textContent=message}
function down(el){sound("down");el.classList.add("knockdown");setTimeout(()=>el.classList.remove("knockdown"),1800)}
function announce(message){$("callout").textContent=message;clearTimeout(announce.timer);announce.timer=setTimeout(()=>$("callout").textContent="",1100)}
function anim(el,cls){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),cls==="star-punch"?560:cls.startsWith("punch-")?340:300)}
function stepMotion(direction){player.classList.remove("step-in","step-out");void player.offsetWidth;player.classList.add(direction>0?"step-in":"step-out");setTimeout(()=>player.classList.remove("step-in","step-out"),260)}
function rivalStrike(type){
 const move=type==="counter"?"hook":type;
 rival.classList.remove("rival-strike","rival-strike-"+move);
 void rival.offsetWidth;
 rival.classList.add("rival-strike","rival-strike-"+move);
 setTimeout(()=>rival.classList.remove("rival-strike","rival-strike-"+move),430);
}
function showSelect(){$("select-screen").classList.remove("hidden")}
function hideSelect(){$("select-screen").classList.add("hidden")}
function applyBoxer(){
 const b=boxers[boxer];player.style.setProperty("--skin",b.skin);player.style.setProperty("--short",b.short);player.style.setProperty("--glove",b.glove);
 document.querySelectorAll("[data-boxer]").forEach(el=>el.classList.toggle("selected",el.dataset.boxer===boxer));
}
function finish(win){
 if(!s.active)return;s.active=false;
 const arena=document.querySelector(".arena");if(arena){arena.classList.remove("ko-flash");void arena.offsetWidth;arena.classList.add("ko-flash");}
 if(win){wins++;sound("cheer");const champion=career===opponents.length-1;say(champion?"WORLD CHAMPION! THE TOUR IS YOURS":"VICTORY — "+opponents[career].name+" DEFEATED");announce(champion?"WORLD CHAMPION!":"KNOCKOUT!");career=(career+1)%opponents.length}
 else{losses++;sound("down");say("DEFEAT — RECOVER AND TRY AGAIN");announce("DOWN!")}
 saveCareer();
 update();
}
function start(){
 const o=opponent();hideSelect();applyBoxer();
 Object.assign(s,{hp:100,rh:o.health,st:100,rs:100,t:120,x:0,depth:0,active:true,block:false,dodging:false,enemy:2,enemyMove:"jab",rivalDowns:0,playerDowns:0,downTimer:0,combo:0,stars:0,lastAttack:"",attackCounts:{jab:0,hook:0,upper:0},feint:false});
 player.classList.remove("guard","knockdown");rival.classList.remove("telegraph","impact");say(o.intro||("BELL RINGS — "+o.name+" ENTERS THE RING"));announce("FIGHT!");sound("bell");update();
}
function hit(type){
 if(!s.active)return;
 const b=boxers[boxer],cost={jab:5,hook:12,upper:18}[type]/b.stamina,damage={jab:7,hook:13,upper:20}[type]*b.damage;
 if(s.st<cost){say("TOO TIRED — RECOVER");return}
 s.st-=cost;s.lastAttack=type;s.attackCounts[type]++;anim(player,"punch");anim(player,"punch-"+type);sound(type);
 const slipChance=opponent().style==="counter"?.2:opponent().style==="champion"?.12:0;
 if(s.combo>=2&&Math.random()<slipChance){s.combo=0;s.enemy=Math.min(s.enemy,.8);say(opponent().name+" SLIPS THE REPEATED ATTACK!");announce("PUNCH MISSED!");sound("miss");update();return}
 s.combo++;const rangeFactor=clamp(.78+(s.depth+8)*.015,.78,1.08);
 const accuracy=({jab:.91,hook:.76,upper:.65}[type])*b.accuracy*rangeFactor;
 if(Math.random()<Math.min(.98,accuracy)){
  const critical=Math.random()<.16?1.7:1;s.rh=clamp(s.rh-damage*critical*rangeFactor,0,opponent().health);if(s.combo>0&&s.combo%3===0&&s.stars<3){s.stars++;announce("STAR EARNED!");}s.rs=clamp(s.rs-3,0,100);anim(rival,"hit");anim(rival,"impact");
  if(s.rh>0&&s.rh<opponent().health*.3&&s.rivalDowns<2&&Math.random()<.28){s.rivalDowns++;s.enemy=5;down(rival);announce("RIVAL DOWN!")}
  say(critical>1?"PERFECT COUNTER — BIG DAMAGE!":type.toUpperCase()+" CONNECTS!");sound("impact");
 }else{s.combo=0;say("MISSED — WATCH YOUR TIMING");sound("miss")}
 update();if(s.rh<=0)finish(true);
}
function starPunch(){if(!s.active||s.stars<1){say("LAND THREE CLEAN HITS TO EARN A STAR");return}const b=boxers[boxer];s.stars--;s.st-=Math.min(s.st,14/b.stamina);anim(player,"star-punch");sound("star");const arena=document.querySelector(".arena");if(arena){arena.classList.remove("star-impact");void arena.offsetWidth;arena.classList.add("star-impact");setTimeout(()=>arena.classList.remove("star-impact"),520)}const rangeFactor=clamp(.82+(s.depth+8)*.012,.82,1.08);const damage=32*b.damage*rangeFactor;s.rh=clamp(s.rh-damage,0,opponent().health);s.rs=clamp(s.rs-9,0,100);s.combo++;s.enemy=Math.max(s.enemy,2.5);rival.classList.remove("telegraph");anim(rival,"hit");anim(rival,"impact");say("STAR PUNCH! MASSIVE DAMAGE!");announce("★ STAR PUNCH!");update();if(s.rh<=0)finish(true)}
function move(direction){if(!s.active)return;s.x=clamp(s.x+direction*18,-64,64);stepMotion(direction);update()}
function moveDepth(direction){if(!s.active)return;s.depth=clamp(s.depth+direction*5,-8,12);stepMotion(direction);update()}
function dodge(){if(!s.active||s.st<10)return;sound("dodge");s.st-=10;s.dodging=true;const timed=rival.classList.contains("telegraph");player.classList.remove("dodge-step");void player.offsetWidth;player.classList.add("dodge-step");setTimeout(()=>player.classList.remove("dodge-step"),timed?760:360);setTimeout(()=>s.dodging=false,timed?1250:380);update()}
function guard(on){s.block=on;player.classList.toggle("guard",on)}
function act(action){if(action==="left")move(-1);else if(action==="right")move(1);else if(action==="up")moveDepth(1);else if(action==="down")moveDepth(-1);else if(["jab","hook","upper"].includes(action))hit(action);else if(action==="dodge")dodge();else if(action==="star")starPunch();else if(action==="block")guard(true)}
document.querySelectorAll("[data-a]").forEach(button=>{
 const action=button.dataset.a;button.addEventListener("pointerdown",event=>{event.preventDefault();act(action)});
 const release=()=>{if(action==="block")guard(false)};
 button.addEventListener("pointerup",release);button.addEventListener("pointercancel",release);button.addEventListener("pointerleave",release);
});
document.querySelectorAll("[data-boxer]").forEach(button=>button.addEventListener("click",()=>{
 boxer=button.dataset.boxer;saveCareer();document.querySelectorAll("[data-boxer]").forEach(b=>b.classList.toggle("selected",b===button));applyBoxer();
}));
$("audio-toggle").addEventListener("click",()=>{audioMuted=!audioMuted;$("audio-toggle").textContent=audioMuted?"SOUND OFF":"SOUND ON";if(!audioMuted)sound("bell")});
$("enter-ring").addEventListener("click",start);$("restart").addEventListener("click",()=>{if(s.active){s.active=false}showSelect()});
document.addEventListener("keydown",event=>{
 if(["arrowleft","arrowright","arrowup","arrowdown"," "].includes(event.key.toLowerCase()))event.preventDefault();
 if(event.repeat)return;const key=event.key.toLowerCase();
 if(key==="arrowleft")move(-1);if(key==="arrowright")move(1);if(key==="arrowup")moveDepth(1);if(key==="arrowdown")moveDepth(-1);if(key==="a")hit("jab");if(key==="s")hit("hook");if(key==="d")hit("upper");
 if(key===" "){event.preventDefault();guard(true)}if(key==="shift")dodge();if(key==="f")starPunch();
});
document.addEventListener("keyup",event=>{if(event.key===" ")guard(false)});
window.addEventListener("blur",()=>guard(false));
setInterval(()=>{
 if(!s.active)return;
 s.t=Math.max(0,s.t-1);s.st=clamp(s.st+2.2,0,100);s.rs=clamp(s.rs+1.5,0,100);s.enemy-=1;
 const o=opponent();
 if(s.enemy<=1&&!rival.classList.contains("telegraph")){
  const moves=o.style==="power"?["hook","upper","hook","upper"]:o.style==="counter"?["jab","hook","counter","counter"]:o.style==="champion"?["jab","hook","upper","counter"]:["jab","jab","hook","jab"];
  if(o.style==="champion"&&s.lastAttack){const repeated=s.attackCounts[s.lastAttack];s.enemyMove=repeated>=3?(s.lastAttack==="jab"?"hook":"jab"):moves[Math.floor(Math.random()*moves.length)];}
  else s.enemyMove=moves[Math.floor(Math.random()*moves.length)];
  s.feint=o.style==="counter"&&Math.random()<.22;
  rival.classList.add("telegraph");
  say(s.enemyMove==="upper"?"RIVAL LOADS AN UPPERCUT!":s.enemyMove==="hook"?"RIVAL WINDING UP A HOOK!":s.enemyMove==="counter"?"RIVAL IS WAITING FOR YOUR PUNCH!":"RIVAL PREPARING A JAB!");
  sound("warning");
 }
 if(s.enemy<=0){
  rival.classList.remove("telegraph");
  if(s.feint&&s.downTimer<=0){s.feint=false;s.enemy=.7;say("VELVET FEINTS — DON’T BITE!");announce("FEINT!");sound("miss");update();return;}
  if(s.downTimer<=0)rivalStrike(s.enemyMove);
  if(s.downTimer>0){s.downTimer--;say("GET UP! "+s.downTimer);if(s.downTimer===0){s.hp=Math.max(s.hp,32);say("BACK ON YOUR FEET!")}}
  else if(s.dodging){say("PERFECT DODGE — COUNTER WINDOW!");s.st=clamp(s.st+7,0,100);s.combo++;s.enemyMove="jab";announce("PERFECT DODGE!") }
  else if(s.block){
   const blockedDamage=o.style==="power"? (s.enemyMove==="upper"?18:14) : s.enemyMove==="upper"?9:s.enemyMove==="hook"?7:4;
   s.hp=clamp(s.hp-blockedDamage,0,100);say("GUARD ABSORBS THE "+s.enemyMove.toUpperCase());sound("block");
  }else{
   const distance=clamp(.62+(s.depth+8)*.024,.62,1.1);
   const evade=clamp(Math.abs(s.x)/64*.16+(s.depth<=-3?.12:0),0,.28);
   const moveDamage=(s.enemyMove==="upper"?1.55:s.enemyMove==="hook"?1.25:s.enemyMove==="counter"?1.35:1)*(o.style==="power"?1.18:1)*(o.style==="champion"&&s.lastAttack===s.enemyMove?1.12:1);
   const counterMiss=o.style==="counter"&&s.combo>0?.12:0;
   if(Math.random()<Math.min(.45,evade+counterMiss)){say("RIVAL MISSES — COUNTER NOW!");announce("MISS!");sound("miss")}
   else{s.hp=clamp(s.hp-(o.damage+Math.floor(Math.random()*7))*distance*moveDamage,0,100);s.combo=0;anim(player,"hit");say(o.name+" LANDS A "+s.enemyMove.toUpperCase()+"!");sound("impact");if(s.hp>0&&s.hp<25&&s.playerDowns<1){s.playerDowns++;s.downTimer=3;down(player);announce("YOU ARE DOWN!")}}
  }
  const recovery=o.style==="pressure"?.72:o.style==="counter"?1.2:o.style==="power"?1.38:o.style==="champion"?(Math.random()<.3?.68:1.02):1;
  s.enemy=(o.pace+Math.random()*o.pace)*recovery;
  if(o.style==="pressure"&&Math.random()<.42)s.enemy=Math.min(s.enemy,.65);
  s.enemyMove="jab";update();if(s.hp<=0){finish(false);return}
 }
 if(s.t===0){finish(s.hp>=s.rh);return}update();
},1000);
applyBoxer();update();
})();