'use client';
import {useEffect,useRef} from 'react';
import * as THREE from 'three';

const vertexShader=`
attribute float aSize;
attribute float aSeed;
uniform float uTime;
uniform float uPixel;
uniform float uProgress;
uniform vec2 uPointer;
varying float vSeed;
varying float vDepth;
varying float vLight;
void main(){
 vec3 p=position;
 float t=uTime*.25;
 p.x+=sin(p.y*1.5+t+aSeed*.5)*.17;
 p.y+=sin(p.x*1.35-t)*.24;
 p.z+=sin(p.x*1.2+p.y*.8+t)*.3;
 float d=length(p.xy-uPointer*vec2(4.,2.8));
 p.z+=exp(-d*d*.6)*.65;
 p.x+=sin(uProgress*.7+p.y)*uProgress*.07;
 vec4 mv=modelViewMatrix*vec4(p,1.);
 vSeed=aSeed;vDepth=-mv.z;
 vLight=.5+.5*sin(p.x*1.6+p.y*1.8+p.z*.9+t);
 float focus=abs(vDepth-10.5)*.25;
 gl_PointSize=clamp((aSize+focus*.025)*uPixel*650./-mv.z,1.,40.);
 gl_Position=projectionMatrix*mv;
}`;
const fragmentShader=`
precision highp float;
varying float vSeed;
varying float vDepth;
varying float vLight;
void main(){
 vec2 uv=gl_PointCoord*2.-1.;float r=dot(uv,uv);if(r>1.)discard;
 float z=sqrt(1.-r);
 vec3 normal=vec3(uv.x,-uv.y,z);
 float diffuse=max(dot(normal,normalize(vec3(-.5,.7,1.))),0.);
 float spec=pow(max(dot(normal,normalize(vec3(-.3,.45,1.))),0.),22.);
 float edge=smoothstep(1.,.65,r);
 float depth=clamp(1.-(vDepth-7.)*.065,.2,1.);
 vec3 base=mix(vec3(.16,.21,.23),vec3(.59,.7,.73),vLight);
 vec3 color=base*(.3+diffuse*.65)+vec3(.72,.87,.88)*spec*(.25+pow(vLight,9.)*2.);
 color+=vec3(.65,.85,.85)*pow(vLight,18.)*.32;
 gl_FragColor=vec4(color*depth,edge*.88);
}`;
export default function World({variant,paused,onReady}:{variant:number;paused:boolean;onReady:()=>void}){
 const host=useRef<HTMLDivElement>(null);const state=useRef({variant,paused});state.current={variant,paused};
 useEffect(()=>{
  const node=host.current;if(!node)return;
  const mobile=innerWidth<700;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({antialias:false,alpha:false,powerPreference:mobile?'low-power':'high-performance'});}catch{onReady();return;}
  renderer.setClearColor(0x080b0d);renderer.setSize(innerWidth,innerHeight);const pixel=Math.min(devicePixelRatio,mobile?1.25:1.6);renderer.setPixelRatio(pixel);node.appendChild(renderer.domElement);
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,60);camera.position.z=11;
  let seed=713;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
  const count=mobile?23000:62000;const positions=new Float32Array(count*3),sizes=new Float32Array(count),seeds=new Float32Array(count);
  for(let i=0;i<count;i++){
   const u=(random()-.5)*2,v=(random()-.5)*2;
   // A folded liquid sheet, with a curled crest and droplets peeling off its edges.
   const angle=v*2.5+u*.8;
   const radius=1.5+Math.sin(u*3.8)*.6;
   let x=u*4.8+Math.sin(angle)*.6;
   let y=Math.sin(angle)*radius+Math.sin(u*3.4)*1.15;
   let z=Math.cos(angle)*radius+Math.cos(u*4.5)*.65;
   const spray=random();
   if(spray>.86){const spread=(spray-.86)*15;x+=(random()-.5)*spread*2;y+=(random()-.5)*spread*2;z+=(random()-.5)*spread*3;}
   const twist=u*.52;const yy=y*Math.cos(twist)-z*Math.sin(twist);z=y*Math.sin(twist)+z*Math.cos(twist);y=yy;
   positions.set([x,y,z],i*3);sizes[i]=.025+Math.pow(random(),4)*.105;seeds[i]=random()*6.28;
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setAttribute('aSize',new THREE.BufferAttribute(sizes,1));geometry.setAttribute('aSeed',new THREE.BufferAttribute(seeds,1));
  const uniforms={uTime:{value:0},uPixel:{value:pixel},uProgress:{value:0},uPointer:{value:new THREE.Vector2(10,10)}};
  const material=new THREE.ShaderMaterial({vertexShader,fragmentShader,uniforms,transparent:true,depthWrite:false,blending:THREE.NormalBlending});
  const water=new THREE.Points(geometry,material);water.rotation.set(.1,-.18,-.2);scene.add(water);
  // Sparse, larger bokeh droplets sit in front of and behind the main surface.
  const sprayGeometry=new THREE.BufferGeometry();const sprayPositions=new Float32Array(240*3),spraySizes=new Float32Array(240),spraySeeds=new Float32Array(240);
  for(let i=0;i<240;i++){sprayPositions.set([(random()-.5)*19,(random()-.5)*11,(random()-.5)*9],i*3);spraySizes[i]=.015+random()*.07;spraySeeds[i]=random()*6;}
  sprayGeometry.setAttribute('position',new THREE.BufferAttribute(sprayPositions,3));sprayGeometry.setAttribute('aSize',new THREE.BufferAttribute(spraySizes,1));sprayGeometry.setAttribute('aSeed',new THREE.BufferAttribute(spraySeeds,1));scene.add(new THREE.Points(sprayGeometry,material));
  const pointer=new THREE.Vector2();let interacting=false;
  const move=(e:PointerEvent)=>{if(reduced.matches||e.pointerType==='touch')return;pointer.set(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2);interacting=true;};
  const resize=()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();};
  window.addEventListener('pointermove',move,{passive:true});window.addEventListener('resize',resize);
  let raf=0,last=performance.now(),time=0,progress=0,ready=false;
  const render=(now:number)=>{
   raf=requestAnimationFrame(render);const dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden)return;
   if(!state.current.paused&&!reduced.matches)time+=dt;
   progress+=(scrollY/Math.max(innerHeight,1)-progress)*(reduced.matches?1:1-Math.exp(-dt*4));
   uniforms.uTime.value=time;uniforms.uProgress.value=progress;
   if(interacting)uniforms.uPointer.value.lerp(pointer,.05);
   const isMobile=innerWidth<700;
   camera.position.z=(isMobile?15:11)-Math.min(progress,4)*.7;
   camera.position.x+=(pointer.x*.35-camera.position.x)*.035;camera.position.y+=(pointer.y*.2-camera.position.y)*.035;camera.lookAt(0,.25,0);
   water.rotation.y=-.18+Math.sin(time*.1)*.12+progress*.25+state.current.variant*.14;
   water.rotation.z=-.2+Math.sin(time*.08)*.05+progress*.08;
   water.position.y=isMobile?1.1:.6;
   renderer.render(scene,camera);if(!ready){ready=true;onReady();}
  };raf=requestAnimationFrame(render);
  return()=>{cancelAnimationFrame(raf);window.removeEventListener('pointermove',move);window.removeEventListener('resize',resize);geometry.dispose();sprayGeometry.dispose();material.dispose();renderer.dispose();node.removeChild(renderer.domElement);};
 },[onReady]);
 return <div ref={host} className="world" aria-hidden="true"/>;
}
