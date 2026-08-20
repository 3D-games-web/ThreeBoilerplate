"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function ArrowUpRight() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

function OrbitalScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.2, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    // @ts-ignore
    if ((THREE as any).SRGBColorSpace) renderer.outputColorSpace = (THREE as any).SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const coreMaterial = new THREE.MeshPhysicalMaterial({ color: "#c5ff30", roughness: 0.2, metalness: 0.3, clearcoat: 0.6 });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 3), coreMaterial);
    root.add(core);

    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.75, 1), new THREE.MeshBasicMaterial({ color: "#f0ffca", wireframe: true, transparent: true, opacity: 0.18 }));
    root.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: "#d8ff62", transparent: true, opacity: 0.6, side: THREE.DoubleSide });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.016, 8, 150), ringMaterial);
    ringA.rotation.x = 1.17; ringA.rotation.y = 0.24; root.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.016, 8, 150), ringMaterial);
    ringB.rotation.x = 0.7; ringB.rotation.y = -0.5; root.add(ringB);

    const starGeo = new THREE.BufferGeometry();
    const count = 520;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 1;
      positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: "#e2ff83", size: 0.03, transparent: true, opacity: 0.72 }));
    scene.add(stars);

    scene.add(new THREE.AmbientLight(0xb4ff55, 1.0));
    const key = new THREE.DirectionalLight(0xffffff, 3.0); key.position.set(3, 4, 5); scene.add(key);
    const fill = new THREE.PointLight(0x89c6ff, 12, 20); fill.position.set(-4, -1, 3); scene.add(fill);

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    mount.addEventListener("pointermove", onPointer);

    const resize = () => {
      const w = mount.clientWidth; const h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    const obs = new ResizeObserver(resize); obs.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!paused) {
        root.rotation.y = t * 0.24 + pointer.x * 0.25;
        root.rotation.x = Math.sin(t * 0.45) * 0.12 + pointer.y * 0.12;
        core.rotation.z = t * 0.08;
        wire.rotation.z = -t * 0.18;
        stars.rotation.y = t * 0.02;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      mount.removeEventListener("pointermove", onPointer);
      mount.removeChild(renderer.domElement);
      core.geometry.dispose(); coreMaterial.dispose();
      wire.geometry.dispose(); (wire.material as THREE.Material).dispose();
      ringA.geometry.dispose(); ringB.geometry.dispose();
      starGeo.dispose(); (stars.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [paused]);

  return (
    <div className="scene-shell">
      <div ref={mountRef} className="scene" aria-label="Animated 3D sculpture" />
      <button className="scene-toggle" onClick={() => setPaused(v => !v)} aria-label={paused ? "Resume animation" : "Pause animation"}>
        {paused ? "Play" : "Pause"}
      </button>
      <div className="scene-caption"><span className="live-dot" /> LIVE / WEBGL 01</div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav">
          <a className="brand" href="#top">VANTA<span>®</span></a>
          <div className="nav-links"><a href="#work">Selected work</a><a href="#about">About</a></div>
          <a href="mailto:hello@vanta.studio" className="contact-link">Start a project <ArrowUpRight /></a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Independent digital studio / 2025</p>
            <h1>Ideas with<br /><em>dimension.</em></h1>
            <p className="intro">We build immersive identities, digital worlds and unforgettable interactions for brands moving at the speed of culture.</p>
            <a className="primary-button" href="#work">Explore the space <ArrowUpRight /></a>
          </div>
          <OrbitalScene />
        </div>

        <div className="hero-footer"><span>Scroll to explore</span><span className="scroll-line" /><span>01 — 04</span></div>
      </section>

      <section className="statement" id="about">
        <p className="eyebrow">What we do</p>
        <h2>We make the digital<br />world feel <em>physical.</em></h2>
        <p>Vanta is a creative technology studio for the next generation of brands. We pair sharp strategy with sensorial design to make work people want to step inside.</p>
      </section>
    </main>
  );
}
