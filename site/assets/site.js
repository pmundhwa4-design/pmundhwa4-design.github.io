
(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var WA='919106766028', MAIL='ankita.vania@strategiesstudio.com';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function toast(msg){var t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove('show')},3200)}
var CHECK='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function ic(p){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'}

/* ---------------- data ---------------- */
var SERVICES=[
 {t:'HR Strategy & Advisory',short:'HR strategy',i:ic('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),d:'Turn HR into a true business driver with customised roadmaps, organisation design and culture strategies aligned to your growth goals.',rows:['Customised HR roadmap','Organisation design','Culture strategy','Growth-aligned people plans']},
 {t:'Talent Acquisition',short:'Hiring',i:ic('<circle cx="10" cy="8" r="4"/><path d="M3 20c0-3.5 3-6 7-6s7 2.5 7 6M19 8v6M16 11h6"/>'),d:'End-to-end recruitment, from employer branding and executive search to streamlined selection and workforce planning.',rows:['Employer branding','Executive search','Streamlined selection','Workforce planning']},
 {t:'Employee Engagement',short:'Engagement',i:ic('<path d="M12 20s-8-4.6-8-10.2A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.8C20 15.4 12 20 12 20Z"/>'),d:'Build workplaces where people choose to stay and give their best, through recognition, communication and manager enablement.',rows:['Recognition programmes','Internal communication','Manager enablement','Retention strategy']},
 {t:'Training & Development',short:'Training',i:ic('<path d="M2 9l10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>'),d:'Leadership development, behavioural training and role-based upskilling programmes, each with clearly measurable outcomes.',rows:['Leadership development','Behavioural training','Role-based upskilling','Measurable outcomes']},
 {t:'Compliance & Risk',short:'Compliance',i:ic('<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3Z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),d:'Policies, audits, PoSH compliance and labour-law guidance that keep your workplace legally protected and safe.',rows:['HR policies','HR audits','PoSH compliance','Labour-law guidance']},
 {t:'Payroll & Benefits',short:'Payroll',i:ic('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>'),d:'Accurate, transparent payroll management paired with competitive benefits administration and compensation benchmarking.',rows:['Payroll management','Benefits administration','Compensation benchmarking','Transparent reporting']}
];

/* ---------------- nav, progress, drawer ---------------- */
var nav=$('#nav'),hero=$('#top'),prog=$('#progress'),toTop=$('#toTop');
function onScroll(){
  var h=document.documentElement,max=h.scrollHeight-innerHeight;
  prog.style.transform='scaleX('+(max>0?scrollY/max:0)+')';
  toTop.classList.toggle('show',scrollY>innerHeight*1.2);
  if(!document.body.classList.contains('menu-open')){var c=scrollY>80;if(c!==nav.classList.contains('compact')){nav.classList.toggle('compact',c);var mk=$('.brand .mark');mk.classList.remove('was');if(!c){void mk.offsetWidth;mk.classList.add('was')}}}
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
toTop.addEventListener('click',function(){scrollTo({top:0,behavior:reduce?'auto':'smooth'})});
var menuBtn=$('#menuBtn');
function setMenu(o){if(o)nav.classList.remove('compact');else onScroll();document.body.classList.toggle('menu-open',o);menuBtn.setAttribute('aria-expanded',o);menuBtn.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''}
menuBtn.addEventListener('click',function(){setMenu(!document.body.classList.contains('menu-open'))});
$$('#drawer a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

var chooseService;
var currentPage=location.pathname.split('/').pop()||'index.html';
$$('.nav-links a, #drawer a').forEach(function(a){if(a.getAttribute('href')===currentPage)a.setAttribute('aria-current','page')});
$('#footSvc').innerHTML=SERVICES.map(function(s,i){return '<li><a href="services.html?service='+i+'#services">'+esc(s.t)+'</a></li>'}).join('');
chooseService=function(i){location.href='contact.html?service='+i+'#contact'};
/* ---------------- marquee ---------------- */
(function(){
  if(!$('#marquee'))return;
  var knight='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 21h10v-2H8v2Zm1-3h8c0-3-1-5-2.5-7L17 9l-1-4-3 1-3 3-2 4 2 1 2-2c.5 1 0 3-3 7Z"/></svg>';
  var words=['HR strategy','Talent acquisition','Employee engagement','Training and development','Compliance and risk','Payroll and benefits','From hire to inspire'];
  var one=words.map(function(w){return '<span>'+w+knight+'</span>'}).join('');
  $('#marquee').innerHTML=one+one;
})();

/* ---------------- particle knight ---------------- */
(function(){
  if(!$('#knight'))return;
  var cv=$('#knight'),stage=$('#stage'),ctx=cv.getContext('2d');
  var img=new Image();img.src='assets/image-1.png';
  var P=[],W=0,H=0,dpr=1,mouse={x:-9999,y:-9999,on:false},running=false,visible=true,t0=0,gap=6,size=2.4;
  var GOLD=[227,171,27],NAVY=[34,29,103];
  function build(){
    var r=stage.getBoundingClientRect();W=r.width;H=r.height;dpr=Math.min(2,devicePixelRatio||1);
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    var s=Math.min(W*.92/img.width,H*.9/img.height),iw=img.width*s,ih=img.height*s,ox=(W-iw)/2,oy=(H-ih)/2-10;
    gap=Math.max(4,Math.round(iw/82*10)/10);size=gap*.5;
    var off=document.createElement('canvas');off.width=Math.ceil(iw);off.height=Math.ceil(ih);
    var o=off.getContext('2d');o.drawImage(img,0,0,iw,ih);
    var d=o.getImageData(0,0,off.width,off.height).data,old=P;P=[];
    for(var y=0;y<off.height;y+=gap)for(var x=0;x<off.width;x+=gap){
      var k=((y|0)*off.width+(x|0))*4;if(d[k+3]<140)continue;
      var gold=d[k]>150&&d[k+1]>110&&d[k+2]<120;
      var hx=ox+x,hy=oy+y,prev=old[P.length];
      P.push({hx:hx,hy:hy,x:prev?prev.x:(reduce?hx:Math.random()*W),y:prev?prev.y:(reduce?hy:H+Math.random()*H*.6),vx:0,vy:0,g:gold,
        d:Math.random()*800,ph:Math.random()*6.28});
    }
  }
  function frame(t){
    if(!running)return;
    if(!t0)t0=t;var el=t-t0;
    ctx.clearRect(0,0,W,H);
    var R=Math.max(70,W*.14),R2=R*R;
    var golds=[],navys=[];
    for(var i=0;i<P.length;i++){
      var p=P[i];
      if(el<p.d){ /* waiting to join */ }
      var dx=p.x-mouse.x,dy=p.y-mouse.y,dd=dx*dx+dy*dy;
      if(mouse.on&&dd<R2){var dist=Math.sqrt(dd)||1,f=(1-dist/R)*5.2;p.vx+=dx/dist*f;p.vy+=dy/dist*f;}
      var k=el<p.d?0.012:0.055;
      var wob=reduce?0:Math.sin(t*.0012+p.ph)*.35;
      p.vx+=(p.hx+wob-p.x)*k;p.vy+=(p.hy-p.y)*k;
      p.vx*=.84;p.vy*=.84;p.x+=p.vx;p.y+=p.vy;
      (p.g?golds:navys).push(p);
    }
    draw(navys,NAVY);draw(golds,GOLD);
    requestAnimationFrame(frame);
  }
  function draw(arr,c,a){
    for(var i=0;i<arr.length;i++){var p=arr[i],sp=Math.min(1,Math.abs(p.vx)+Math.abs(p.vy));
      ctx.fillStyle='rgb('+c[0]+','+c[1]+','+c[2]+')';
      var s=size*(1+sp*.35);ctx.fillRect(p.x-s/2,p.y-s/2,s,s);}
  }
  function start(){if(!running&&visible){running=true;requestAnimationFrame(frame)}}
  function stop(){running=false}
  function pos(e){var r=cv.getBoundingClientRect(),pt=e.touches?e.touches[0]:e;mouse.x=pt.clientX-r.left;mouse.y=pt.clientY-r.top;mouse.on=true}
  cv.addEventListener('pointermove',pos);
  cv.addEventListener('pointerdown',pos);
  cv.addEventListener('pointerleave',function(){mouse.on=false;mouse.x=mouse.y=-9999});
  cv.addEventListener('touchmove',pos,{passive:true});
  cv.addEventListener('touchend',function(){mouse.on=false});
  function go(){build();start();}
  if(img.complete)go();else img.onload=go;
  var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(build,150)});
  if('IntersectionObserver' in window)new IntersectionObserver(function(e){visible=e[0].isIntersecting;visible?start():stop()}).observe(stage);
  document.addEventListener('visibilitychange',function(){document.hidden?stop():start()});
})();

/* ---------------- compare ---------------- */
(function(){
  if(!$('#compare'))return;
  var ROWS={
    them:[['Hands over a report','Recommendations arrive as a document, and your team is left to make them work.'],['Generic templates','Policies and processes borrowed from elsewhere rarely fit how you actually run.'],['Separate vendors for everything','Hiring, payroll and compliance handled by different people who never compare notes.'],['Success means a deliverable shipped','The project ends when the slide deck is done, whatever happens next.']],
    us:[['Stays through implementation','We roll out the policies, programmes and processes with your team.'],['Tailored to your business','Every strategy is designed around your context, culture and ambitions.'],['One partner for all six services','HR strategy, hiring, engagement, training, compliance and payroll, joined up.'],['Success means real outcomes','We measure what changes in hiring, engagement and retention.']]
  };
  var box=$('#compare'),rows=$('#cmpRows'),sw=$('#switch');
  var X=ic('<path d="M6 6l12 12M18 6 6 18"/>'),Y=ic('<path d="M5 12.5l4.5 4.5L19 7.5"/>');
  function render(m){rows.innerHTML=ROWS[m].map(function(r){return '<div class="cmp-row"><span class="cmp-ic" style="width:40px;height:40px">'+(m==='us'?Y:X).replace('<svg','<svg width="20" height="20"')+'</span><div class="cmp-txt"><h3>'+r[0]+'</h3><p>'+r[1]+'</p></div></div>'}).join('')}
  function set(m){
    $$('button',sw).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.mode===m)});
    sw.classList.toggle('us',m==='us');
    box.classList.add('swap');
    setTimeout(function(){render(m);box.classList.toggle('us',m==='us');box.classList.remove('swap')},reduce?0:220);
  }
  $$('button',sw).forEach(function(b){b.addEventListener('click',function(){set(b.dataset.mode)})});
  render('us');box.classList.add('us');sw.classList.add('us');
})();

/* ---------------- services ---------------- */

(function(){
  if(!$('#svcTabs'))return;
  var tabs=$('#svcTabs'),panel=$('#svcPanel'),cur=-1;
  SERVICES.forEach(function(s,i){
    var b=document.createElement('button');b.type='button';b.className='svc-tab';b.setAttribute('role','tab');b.id='svc-t'+i;b.setAttribute('aria-controls','svcPanel');
    b.innerHTML=s.i+'<span>'+esc(s.t)+'</span>';
    b.addEventListener('click',function(){set(i,true)});
    tabs.appendChild(b);
  });
  tabs.addEventListener('keydown',function(e){
    var k=e.key,n=SERVICES.length;
    if(['ArrowDown','ArrowRight'].indexOf(k)>-1){e.preventDefault();set((cur+1)%n,true,true)}
    if(['ArrowUp','ArrowLeft'].indexOf(k)>-1){e.preventDefault();set((cur+n-1)%n,true,true)}
  });
  function set(i,user,focus){
    if(i===cur)return;cur=i;var s=SERVICES[i];
    $$('.svc-tab',tabs).forEach(function(b,j){b.setAttribute('aria-selected',j===i);b.tabIndex=j===i?0:-1});
    var t=tabs.children[i];if(focus)t.focus();
    if(user&&innerWidth<=1100)t.scrollIntoView({block:'nearest',inline:'center',behavior:reduce?'auto':'smooth'});
    panel.setAttribute('aria-labelledby','svc-t'+i);
    panel.innerHTML='<div class="big-ic">'+s.i+'</div><h3>'+esc(s.t)+'</h3><p>'+esc(s.d)+'</p><ul class="svc-list">'+
      s.rows.map(function(r,k){return '<li style="animation-delay:'+(k*70)+'ms">'+CHECK+esc(r)+'</li>'}).join('')+
      '</ul><div class="row"><a class="btn btn-gold" href="contact.html?service='+i+'#contact" data-pick="'+i+'">Ask about '+esc(s.short.toLowerCase())+'</a><a class="btn btn-ghost" href="https://wa.me/'+WA+'?text='+encodeURIComponent('Hi, I’d like to know more about '+s.t+'.')+'" target="_blank" rel="noopener">Quick question on WhatsApp</a></div>';
    
  }
  set(Math.max(0,Math.min(5,Number(new URLSearchParams(location.search).get('service'))||0)));

})();

/* ---------------- journey board ---------------- */
(function(){
  if(!$('#board'))return;
  var STAGES=[
    {n:'Attract',s:'Invite the right people in',d:'A clear employer brand and a candidate experience that reflects who you really are, so the right people want to join.',tags:['Employer branding','Job architecture','Careers messaging'],sq:[2,0]},
    {n:'Hire',s:'Make the first decision human',d:'Structured, fair selection and executive search that find people who fit the role and the culture, then an onboarding that sticks.',tags:['Executive search','Structured interviews','Onboarding'],sq:[0,1]},
    {n:'Grow',s:'Build capability with purpose',d:'Leadership, behavioural and role-based programmes that turn potential into performance, with outcomes you can measure.',tags:['Leadership development','Upskilling','Performance systems'],sq:[2,2]},
    {n:'Reward',s:'Recognise contribution clearly',d:'Transparent payroll, competitive benefits and recognition people can understand and trust.',tags:['Compensation benchmarking','Benefits','Recognition'],sq:[0,3]},
    {n:'Retain',s:'Create a place worth staying',d:'Engagement, communication and manager enablement that give people reasons to stay and do their best work.',tags:['Engagement surveys','Manager enablement','Retention strategy'],sq:[2,4]}
  ];
  /* a true knight’s path on a 3×5 board: every stage is one knight move from the last */
  var board=$('#board'),piece=$('#piece'),card=$('#stageCard'),cur=-1,cells={};
  for(var r=0;r<3;r++)for(var c=0;c<5;c++){
    var el=document.createElement('button');el.type='button';el.className='sq'+((r+c)%2?' dk':'');el.tabIndex=-1;el.setAttribute('aria-hidden','true');
    board.insertBefore(el,$('.trail',board));cells[r+'-'+c]=el;
  }
  STAGES.forEach(function(s,i){var el=cells[s.sq[0]+'-'+s.sq[1]];el.classList.add('stop');el.removeAttribute('aria-hidden');el.tabIndex=0;
    el.setAttribute('aria-label','Stage '+(i+1)+': '+s.n);el.innerHTML='<span class="st">Stage '+(i+1)+'</span><span class="nm">'+s.n+'</span>';
    el.addEventListener('click',function(){set(i)});});
  function set(i){
    if(i<0||i>=STAGES.length||i===cur)return;cur=i;var s=STAGES[i];
    piece.style.transform='translate('+(s.sq[1]*100)+'%,'+(s.sq[0]*100)+'%)';
    piece.classList.remove('hop');void piece.offsetWidth;piece.classList.add('hop');
    STAGES.forEach(function(x,j){var el=cells[x.sq[0]+'-'+x.sq[1]];el.classList.toggle('cur',j===i);el.classList.toggle('done',j<i);el.setAttribute('aria-current',j===i?'step':'false')});
    $('#trail').setAttribute('points',STAGES.slice(0,i+1).map(function(x){return (x.sq[1]*100+50)+','+(x.sq[0]*100+50)}).join(' '));
    card.innerHTML='<div class="stage-fade"><span class="k">Stage '+(i+1)+' of 5</span><h3>'+s.n+': '+s.s.charAt(0).toLowerCase()+s.s.slice(1)+'</h3><p>'+s.d+'</p><ul>'+s.tags.map(function(t){return '<li>'+t+'</li>'}).join('')+'</ul><div class="stage-nav"><button class="round" type="button" id="jPrev" aria-label="Previous stage"'+(i===0?' disabled':'')+'><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button><button class="round" type="button" id="jNext" aria-label="Next stage"'+(i===4?' disabled':'')+'><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button><span style="margin-left:8px;color:var(--muted);font-size:14px">'+(i<4?'Next move: '+STAGES[i+1].n:'Journey complete')+'</span></div></div>';
    $('#jPrev').onclick=function(){set(cur-1)};$('#jNext').onclick=function(){set(cur+1)};
  }
  set(0);
  board.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){set(cur+1)}if(e.key==='ArrowLeft'){set(cur-1)}});
})();

