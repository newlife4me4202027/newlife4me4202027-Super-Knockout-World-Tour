/* BUILD 3.0 — real-time shaded boxer models, drawn at runtime for mobile performance.
   This is a custom 2.5D model renderer, not a claim of native polygonal 3D. */
(()=> {
 const fighters=[document.getElementById("you"),document.getElementById("foe")].filter(Boolean);
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const path=(c,points,fill,stroke="#241b1b",line=2)=>{c.beginPath();c.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)c.lineTo(points[i][0],points[i][1]);c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.lineWidth=line;c.strokeStyle=stroke;c.stroke()}};
 const ellipse=(c,x,y,rx,ry,fill,stroke=null,line=1)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();if(stroke){c.lineWidth=line;c.strokeStyle=stroke;c.stroke()}};
 const grad=(c,x1,y1,x2,y2,stops)=>{const g=c.createLinearGradient(x1,y1,x2,y2);stops.forEach(s=>g.addColorStop(s[0],s[1]));return g};
 function draw(c,el,now){
  const w=142,h=285,style=getComputedStyle(el),skin=style.getPropertyValue("--skin").trim()||"#a86c4d",short=style.getPropertyValue("--short").trim()||"#236fc5",glove=style.getPropertyValue("--glove").trim()||"#e74343";
  const back=el.id==="you",classes=el.classList;
  const phase=now*.001,breath=Math.sin(phase*2.3+(back?0:1)) * 1.6;
  const rivalStrike=classes.contains("rival-strike")||classes.contains("rival-strike-jab")||classes.contains("rival-strike-hook")||classes.contains("rival-strike-upper");
  const playerStrike=classes.contains("punch-jab")||classes.contains("punch-hook")||classes.contains("punch-upper")||classes.contains("star-punch");
  const punch=playerStrike||rivalStrike;
  const upper=classes.contains("punch-upper")||classes.contains("rival-strike-upper");
  const hook=classes.contains("punch-hook")||classes.contains("rival-strike-hook");
  const star=classes.contains("star-punch");
  const hit=classes.contains("hit")||classes.contains("impact"),guard=classes.contains("guard"),telegraph=classes.contains("telegraph");
  const knocked=classes.contains("knockdown")||classes.contains("final-knockout");
  c.clearRect(0,0,w,h);c.save();
  // Small idle weight shifts keep each boxer alive; attacks lean toward the opponent.
  c.translate(Math.sin(phase*1.7+(back?0:1.1))*1.15,Math.sin(phase*2.3+(back?0:1))*1.1);
  if(hit)c.translate(Math.sin(phase*55)*3,0);
  if(punch){
   c.translate(71,160);
   c.rotate((back?-1:1)*(star?.105:upper?.09:hook?.075:.055));
   c.translate(-71,-160);
   c.translate(0,back?-(star?13:upper?10:6):(star?13:upper?10:6));
  }
  if(knocked){c.translate(71,155);c.rotate(back?-.13:.13);c.translate(-71,-155);}
  if(telegraph)c.translate(0,Math.sin(phase*18)*2);
  // Ring-contact shadow and boot silhouette
  ellipse(c,71,277,43,6,"rgba(0,0,0,.52)");
  const flesh=grad(c,32,0,112,0,[[0,"#40251f"],[.2,skin],[.48,"#f0bd91"],[.72,skin],[1,"#38231e"]]);
  const gloveG=grad(c,0,0,45,45,[[0,"#fff1d4"],[.22,glove],[.7,glove],[1,"#241b25"]]);
  const cloth=grad(c,27,0,118,0,[[0,"#101b31"],[.25,short],[.58,short],[1,"#111827"]]);
  // calves and boxing boots
  path(c,[[45,205],[66,207],[63,254],[56,271],[34,270],[39,243]],flesh);
  path(c,[[78,207],[99,205],[105,242],[116,269],[94,273],[85,254]],flesh);
  path(c,[[34,261],[59,264],[68,277],[64,284],[25,284],[24,278]],grad(c,20,260,60,285,[[0,"#eff4f4"],[.35,"#274d80"],[1,"#071326"]]));
  path(c,[[94,264],[117,260],[132,278],[129,284],[90,284],[87,277]],grad(c,85,260,130,285,[[0,"#eff4f4"],[.35,"#274d80"],[1,"#071326"]]));
  c.strokeStyle="#f5e9d2";c.lineWidth=3;c.beginPath();c.moveTo(28,277);c.lineTo(63,277);c.moveTo(94,277);c.lineTo(130,277);c.stroke();
  // trunks with waistband and seams
  path(c,[[34,173],[108,173],[117,221],[91,232],[71,215],[51,232],[25,220]],cloth,"#111b2c",3);
  path(c,[[33,177],[109,177],[111,191],[31,191]],grad(c,30,177,110,191,[[0,"#fff"],[.5,"#d9e2eb"],[1,"#fff"]]),"#182338",1.5);
  c.strokeStyle="#ffffff88";c.lineWidth=2;c.beginPath();c.moveTo(71,192);c.lineTo(71,218);c.moveTo(43,204);c.lineTo(55,214);c.moveTo(99,204);c.lineTo(87,214);c.stroke();
  // torso and back silhouette, broad shoulders tapering to waist
  const lift=breath;
  path(c,[[48,65+lift],[61,57+lift],[71,61+lift],[83,57+lift],[99,65+lift],[115,83+lift],[112,125],[104,169],[94,181],[48,181],[38,167],[29,124],[27,88]],flesh,"#39241d",3);
  // torso shading / anatomical forms
  if(back){
   ellipse(c,48,101+lift,15,34,"rgba(55,31,25,.25)");
   ellipse(c,94,101+lift,15,34,"rgba(55,31,25,.25)");
   path(c,[[49,70],[71,79],[93,70],[108,91],[98,137],[88,168],[71,178],[54,168],[43,137],[34,91]],"rgba(40,22,20,.13)",null);
   c.strokeStyle="rgba(55,30,24,.62)";c.lineWidth=3;c.beginPath();c.moveTo(71,80);c.lineTo(71,172);c.moveTo(43,101);c.quadraticCurveTo(56,111,68,111);c.moveTo(74,111);c.quadraticCurveTo(88,111,101,101);c.moveTo(48,133);c.quadraticCurveTo(58,143,68,139);c.moveTo(74,139);c.quadraticCurveTo(87,143,96,133);c.stroke();
   ellipse(c,50,78,13,12,"rgba(255,215,176,.24)");ellipse(c,92,78,13,12,"rgba(255,215,176,.24)");
  }else{
   ellipse(c,52,91,19,14,"rgba(255,219,184,.3)");ellipse(c,90,91,19,14,"rgba(255,219,184,.3)");
   path(c,[[39,91],[51,81],[69,88],[71,112],[61,119],[43,113]],"rgba(255,218,181,.22)",null);
   path(c,[[103,91],[91,81],[73,88],[71,112],[81,119],[99,113]],"rgba(255,218,181,.22)",null);
   c.strokeStyle="rgba(67,36,28,.65)";c.lineWidth=2.5;c.beginPath();c.moveTo(71,91);c.lineTo(71,169);c.moveTo(45,125);c.quadraticCurveTo(57,119,68,129);c.moveTo(74,129);c.quadraticCurveTo(85,119,97,125);c.moveTo(49,145);c.quadraticCurveTo(59,139,68,147);c.moveTo(74,147);c.quadraticCurveTo(84,139,93,145);c.stroke();
  }
  // Neck
  path(c,[[59,43],[84,43],[88,72],[71,83],[54,71]],flesh,"#4b2d23",2);
  // arms: deltoids, biceps, forearms; lifted guard position
  const armPose=guard?9:0;
  path(c,[[43,69],[30,68],[19,81],[11,111],[20,132],[37,128],[48,99],[59,86]],flesh,"#39241d",3);
  path(c,[[99,69],[112,68],[123,81],[131,111],[122,132],[105,128],[94,99],[83,86]],flesh,"#39241d",3);
  ellipse(c,29,91,12,18,"rgba(255,210,170,.24)");ellipse(c,113,91,12,18,"rgba(255,210,170,.24)");
  path(c,[[18,111],[34,116],[40,128],[34,146],[12,140],[8,128]],flesh,"#39241d",2);
  path(c,[[124,111],[108,116],[102,128],[108,146],[130,140],[134,128]],flesh,"#39241d",2);
  // Wrist wraps
  path(c,[[9,127],[35,132],[31,150],[6,144]],"#eee9dc","#37303a",2);
  path(c,[[107,132],[133,127],[136,144],[111,150]],"#eee9dc","#37303a",2);
  c.strokeStyle="#b5b5b1";c.lineWidth=2;c.beginPath();c.moveTo(9,135);c.lineTo(33,140);c.moveTo(109,140);c.lineTo(133,135);c.stroke();
  // Gloves in foreground, with padded knuckle highlights
  const gy=(guard?105:116)+(punch?(back?-13:13):0);
  ellipse(c,21,gy,20,22,gloveG,"#201b25",3);ellipse(c,121,gy,20,22,gloveG,"#201b25",3);
  ellipse(c,16,gy-6,9,7,"rgba(255,255,255,.27)");ellipse(c,116,gy-6,9,7,"rgba(255,255,255,.27)");
  c.strokeStyle="#fff8";c.lineWidth=3;c.beginPath();c.moveTo(8,gy+2);c.quadraticCurveTo(20,gy+9,34,gy+1);c.moveTo(108,gy+1);c.quadraticCurveTo(121,gy+9,134,gy+2);c.stroke();
  // Head and face/hair
  if(back){
   ellipse(c,71,27,25,29,flesh,"#39251f",2.5);
   path(c,[[47,30],[44,14],[54,3],[71,0],[89,5],[99,17],[95,35],[87,24],[80,17],[70,24],[59,17],[52,37]],"#35221e","#171419",2.5);
   c.strokeStyle="#a66c43";c.lineWidth=2;c.beginPath();c.moveTo(55,13);c.lineTo(65,6);c.moveTo(67,15);c.lineTo(78,5);c.moveTo(82,15);c.lineTo(91,10);c.stroke();
  }else{
   ellipse(c,71,27,25,29,flesh,"#39251f",2.5);
   ellipse(c,46,32,5,9,skin,"#39251f",1.5);ellipse(c,96,32,5,9,skin,"#39251f",1.5);
   path(c,[[47,27],[44,14],[55,3],[72,0],[90,5],[99,17],[95,31],[88,20],[79,15],[70,21],[60,15],[52,31]],"#211d24","#11131b",2.5);
   c.strokeStyle="#37221d";c.lineWidth=3;c.beginPath();c.moveTo(54,31);c.lineTo(66,33);c.moveTo(77,33);c.lineTo(89,31);c.stroke();
   ellipse(c,61,38,3,2,"#fff2dc");ellipse(c,82,38,3,2,"#fff2dc");ellipse(c,62,38,1.4,1.6,"#17151a");ellipse(c,83,38,1.4,1.6,"#17151a");
   c.strokeStyle="#704532";c.lineWidth=2;c.beginPath();c.moveTo(71,38);c.lineTo(67,49);c.lineTo(73,51);c.moveTo(62,57);c.quadraticCurveTo(72,62,82,56);c.stroke();
  }
  // Cinematic rim lights and muscle highlights
  c.strokeStyle="rgba(255,225,190,.42)";c.lineWidth=2;c.beginPath();c.moveTo(48,76);c.quadraticCurveTo(57,69,67,77);c.moveTo(75,77);c.quadraticCurveTo(86,69,96,76);c.moveTo(41,96);c.lineTo(35,119);c.moveTo(101,96);c.lineTo(107,119);c.stroke();
  // fighter-specific signature trim and sweat glints
  c.fillStyle="#f8e9bf";c.font="bold 9px Arial";c.textAlign="center";c.fillText("★",71,188);
  if(telegraph||punch){ellipse(c,112,58,2,3,"#fff4c9");ellipse(c,30,50,1.5,2,"#fff4c9")}
  if(punch){c.globalAlpha=.2;ellipse(c,back?71:71,back?gy-8:gy+8,30,17,"#fff0c5");c.globalAlpha=1}
  if(hit){c.globalAlpha=.24;ellipse(c,71,105,43,83,"#fff0d2");c.globalAlpha=1}
  c.restore();
 }
 function mount(el){
  const canvas=document.createElement("canvas");canvas.className="model-canvas";canvas.setAttribute("aria-hidden","true");el.appendChild(canvas);
  const ctx=canvas.getContext("2d",{alpha:true,desynchronized:true});if(!ctx)return;
  let width=0,height=0,ratio=1;
  const resize=()=>{const r=el.getBoundingClientRect();if(!r.width||!r.height)return;ratio=Math.min(window.devicePixelRatio||1,1.5);width=r.width;height=r.height;canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(canvas.width/142,0,0,canvas.height/285,0,0)};
  if("ResizeObserver" in window){const observer=new ResizeObserver(resize);observer.observe(el)}else window.addEventListener("resize",resize);
  resize();
  const frame=t=>{if(!el.isConnected)return;draw(ctx,el,t);requestAnimationFrame(frame)};requestAnimationFrame(frame);
 }
 fighters.forEach(mount);
})();