/* BUILD 3.3 — perspective arena ring model: canvas-rendered platform, apron, posts and ropes. */
(()=> {
 const arena=document.querySelector(".arena");if(!arena)return;
 const canvas=document.createElement("canvas");canvas.id="ring-model";canvas.setAttribute("aria-hidden","true");
 const css=document.createElement("style");css.textContent=`
 #ring-model{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}
 .arena>.crowd{z-index:1}.arena>.ropes{display:none!important}
 .arena:after{z-index:2}
 `;document.head.appendChild(css);arena.insertBefore(canvas,arena.firstChild);
 const ctx=canvas.getContext("2d");let w=0,h=0,dpr=1;
 function resize(){const r=arena.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,1.25);w=r.width;h=r.height;canvas.width=Math.max(1,Math.round(w*dpr));canvas.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0)}
 new ResizeObserver(resize).observe(arena);resize();
 const path=(pts,fill,stroke,line=1)=>{ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=line;ctx.stroke()}};
 function rail(a,b,color,thick){ctx.lineCap="round";ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle="#07101f99";ctx.lineWidth=thick+4;ctx.stroke();ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle=color;ctx.lineWidth=thick;ctx.stroke();ctx.beginPath();ctx.moveTo(a[0],a[1]-thick*.3);ctx.lineTo(b[0],b[1]-thick*.3);ctx.strokeStyle="#ffffff9c";ctx.lineWidth=Math.max(1,thick*.22);ctx.stroke()}
 let lastDraw=0;function draw(now){if(!arena.isConnected)return;requestAnimationFrame(draw);if(document.hidden||now-lastDraw<33||!w||!h)return;lastDraw=now;ctx.clearRect(0,0,w,h);const t=now*.001;
 // Ring apron and raised platform, in a deep perspective trapezoid.
 const backL=[w*.19,h*.39],backR=[w*.81,h*.39],frontR=[w*.94,h*.78],frontL=[w*.06,h*.78];
 path([[w*.10,h*.78],[w*.90,h*.78],[w*.96,h*.86],[w*.04,h*.86]],"#080e1b","#c5a65f",2);
 path([backL,backR,frontR,frontL],"#c6d0df","#182844",3);
 path([[w*.19,h*.39],[w*.81,h*.39],[w*.86,h*.44],[w*.14,h*.44]],"#edf0f2","#6b7890",2);
 // Canvas seams and central championship emblem.
 ctx.save();ctx.beginPath();ctx.moveTo(...backL);ctx.lineTo(...backR);ctx.lineTo(...frontR);ctx.lineTo(...frontL);ctx.closePath();ctx.clip();
 const grad=ctx.createLinearGradient(0,h*.4,0,h*.8);grad.addColorStop(0,"#d9e0e8");grad.addColorStop(.55,"#aeb9c8");grad.addColorStop(1,"#78879b");ctx.fillStyle=grad;ctx.fillRect(0,h*.39,w,h*.4);
 ctx.strokeStyle="#52647e55";ctx.lineWidth=1;for(let i=1;i<9;i++){ctx.beginPath();ctx.moveTo(w*i/10,h*.42);ctx.lineTo(w*(.06+i*.088),h*.78);ctx.stroke()}
 ctx.fillStyle="#203b65";ctx.font="900 "+Math.max(12,w*.035)+"px Georgia";ctx.textAlign="center";ctx.fillText("WORLD TOUR",w*.5,h*.64);
 ctx.restore();
 // Four corner posts, foreshortened back posts smaller than front posts.
 const corners=[[backL[0],backL[1],.78],[backR[0],backR[1],.78],[frontR[0],frontR[1],1.1],[frontL[0],frontL[1],1.1]];
 corners.forEach(([x,y,s],i)=>{const top=y-h*.24*s;ctx.fillStyle="#050a14aa";ctx.fillRect(x-5*s+3,top+4,10*s,(y-top)+7);const g=ctx.createLinearGradient(x-6*s,0,x+6*s,0);g.addColorStop(0,"#263750");g.addColorStop(.35,"#f0d18a");g.addColorStop(.7,"#9a7338");g.addColorStop(1,"#27354b");ctx.fillStyle=g;ctx.fillRect(x-5*s,top,10*s,y-top+5);ctx.strokeStyle="#fff5d7";ctx.lineWidth=1;ctx.strokeRect(x-5*s,top,10*s,y-top+5);ctx.fillStyle=["#c53b49","#2864ad","#c53b49","#2864ad"][i];ctx.fillRect(x-9*s,top+h*.055*s,18*s,22*s);});
 // Three rows of tensioned ropes with perspective and metallic turnbuckles.
 const rows=[.29,.355,.42];rows.forEach((yFrac,i)=>{const y=h*yFrac;const spread=(yFrac-.25)*.34;const left=w*(.19-spread),right=w*(.81+spread);const fade=.8+i*.08;rail([left,y],[right,y],i===1?"#f3f2e9":"#d7dce5",Math.max(2,4*fade));});
 // Side ropes angle toward the foreground, enclosing the ring.
 for(let side=0;side<2;side++){const bx=side?w*.81:w*.19,fx=side?w*.94:w*.06;rows.forEach((f,i)=>rail([bx,h*f],[fx,h*(f+.34)],"#e8e9e8",Math.max(2,3.5-i*.3)))}
 // Small animated arena light glints.
 const pulse=.35+.18*Math.sin(t*2.1);ctx.fillStyle="rgba(255,226,160,"+pulse+")";ctx.beginPath();ctx.arc(w*.5,h*.12,Math.max(2,w*.006),0,Math.PI*2);ctx.fill();
 }
 requestAnimationFrame(draw);
})();