/* ---------------- steps + counters on view ---------------- */
(function(){
  var steps=$('#steps'),stats=$$('#stats b');
  function count(el){var to=+el.dataset.to,suf=el.dataset.suf||'',st=null,dur=reduce?1:1400;
    function f(t){if(!st)st=t;var p=Math.min(1,(t-st)/dur),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e)+suf;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
  if(!('IntersectionObserver' in window)){if(steps)steps.classList.add('in');stats.forEach(function(b){b.textContent=b.dataset.to+(b.dataset.suf||'')});return}
  if(steps)new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){steps.classList.add('in');o.disconnect()}})},{threshold:.4}).observe(steps);
  if($('#stats'))new IntersectionObserver(function(es,o){es.forEach(function(e){if(e.isIntersecting){stats.forEach(count);o.disconnect()}})},{threshold:.4}).observe($('#stats'));
})();

/* ---------------- tools: tabs ---------------- */
(function(){
  var tabs=$$('.tabs [role=tab]');
  function sel(t){tabs.forEach(function(b){var on=b===t;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;$('#'+b.getAttribute('aria-controls')).hidden=!on})}
  tabs.forEach(function(b,i){b.addEventListener('click',function(){sel(b)});b.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();var n=tabs[(i+1)%2];sel(n);n.focus()}})});
})();

