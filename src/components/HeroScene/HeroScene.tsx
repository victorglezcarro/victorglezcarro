import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export default function HeroScene({ paused }: { paused: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(paused);
  useEffect(() => { pauseRef.current = paused; }, [paused]);

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    host.classList.remove('scene-failed');
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      host.classList.add('scene-failed');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 8.9);
    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environmentMap = pmrem.fromScene(environment, 0.04);
    scene.environment = environmentMap.texture;
    environment.dispose();
    pmrem.dispose();

    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.TorusKnotGeometry(1.15, 0.43, 240, 40, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xc6d99d, metalness: 1, roughness: 0.19, clearcoat: 1,
      clearcoatRoughness: 0.16, envMapIntensity: 1.6,
    });
    const knot = new THREE.Mesh(geometry, material);
    knot.rotation.set(0.1, 0.1, -0.5);
    group.add(knot);

    const orbitGeometry = new THREE.TorusGeometry(2.38, 0.008, 8, 160);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xd5f36b, transparent: true, opacity: 0.46 });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.set(1.0, -0.6, 0.2);
    group.add(orbit);
    const orbitTwo = new THREE.Mesh(orbitGeometry, new THREE.MeshBasicMaterial({ color: 0xc8d1c1, transparent: true, opacity: 0.13 }));
    orbitTwo.rotation.set(-0.5, 0.5, 0.8);
    orbitTwo.scale.setScalar(1.08);
    group.add(orbitTwo);
    const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 20), new THREE.MeshBasicMaterial({ color: 0xd5f36b }));
    orbit.add(satellite);
    satellite.position.x = 2.38;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.PointLight(0xd5f36b, 50, 20);
    light.position.set(2, 2, 3);
    scene.add(light);
    const whiteLight = new THREE.DirectionalLight(0xffffff, 4);
    whiteLight.position.set(-3, 2, 4);
    scene.add(whiteLight);

    let pointerX = 0;
    let pointerY = 0;
    let visible = true;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let needsRender = true;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPointerMove = (event: PointerEvent) => {
      if (media.matches || pauseRef.current) return;
      const rect = host.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.65;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.4;
    };
    const onPointerLeave = () => { pointerX = 0; pointerY = 0; };
    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);

    const resize = new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      needsRender = true;
    });
    resize.observe(host);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(host);
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      if (!visible || document.hidden) return;
      const animate = !pauseRef.current && !media.matches;
      if (animate) {
        elapsed += delta;
        knot.rotation.y = elapsed * 0.14 + 0.1;
        knot.rotation.x = Math.sin(elapsed * 0.15) * 0.18 + 0.1;
        group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointerX, 0.035);
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointerY, 0.035);
        group.position.y = Math.sin(elapsed * 0.7) * 0.09;
        satellite.position.set(Math.cos(elapsed * 0.25) * 2.38, Math.sin(elapsed * 0.25) * 2.38, 0);
      }
      if (animate || needsRender) { renderer.render(scene, camera); needsRender = false; }
    };
    frame = requestAnimationFrame(draw);
    const onContextLost = (event: Event) => { event.preventDefault(); host.classList.add('scene-failed'); cancelAnimationFrame(frame); };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      geometry.dispose(); material.dispose(); orbitGeometry.dispose(); orbitMaterial.dispose();
      orbitTwo.material.dispose(); satellite.geometry.dispose(); satellite.material.dispose();
      environmentMap.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-canvas" ref={container} aria-hidden="true">
    <div className="scene-fallback"><div /><div /><div /></div>
  </div>;
}
