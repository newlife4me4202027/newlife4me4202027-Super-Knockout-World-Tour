(()=>{
const $=id=>document.getElementById(id),player=$("you"),rival=$("foe");
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const opponents=[
{name:"IRON MAKO",health:100,pace:2,damage:9},
{name:"VICIOUS VELVET",health:115,pace:1.7,damage:11},
{name:"BRUISER NOVA",health:130,pace:1.4,damage:13},
{name:"THE WORLD CHAMPION",health:150,pace:1.15,damage:15}
];
let career=0,wins=0,losses=0,tick=null;
let s={hp:100,rh:100,st:100,rs:100,t:120,x:29,active:false,block:false,dodging:false,enemy:2,knockdowns:0,rivalDowns:0,playerDowns:0,downTimer:0,combo:0};
function opponent(){return opponents[career]}
function update(){
 $("ph").style.width=s.hp+"%";$("rh").style.width=(s.rh/opponent().health*100)+"%";
 $("ps").style.width=s.st+"%";$("rs").style.width=s.rs+"%";
 $("pht").textContent=Math.ceil(s.hp);$("rht").textContent=Math.ceil(s.rh);
 $("timer").textContent=Math.floor(s.t/60)+":"+String(s.t%60).padStart(2,"0");
 $("record").textContent=wins+"–"+losses;
 player.style.left=s.x+"%";
 const label=document.querySelector(".rival b");
 if(label)label.textContent="RIVAL · "+opponent().name;
 const round=document.querySelector(".clock small");
 if(round)round.textContent="TOUR FIGHT 0"+(career+1);
}
function say(message){$("status").textContent=message}\nfunction down(el){el.classList.add("knockdown");setTimeout(()=>el.classList.remove("knockdown"),1800)}
function announce(message){$("callout").textContent=message;clearTimeout(announce.timer);announce.timer=setTimeout(()=>$("callout").textContent="",1000)}
function anim(el,cls){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),300)}
function finish(win){
 if(!s.active)return;s.active=false;
 if(win){wins++;say(career===opponents.length-1?"WORLD CHAMPION! THE TOUR IS YOURS":"VICTORY — NEXT CHALLENGER UNLOCKED");announce(career===opponents.length-1?"WORLD CHAMPION!":"KNOCKOUT!");career=(career+1)%opponents.length}
 else{losses++;say("DEFEAT — RECOVER AND TRY AGAIN");announce("DOWN!")}
 update();
}
function start(){
 const o=opponent();
 Object.assign(s,{hp:100,rh:o.health,st:100,rs:100,t:120,x:29,active:true,block:false,dodging:false,enemy:2,knockdowns:0,rivalDowns:0,playerDowns:0,downTimer:0,combo:0});
 player.classList.remove("guard");say("BELL RINGS — "+o.name+" ENTERS THE RING");announce("FIGHT!");update();
}
function hit(type){
 if(!s.active)return;
 const cost={jab:5,hook:12,upper:18}[type],damage={jab:7,hook:13,upper:20}[type];
 if(s.st<cost){say("TOO TIRED — RECOVER");return}
 s.st-=cost;s.combo++;anim(player,"punch");
 const accuracy={jab:.91,hook:.76,upper:.65}[type];
 if(Math.random()<accuracy){
  const critical=Math.random()<.16?1.7:1;
  s.rh=clamp(s.rh-damage*critical,0,opponent().health);
  s.rs=clamp(s.rs-3,0,100);anim(rival,"hit");
  say(critical>1?"PERFECT COUNTER — BIG DAMAGE!":type.toUpperCase()+" CONNECTS!");
 }else say("MISSED — WATCH YOUR TIMING");
 update();if(s.rh<=0)finish(true);
}
function move(direction){if(!s.active)return;s.x=clamp(s.x+direction*4,17,43);update()}
function dodge(){
 if(!s.active||s.st<10)return;s.st-=10;s.dodging=true;
 player.style.transition=".1s";player.style.translate="0 14px";
 setTimeout(()=>{player.style.translate="0 0"},300);
 setTimeout(()=>s.dodging=false,380);update();
}
function guard(on){s.block=on;player.classList.toggle("guard",on)}
function act(action){
 if(action==="left")move(-1);else if(action==="right")move(1);
 else if(["jab","hook","upper"].includes(action))hit(action);
 else if(action==="dodge")dodge();else if(action==="block")guard(true);
}
document.querySelectorAll("[data-a]").forEach(button=>{
 const action=button.dataset.a;
 button.addEventListener("pointerdown",event=>{event.preventDefault();act(action)});
 const release=()=>{if(action==="block")guard(false)};
 button.addEventListener("pointerup",release);button.addEventListener("pointercancel",release);button.addEventListener("pointerleave",release);
});
document.addEventListener("keydown",event=>{
 if(event.repeat)return;const key=event.key.toLowerCase();
 if(key==="arrowleft")move(-1);if(key==="arrowright")move(1);
 if(key==="a")hit("jab");if(key==="s")hit("hook");if(key==="d")hit("upper");
 if(key===" "){event.preventDefault();guard(true)}if(key==="shift")dodge();
});
document.addEventListener("keyup",event=>{if(event.key===" ")guard(false)});
$("restart").onclick=start;
tick=setInterval(()=>{
 if(!s.active)return;
 s.t=Math.max(0,s.t-1);s.st=clamp(s.st+2.2,0,100);s.rs=clamp(s.rs+1.5,0,100);s.enemy-=1;
 if(s.enemy<=0){
  const o=opponent();
  if(s.downTimer>0){s.downTimer--;say("GET UP! "+s.downTimer);if(s.downTimer===0){s.hp=Math.max(s.hp,32);say("BACK ON YOUR FEET!");}}\n  else if(s.dodging){say("PERFECT DODGE!");s.st=clamp(s.st+4,0,100)}
  else if(s.block){s.hp=clamp(s.hp-4,0,100);say("GUARD BLOCKED THE COUNTER")}
  else{s.hp=clamp(s.hp-(o.damage+Math.floor(Math.random()*7)),0,100);anim(player,"hit");say(o.name+" COUNTERED — DEFEND!");if(s.hp>0&&s.hp<25&&s.playerDowns<1){s.playerDowns++;s.downTimer=3;down(player);announce("YOU ARE DOWN!");}}
  s.enemy=o.pace+Math.random()*o.pace;update();if(s.hp<=0){finish(false);return}
 }
 if(s.t===0){finish(s.hp>=s.rh);return}update();
},1000);
update();
})();