/* ---------------- tools: health check ---------------- */
var quizFocus=-1;
(function(){
  if(!$('#quiz'))return;
  var Q=[
    ['We have a written HR roadmap tied to our business goals.',0],
    ['Open roles are filled quickly with people who stay past their first year.',1],
    ['We regularly measure how engaged our people feel.',2],
    ['Managers get structured training for leading their teams.',3],
    ['Our policies, PoSH committee and labour-law filings are current.',4],
    ['Payroll runs accurately and our pay is benchmarked to the market.',5]
  ];
  var OPTS=[['Yes',2],['Partly',1],['No',0]],ans={};
  var box=$('#quiz');
  box.innerHTML='<p style="color:var(--muted);margin-bottom:20px;font-size:15px">How true is each statement for your organisation today?</p>'+Q.map(function(q,i){
    return '<div class="q" role="radiogroup" aria-labelledby="q'+i+'"><p id="q'+i+'">'+q[0]+'</p><div class="seg">'+OPTS.map(function(o){return '<label><input type="radio" name="q'+i+'" value="'+o[1]+'"><span>'+o[0]+'</span></label>'}).join('')+'</div></div>'}).join('');
  var C=578;
  box.addEventListener('change',function(e){
    var i=+e.target.name.slice(1);ans[i]=+e.target.value;
    var keys=Object.keys(ans),n=keys.length,sum=0;keys.forEach(function(k){sum+=ans[k]});
    var score=Math.round(sum/(n*2)*100);
    $('#gArc').style.strokeDashoffset=C-C*score/100;
    $('#gVal').textContent=score;
    var title,text;
    if(n<Q.length){title=(Q.length-n)+' question'+(Q.length-n>1?'s':'')+' to go';text='Your score so far is based on '+n+' of '+Q.length+' answers.'}
    else if(score>=80){title='A strong foundation';text='Your people function is in good shape. The next gains come from sharpening the areas that are only partly in place.'}
    else if(score>=50){title='Solid, with clear gaps';text='You have the basics, but a few gaps are likely costing you time, talent or risk exposure.'}
    else{title='Room for a big step forward';text='HR is probably taking more of your attention than it should. A clear plan would change that quickly.'}
    $('#gTitle').textContent=title;$('#gText').textContent=text;
    var low=keys.filter(function(k){return ans[k]<2}).sort(function(a,b){return ans[a]-ans[b]});
    var rec=$('#gRec');
    if(low.length){var s=SERVICES[Q[low[0]][1]];quizFocus=Q[low[0]][1];rec.hidden=false;rec.innerHTML='Start with <b>'+esc(s.t)+'</b>: '+esc(s.d.charAt(0).toLowerCase()+s.d.slice(1))}
    else if(n){rec.hidden=true;quizFocus=-1}
  });
  $('#gCta').addEventListener('click',function(e){if(quizFocus>-1){e.preventDefault();chooseService(quizFocus)}});
})();

