"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene ─────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.04);

    const camera = new THREE.PerspectiveCamera(
      70,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // ── Lights ────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Primary cursor-reactive cyan point light
    const cyanLight = new THREE.PointLight(0x06b6d4, 6, 25);
    cyanLight.position.set(4, 3, 6);
    scene.add(cyanLight);

    // Purple accent
    const purpleLight = new THREE.PointLight(0x7c3aed, 4, 20);
    purpleLight.position.set(-4, -3, 4);
    scene.add(purpleLight);

    // Green fill
    const greenLight = new THREE.PointLight(0x10b981, 2.5, 15);
    greenLight.position.set(0, -5, 2);
    scene.add(greenLight);

    // ── Holographic Grid Plane ─────────────────────────────────
    const gridGeo = new THREE.PlaneGeometry(30, 30, 30, 30);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2.5;
    grid.position.y = -5;
    scene.add(grid);

    // ── Instanced Particle Field ───────────────────────────────
    const PARTICLE_COUNT = 4500;
    const instancedGeo = new THREE.SphereGeometry(0.012, 4, 4);
    const instancedMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.75,
    });
    const instancedMesh = new THREE.InstancedMesh(
      instancedGeo,
      instancedMat,
      PARTICLE_COUNT
    );

    const particlePositions: THREE.Vector3[] = [];
    const dummy = new THREE.Object3D();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.6,
        r * Math.cos(phi)
      );
      particlePositions.push(pos);
      const scale = 0.5 + Math.random() * 1.5;
      dummy.position.copy(pos);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    scene.add(instancedMesh);

    // ── Wireframe Core Icosahedron ─────────────────────────────
    const sphereGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      emissive: new THREE.Color(0x06b6d4),
      emissiveIntensity: 0.8,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // ── Inner Solid Icosahedron (glow core) ────────────────────
    const innerGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.15,
      emissive: new THREE.Color(0x00f5ff),
      emissiveIntensity: 1.5,
      side: THREE.FrontSide,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // ── DNA Helix Ribbons ──────────────────────────────────────
    const helixGroup = new THREE.Group();
    const HELIX_POINTS = 120;
    for (let strand = 0; strand < 2; strand++) {
      const points: THREE.Vector3[] = [];
      const phaseOffset = strand * Math.PI;
      for (let i = 0; i < HELIX_POINTS; i++) {
        const t = (i / HELIX_POINTS) * Math.PI * 4;
        const radius = 2.2;
        points.push(
          new THREE.Vector3(
            Math.cos(t + phaseOffset) * radius,
            (i / HELIX_POINTS) * 8 - 4,
            Math.sin(t + phaseOffset) * radius
          )
        );
      }
      const helixCurve = new THREE.CatmullRomCurve3(points);
      const helixGeo = new THREE.TubeGeometry(helixCurve, 120, 0.018, 6, false);
      const helixMat = new THREE.MeshPhongMaterial({
        color: strand === 0 ? 0x06b6d4 : 0x7c3aed,
        transparent: true,
        opacity: 0.55,
        emissive: new THREE.Color(strand === 0 ? 0x06b6d4 : 0x7c3aed),
        emissiveIntensity: 0.6,
      });
      helixGroup.add(new THREE.Mesh(helixGeo, helixMat));
    }
    // Cross-bridges between strands
    for (let i = 0; i < 24; i++) {
      const t = (i / 24) * Math.PI * 4;
      const radius = 2.2;
      const y = (i / 24) * 8 - 4;
      const bridgePoints = [
        new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius),
        new THREE.Vector3(Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius),
      ];
      const bridgeGeo = new THREE.BufferGeometry().setFromPoints(bridgePoints);
      const bridgeMat = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.3,
      });
      helixGroup.add(new THREE.Line(bridgeGeo, bridgeMat));
    }
    helixGroup.position.set(3.5, 0, -2);
    helixGroup.scale.setScalar(0.7);
    scene.add(helixGroup);

    // ── Orbit Rings ────────────────────────────────────────────
    const ringConfigs = [
      { radius: 2.8, color: 0x06b6d4, speed: 0.25, tilt: 0.4 },
      { radius: 3.8, color: 0x7c3aed, speed: -0.15, tilt: 1.1 },
      { radius: 5.0, color: 0x10b981, speed: 0.1, tilt: 1.7 },
    ];
    const rings = ringConfigs.map(({ radius, color, tilt }) => {
      const geo = new THREE.TorusGeometry(radius, 0.006, 12, 120);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = tilt;
      scene.add(ring);
      return ring;
    });

    // ── Floating Data Cubes ────────────────────────────────────
    const cubeConfigs = [
      { pos: [-4, 2, -1], color: 0x06b6d4, scale: 0.18 },
      { pos: [5, -2, -2], color: 0x7c3aed, scale: 0.14 },
      { pos: [-3, -3, 0], color: 0x10b981, scale: 0.12 },
      { pos: [4, 3, -3], color: 0xf59e0b, scale: 0.10 },
    ];
    const cubes = cubeConfigs.map(({ pos, color, scale }) => {
      const geo = new THREE.BoxGeometry(1, 1, 1);
      const mat = new THREE.MeshPhongMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.5,
      });
      const cube = new THREE.Mesh(geo, mat);
      cube.position.set(...(pos as [number, number, number]));
      cube.scale.setScalar(scale);
      scene.add(cube);
      return cube;
    });

    // ── Mouse Tracking ─────────────────────────────────────────
    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ── Resize Handler ─────────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── Animation Loop ─────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse interpolation
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.04;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.04;

      // Cursor-reactive lights
      cyanLight.position.x = smoothMouseX * 5 + 4;
      cyanLight.position.y = -smoothMouseY * 4 + 3;
      cyanLight.intensity = 5 + Math.sin(t * 1.5) * 1.5;

      purpleLight.position.x = -smoothMouseX * 3 - 4;
      purpleLight.position.y = smoothMouseY * 3 - 2;

      // Particle field slow drift
      instancedMesh.rotation.y = t * 0.04;
      instancedMesh.rotation.x = Math.sin(t * 0.015) * 0.08;

      // Core sphere oscillation
      sphere.rotation.y = t * 0.28;
      sphere.rotation.x = t * 0.09;
      sphere.scale.setScalar(1 + Math.sin(t * 1.8) * 0.03);

      innerSphere.rotation.y = -t * 0.5;
      innerSphere.rotation.z = t * 0.3;
      innerSphere.scale.setScalar(1 + Math.sin(t * 2.5) * 0.08);

      // DNA helix slow rotation
      helixGroup.rotation.y = t * 0.12;

      // Ring rotation
      rings.forEach((ring, i) => {
        ring.rotation.z = t * ringConfigs[i].speed;
        ring.rotation.y = t * ringConfigs[i].speed * 0.3;
      });

      // Cube spin
      cubes.forEach((cube, i) => {
        cube.rotation.x = t * (0.4 + i * 0.15);
        cube.rotation.y = t * (0.3 + i * 0.1);
        cube.position.y =
          cubeConfigs[i].pos[1] + Math.sin(t * 0.8 + i * 1.3) * 0.3;
      });

      // Grid pulse
      (gridMat as THREE.MeshBasicMaterial).opacity =
        0.05 + Math.sin(t * 0.5) * 0.025;

      // Camera slow cinema pan + mouse parallax
      camera.position.x +=
        (smoothMouseX * 0.6 - camera.position.x) * 0.025;
      camera.position.y +=
        (-smoothMouseY * 0.5 + Math.sin(t * 0.15) * 0.3 - camera.position.y) *
        0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
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
