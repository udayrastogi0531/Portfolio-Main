"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene Setup ──────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Lights ───────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 30);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 1.5, 30);
    purpleLight.position.set(-5, -5, -5);
    scene.add(purpleLight);

    // ── Neural Particles ─────────────────────────────────────
    const PARTICLE_COUNT = 3000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.025,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Wireframe Core Sphere ────────────────────────────────
    const sphereGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      emissive: new THREE.Color(0x06b6d4),
      emissiveIntensity: 0.5,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // ── Floating Rings ───────────────────────────────────────
    const ringConfigs = [
      { radius: 2.5, color: 0x06b6d4, speed: 0.3,  tilt: 0.5 },
      { radius: 3.2, color: 0x7c3aed, speed: -0.2, tilt: 1.0 },
      { radius: 4.0, color: 0x10b981, speed: 0.15, tilt: 1.5 },
    ];

    const rings = ringConfigs.map(({ radius, color, tilt }) => {
      const geo = new THREE.TorusGeometry(radius, 0.008, 16, 100);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = tilt;
      scene.add(ring);
      return ring;
    });

    // ── Mouse Interaction ────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ── Resize Handler ───────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── Animation Loop ───────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Particles drift
      particles.rotation.y = t * 0.05;
      particles.rotation.x = Math.sin(t * 0.02) * 0.1;

      // Sphere spin
      sphere.rotation.y = t * 0.3;
      sphere.rotation.x = t * 0.1;

      // Rings spin
      rings.forEach((ring, i) => {
        ring.rotation.z = t * ringConfigs[i].speed;
      });

      // Subtle camera reaction to mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose geometries and materials
      particleGeo.dispose();
      particleMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}