/* ---------------- tools: attrition calculator ---------------- */
(function(){
  if(!$('#cEmp'))return;
  var e=$('#cEmp'),s=$('#cSal'),a=$('#cAtt'),r=$('#cRep');
  function inr(n){
    if(n>=1e7)return '₹'+(n/1e7).toFixed(n>=1e8?1:2).replace(/\.0+$/,'')+' crore';
    if(n>=1e5)return '₹'+(n/1e5).toFixed(1).replace(/\.0$/,'')+' lakh';
    return '₹'+Math.round(n).toLocaleString('en-IN');
  }
  function fill(el){el.style.setProperty('--p',((el.value-el.min)/(el.max-el.min)*100)+'%')}
  function calc(){
    [e,s,a,r].forEach(fill);
    var emp=+e.value,sal=+s.value,att=+a.value/100,rep=+r.value/100;
    var leavers=Math.round(emp*att),cost=leavers*sal*rep,save=cost*.25;
    $('#oEmp').textContent=emp.toLocaleString('en-IN')+' people';
    $('#oSal').textContent=inr(sal);
    $('#oAtt').textContent=a.value+'%';
    $('#oRep').textContent=r.value+'% of salary';
    $('#cOut').textContent=inr(cost);
    $('#cLeavers').textContent='About '+leavers.toLocaleString('en-IN')+' people leave each year at this rate.';
    $('#cSave').textContent=cost>0?'Cutting attrition by a quarter would keep roughly '+inr(save)+' a year in your business.':'';
  }
  [e,s,a,r].forEach(function(el){el.addEventListener('input',calc)});calc();
})();

