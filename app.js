const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('open',open);menu.querySelector('span').textContent=open?'−':'+';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){menu.click();menu.focus();}});
nav.addEventListener('click',e=>{if(e.target.closest('a')&&nav.classList.contains('open'))menu.click();});
let stage=0, selectedService=0, scheduled=false;
const stages=[...document.querySelectorAll('.stage')];
const stageLinks=[...document.querySelectorAll('.stage-progress a')];
const labels=['People','Leadership','Culture','Talent','Performance','Learning','Compliance','Rewards','Strategy'];
const networks=[];
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lerp=(a,b,t)=>a+(b-a)*t;
function requestDraw(){if(scheduled)return;scheduled=true;requestAnimationFrame(drawAll);}
class Constellation{
 constructor(el){this.el=el;this.type=el.dataset.network;this.canvas=el.querySelector('canvas');this.ctx=this.canvas.getContext('2d');this.pointer=null;this.visible=false;this.progress=0;this.target=0;this.ro=new ResizeObserver(()=>{const r=el.getBoundingClientRect();this.w=r.width;this.h=r.height;const d=Math.min(devicePixelRatio||1,2);this.canvas.width=r.width*d;this.canvas.height=r.height*d;this.ctx.setTransform(d,0,0,d,0,0);requestDraw();});this.ro.observe(el);el.addEventListener('pointermove',e=>{if(reduced.matches)return;const r=el.getBoundingClientRect();this.pointer={x:e.clientX-r.left,y:e.clientY-r.top};requestDraw();});el.addEventListener('pointerleave',()=>{this.pointer=null;requestDraw();});}
 draw(){if(!this.w||!this.visible)return false;const c=this.ctx,w=this.w,h=this.h,dark=this.type==='approach';let target=this.type==='final'?1:this.type==='approach'?stage/4:this.type==='service'?.35+selectedService*.12:clamp(-this.el.getBoundingClientRect().top/500)*.8;
 if(reduced.matches)target=this.type==='hero'?.12:1;this.target=target;this.progress=lerp(this.progress,target,reduced.matches?1:.085);if(Math.abs(target-this.progress)<.001)this.progress=target;const t=this.progress;
 c.clearRect(0,0,w,h);const ink=dark?'#eeeaf5':'#29216f',accent=dark?'#e5b534':'#946900',node=dark?'#e5b534':'#d3a00d';const cx=w*.5,cy=h*.48,scale=Math.min(w,h)*.35;
 const scatter=[[.08,.19],[.67,.05],[.91,.35],[.23,.77],[.72,.83],[.39,.04],[.04,.55],[.96,.65],[.5,.46]];
 const layout=[[.19,.25],[.49,.14],[.80,.26],[.16,.55],[.50,.34],[.84,.56],[.22,.82],[.73,.81],[.51,.51]];
 const points=labels.map((label,i)=>{let a=(i-2)*Math.PI*2/8;let x=w*layout[i][0],y=h*layout[i][1];
 if(this.type==='service'){const mode=selectedService;if(mode===0){x=cx+(i%3-1)*scale*.78;y=cy+(Math.floor(i/3)-1)*scale*.65;}if(mode===1){x=cx+(i<3?-1.2:.25+Math.cos(a)*.6)*scale;y=cy+Math.sin(a)*scale*.85;}if(mode===2){x=cx+Math.cos(a)*scale*.62;y=cy+Math.sin(a)*scale*.62;}if(mode===3){x=cx+Math.cos(a)*scale*(i===8?0:1.03);y=cy+Math.sin(a)*scale*(i===8?0:1.03);}if(mode===4){x=cx+(i%3-1)*scale*.8;y=cy+(Math.floor(i/3)-1)*scale*.7;}if(mode===5){x=cx+(i%3-1)*scale*.95;y=cy+(Math.floor(i/3)-1)*scale*.45;}}
 let px=lerp(w*.15+scatter[i][0]*w*.7,x,t),py=lerp(h*.17+scatter[i][1]*h*.64,y,t);if(this.pointer){const dx=px-this.pointer.x,dy=py-this.pointer.y,dist=Math.hypot(dx,dy);if(dist<110&&dist>0){px+=dx/dist*(1-dist/110)*9;py+=dy/dist*(1-dist/110)*9;}}
 return{x:px,y:py,label};});
 let hovered=-1;if(this.pointer)points.forEach((p,i)=>{if(Math.hypot(p.x-this.pointer.x,p.y-this.pointer.y)<45)hovered=i;});
 const relationships=[[0,1],[0,2],[0,3],[1,2],[1,4],[1,8],[2,4],[2,5],[3,4],[3,6],[4,5],[4,6],[4,7],[4,8],[5,7],[6,8],[7,8]];
 c.lineWidth=.85;relationships.forEach(([a,b],i)=>{const p=points[a],q=points[b];const alpha=(.025+t*.26)*(a===8||b===8?1:.72);c.strokeStyle=dark?`rgba(233,229,244,${alpha})`:`rgba(41,33,111,${alpha})`;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(q.x,q.y);c.stroke();if(t>.28&&(a===8||b===8)){const mx=lerp(p.x,q.x,.5),my=lerp(p.y,q.y,.5);c.fillStyle=dark?`rgba(229,181,52,${t*.55})`:`rgba(148,105,0,${t*.48})`;c.fillRect(mx-1,my-1,2,2);}});
 const stageFocus=[[0,1,2,3,4,5,6,7],[0,2,3,5,8],[1,3,4,6,7,8],[0,1,2,3,4,5,6,7,8],[8]];
 points.forEach((p,i)=>{const focusedByStage=this.type==='approach'&&stageFocus[stage].includes(i),central=i===8&&this.type!=='approach',focus=focusedByStage||central||i===hovered;const radius=focus?6:3.7;c.fillStyle=focus?node:ink;c.beginPath();c.arc(p.x,p.y,radius,0,Math.PI*2);c.fill();if(i===hovered||central||(this.type==='approach'&&stage===4&&i===8)){c.strokeStyle=dark?'rgba(229,181,52,.3)':'rgba(148,105,0,.24)';c.beginPath();c.arc(p.x,p.y,16,0,Math.PI*2);c.stroke();}if(i===8||(w>240&&((this.type!=='service'&&w>400)||i===0||i===2||i===4))){c.font=`${w<400?9:11}px "DM Sans",Arial,sans-serif`;const tw=c.measureText(p.label).width;const tx=clamp(p.x+12,4,w-tw-4),ty=p.y-10;c.fillStyle=dark?'#29216f':'#f5f4ef';c.fillRect(tx-3,ty-10,tw+6,15);c.fillStyle=focus?accent:ink;c.fillText(p.label,tx,ty);}});
 return this.progress!==this.target;
 }
}
document.querySelectorAll('[data-network]').forEach(el=>networks.push(new Constellation(el)));
const observer=new IntersectionObserver(entries=>{for(const entry of entries){const n=networks.find(n=>n.el===entry.target);if(n)n.visible=entry.isIntersecting;}requestDraw();},{rootMargin:'80px'});networks.forEach(n=>observer.observe(n.el));
function drawAll(){scheduled=false;let again=false;networks.forEach(n=>{if(n.draw())again=true;});if(again)requestDraw();}
function scrollUpdate(){document.querySelector('header').classList.toggle('scrolled',scrollY>20);if(stages.length){const aim=innerWidth<701?innerHeight*.73:innerHeight*.52;let best=Infinity;stages.forEach((el,i)=>{const r=el.getBoundingClientRect(),distance=Math.abs(r.top+r.height/2-aim);if(distance<best){best=distance;stage=i;}});stages.forEach((el,i)=>el.classList.toggle('active',i===stage));stageLinks.forEach((el,i)=>{el.classList.toggle('active',i===stage);if(i===stage)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});const captions=['Listening to the relationships.','Finding what matters.','Giving the system structure.','Moving forward together.','Connected. Structured. Aligned.'];const cap=document.querySelector('.network-approach [data-network-caption]');if(cap)cap.textContent=captions[stage];}requestDraw();}
const human=document.querySelector('.human');
function updateHuman(){if(!human)return;const r=human.getBoundingClientRect(),progress=reduced.matches?1:clamp((innerHeight-r.top)/(innerHeight*.85));human.style.setProperty('--separation',`${(1-progress)*35}px`);}
addEventListener('scroll',()=>{scrollUpdate();updateHuman();},{passive:true});addEventListener('resize',scrollUpdate);reduced.addEventListener('change',()=>{requestDraw();updateHuman();});scrollUpdate();updateHuman();
const tabs=[...document.querySelectorAll('[data-service]')];
if(tabs.length)fetch('data.json').then(r=>{if(!r.ok)throw Error('Service data unavailable');return r.json();}).then(({services})=>{
 function select(i){selectedService=i;tabs.forEach((t,j)=>{t.setAttribute('aria-selected',j===i);t.tabIndex=j===i?0:-1;});document.querySelector('#service-panel').setAttribute('aria-labelledby',`service-tab-${i}`);document.querySelector('#service-short').textContent=services[i].short;document.querySelector('#service-description').innerHTML=services[i].description;document.querySelector('#service-link').href=services[i].slug+'.html';requestDraw();}
 tabs.forEach((t,i)=>{t.addEventListener('click',()=>select(i));t.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')select(i);});t.addEventListener('keydown',e=>{let next;if(e.key==='ArrowDown')next=(i+1)%tabs.length;if(e.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();select(next);tabs[next].focus();}});});
}).catch(()=>{document.querySelector('#service-panel').insertAdjacentHTML('beforeend','<p>Explore every practice on the <a href="expertise.html">expertise page</a>.</p>');});
const form=document.querySelector('form');
if(form){const interest=new URLSearchParams(location.search).get('interest');for(const input of form.querySelectorAll('[name=interest]'))if(input.value===interest)input.checked=true;
 form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const button=form.querySelector('[type=submit]'),status=form.querySelector('.form-status');button.disabled=true;status.textContent='Sending your message…';const data=new FormData(form);data.set('_replyto',data.get('email'));data.set('_cc',data.get('send_copy')?data.get('email'):'');try{const r=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});if(!r.ok)throw Error('Submission failed');status.textContent='Thank you. Your message has been sent. Our team will be in touch.';form.reset();}catch{status.innerHTML='Your message could not be sent. Your details are still here. Please try again or <a href="mailto:ankita.vania@strategiestudio.com">email us directly</a>.';}finally{button.disabled=false;}});
}




