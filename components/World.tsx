'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function World({ variant, paused, onReady }: { variant: number; paused: boolean; onReady: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const settings = useRef({ variant, paused });
  settings.current = { variant, paused };
  useEffect(() => {
    if (!host.current) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: window.innerWidth > 700, alpha: true, powerPreference: 'high-performance' }); }
    catch { onReady(); return; }
    const node = host.current;
    renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 700 ? 1.25 : 1.7));
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    node.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, innerWidth / innerHeight, 0.1, 100);
    camera.position.set(0, 0, 12);
    const env = document.createElement('canvas'); env.width = 2048; env.height = 1024;
    const ctx = env.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#e7ebed'); grad.addColorStop(.35, '#faf9f5'); grad.addColorStop(.49, '#b5b8ba'); grad.addColorStop(.53, '#22262c'); grad.addColorStop(.7, '#676c73'); grad.addColorStop(1, '#deded5');
    ctx.fillStyle = grad; ctx.fillRect(0,0,2048,1024);
    for (const x of [100, 760, 1400]) { ctx.fillStyle = '#ffffff'; ctx.fillRect(x,70,100,650); ctx.fillStyle='#16191e'; ctx.fillRect(x+120,0,160,1024); }
    const texture = new THREE.CanvasTexture(env); texture.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(renderer); const target = pmrem.fromEquirectangular(texture); scene.environment = target.texture;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 2));
    const key = new THREE.DirectionalLight(0xffffff, 5); key.position.set(-3,5,4); scene.add(key);
    const amber = new THREE.PointLight(0xe4ad18, 20, 12); amber.position.set(2,-2,2); scene.add(amber);
    const sculpture = new THREE.Group(); scene.add(sculpture);
    const metal = new THREE.MeshStandardMaterial({ color: 0xc8cdd2, metalness: 1, roughness: .19, envMapIntensity: 1.8 });
    const geometry = new THREE.TorusKnotGeometry(1.65, .48, innerWidth < 700 ? 160 : 260, 32, 2, 3);
    const knot = new THREE.Mesh(geometry, metal); sculpture.add(knot);
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(.7,4),new THREE.MeshPhysicalMaterial({color:0xe4ad18,metalness:.35,roughness:.25,clearcoat:1})); sculpture.add(inner);
    const orbit = new THREE.Group(); sculpture.add(orbit);
    const rings: THREE.Mesh[] = [];
    for(let i=0;i<3;i++) {const ring = new THREE.Mesh(new THREE.TorusGeometry(2.55+i*.19,.016,8,160),metal);ring.rotation.set(.8+i*.4,.3+i*.7,.1);orbit.add(ring);rings.push(ring);}
    orbit.visible=false;
    const points = new Float32Array(120*3);
    for(let i=0;i<120;i++){points[i*3]=Math.sin(i*127.1)*14;points[i*3+1]=Math.cos(i*311.7)*8;points[i*3+2]=-4-Math.abs(Math.sin(i))*8;}
    const dustGeometry = new THREE.BufferGeometry(); dustGeometry.setAttribute('position',new THREE.BufferAttribute(points,3));
    const dust = new THREE.Points(dustGeometry,new THREE.PointsMaterial({color:0x6e6d64,size:.018,transparent:true,opacity:.35}));scene.add(dust);
    const pointer = new THREE.Vector2();
    const move = (e: PointerEvent) => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) pointer.set(e.clientX/innerWidth*2-1,e.clientY/innerHeight*2-1); };
    const resize = () => {camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);};
    window.addEventListener('pointermove',move);window.addEventListener('resize',resize);
    let raf=0, progress=0, time=0, previous=performance.now(), frames=0, elapsed=0;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const render = (now:number) => {
      raf=requestAnimationFrame(render);
      const dt=Math.min((now-previous)/1000,.05);previous=now;
      if(document.hidden)return;
      if(!settings.current.paused&&!motion.matches)time+=dt;
      const wanted=window.scrollY/Math.max(innerHeight,1);
      progress+= (wanted-progress)*(motion.matches?1:1-Math.exp(-dt*5));
      const mobile=innerWidth<700;
      const chapter=Math.min(progress/1.12,5);
      const shift = chapter<1 ? 1.9-chapter*3.3 : chapter<2 ? -1.4+(chapter-1)*2.5 : Math.sin(chapter*1.7)*1.5;
      sculpture.position.set(mobile?.15:shift, mobile?1.25: .15+Math.sin(chapter*1.5)*.3, 0);
      sculpture.rotation.set(.2+chapter*.35+pointer.y*.045, -.4+chapter*.7+time*.055+pointer.x*.09, -.35+Math.sin(chapter)*.4);
      const scale=mobile?.60:1; sculpture.scale.setScalar(scale*(1+Math.sin(chapter*1.3)*.12));
      knot.rotation.z = time*.025+settings.current.variant*.5;
      knot.scale.lerp(new THREE.Vector3(settings.current.variant===1?.78:1,settings.current.variant===2?1.3:1,1),.04);
      inner.scale.setScalar(.8+Math.sin(time*.7)*.06);
      orbit.visible=chapter>1.6||settings.current.variant>0;orbit.rotation.y=time*.07;
      camera.position.x+=(pointer.x*.18-camera.position.x)*.035;
      camera.position.y+=(-pointer.y*.12-camera.position.y)*.035;
      camera.position.z=mobile?13:12-Math.sin(chapter*.8)*1.2;
      camera.lookAt(0,0,0);
      amber.position.x=2+pointer.x*2;amber.intensity=15+Math.sin(chapter)*10;
      renderer.render(scene,camera);
      if(frames===0)onReady();
      frames++;elapsed+=dt;
      if(frames===100&&elapsed>3)renderer.setPixelRatio(1);
    };
    raf=requestAnimationFrame(render);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('pointermove',move);window.removeEventListener('resize',resize);geometry.dispose();metal.dispose();inner.geometry.dispose();(inner.material as THREE.Material).dispose();rings.forEach(r=>r.geometry.dispose());dustGeometry.dispose();(dust.material as THREE.Material).dispose();target.dispose();texture.dispose();pmrem.dispose();renderer.dispose();node.removeChild(renderer.domElement);};
  }, [onReady]);
  return <div ref={host} className="world" aria-hidden="true" />;
}