/* ---------------- contact form ---------------- */
(function(){
  if(!$('#form'))return;
  var form=$('#form'),chips=$('#chips');
  chips.innerHTML=SERVICES.map(function(s,i){return '<label><input type="checkbox" name="svc" value="'+esc(s.t)+'" data-i="'+i+'"><span>'+esc(s.short)+'</span></label>'}).join('');
  chooseService=function(i){var c=$('[data-i="'+i+'"]',chips);if(c)c.checked=true};
  var selected=new URLSearchParams(location.search).get('service');
  if(selected!==null&&/^[0-5]$/.test(selected))chooseService(Number(selected));
  var via='wa';
  $$('[type=submit]',form).forEach(function(b){b.addEventListener('click',function(){via=b.dataset.via})});
  function check(id,ok){var f=$('#'+id).closest('.fi');f.classList.toggle('bad',!ok);$('#'+id).setAttribute('aria-invalid',!ok);return ok}
  $$('input,select',form).forEach(function(el){el.addEventListener('input',function(){var f=el.closest('.fi');if(f&&f.classList.contains('bad'))validate()})});
  function validate(){
    var a=check('fName',$('#fName').value.trim().length>1);
    var b=check('fEmail',/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($('#fEmail').value.trim()));
    return a&&b;
  }
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    if(!validate()){var bad=$('.fi.bad input',form);if(bad)bad.focus();toast('Check the highlighted fields, then send again.');return}
    var svc=$$('input[name=svc]:checked',chips).map(function(c){return c.value});
    var lines=['Hi Strategies Studio, I’d like to book a consultation.','','Name: '+$('#fName').value.trim()];
    if($('#fCo').value.trim())lines.push('Company: '+$('#fCo').value.trim());
    lines.push('Email: '+$('#fEmail').value.trim());
    if($('#fSize').value)lines.push('Team size: '+$('#fSize').value);
    if(svc.length)lines.push('Interested in: '+svc.join(', '));
    if($('#fMsg').value.trim())lines.push('','Details: '+$('#fMsg').value.trim());
    var body=lines.join('\n');
    var url=via==='wa'?'https://wa.me/'+WA+'?text='+encodeURIComponent(body):'mailto:'+MAIL+'?subject='+encodeURIComponent('Consultation request'+($('#fCo').value.trim()?' from '+$('#fCo').value.trim():''))+'&body='+encodeURIComponent(body);
    window.open(url,'_blank','noopener');
    toast(via==='wa'?'Your message is ready in WhatsApp. Tap send to reach us.':'Your message is ready in your email app. Hit send to reach us.');
  });
})();

/* ---------------- the studio way ---------------- */
(function(){
  if(!$('#letters'))return;
  var V=[['S','Strategic','We think beyond immediate HR problems.'],
    ['T','Trustworthy','Confidentiality, transparency and integrity guide our relationships.'],
    ['U','Understanding','We understand your business before designing your HR solution.'],
    ['D','Development-focused','We build capability in people and organisations.'],
    ['I','Impact-driven','Our focus is practical implementation and measurable progress.'],
    ['O','Ownership-led','We take responsibility from recommendation to execution.']];
  var box=$('#letters'),playBtn=$('#wayPlay'),cur=-1,timer=null,auto=!reduce,inView=false;
  box.innerHTML=V.map(function(v,i){return '<button type="button" class="lt" role="tab" id="lt'+i+'" style="--i:'+i+'" aria-selected="false" tabindex="-1"><span class="L" aria-hidden="true">'+v[0]+'</span><span class="body"><span class="word">'+v[1]+'</span><span class="desc">'+v[2]+'</span></span><span class="bar" aria-hidden="true"><i></i></span></button>'}).join('');
  var items=$$('.lt',box);
  function set(i){
    if(i===cur)return;cur=i;
    items.forEach(function(b,j){b.setAttribute('aria-selected',j===i);b.tabIndex=j===i?0:-1;var bar=$('.bar i',b);bar.style.animation='none';void bar.offsetWidth;bar.style.animation=''});
  }
  function schedule(){clearTimeout(timer);if(auto&&inView)timer=setTimeout(function(){set((cur+1)%V.length);schedule()},6000)}
  function setAuto(on){auto=on;box.classList.toggle('play',on);playBtn.textContent=on?'Pause':'Play';playBtn.setAttribute('aria-pressed',on);
    if(on){var i=cur;cur=-1;set(i)}schedule()}
  items.forEach(function(b,i){
    b.addEventListener('click',function(){set(i);setAuto(false)});
    b.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover)').matches){set(i);if(auto)setAuto(false)}});
  });
  box.addEventListener('keydown',function(e){var n=V.length,k=e.key;
    if(k==='ArrowRight'||k==='ArrowDown'){e.preventDefault();set((cur+1)%n);items[cur].focus();setAuto(false)}
    if(k==='ArrowLeft'||k==='ArrowUp'){e.preventDefault();set((cur+n-1)%n);items[cur].focus();setAuto(false)}});
  playBtn.addEventListener('click',function(){setAuto(!auto)});
  if(reduce){playBtn.hidden=true}
  set(0);box.classList.toggle('play',auto);
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){inView=es[0].isIntersecting;
      if(inView&&!box.classList.contains('in')){box.classList.add('in');setTimeout(function(){box.classList.add('settled')},1800)}
      schedule()},{threshold:.3}).observe(box);
  }else{box.classList.add('in','settled')}
})();

/* ---------------- why we exist reveal ---------------- */
(function(){
  if(!$('#why'))return;
  var w=$('#why');
  if(!('IntersectionObserver' in window)||reduce){w.classList.add('in');return}
  new IntersectionObserver(function(es,o){if(es[0].isIntersecting){w.classList.add('in');o.disconnect()}},{threshold:.25}).observe(w);
})();

$('#yr').textContent=new Date().getFullYear();
})();
