"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function RevolvingTable() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    const stage: HTMLDivElement = host;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    host.appendChild(renderer.domElement);

    const mat = {
      desk: new THREE.MeshStandardMaterial({
        color: 0x1c1c22,
        roughness: 0.38,
        metalness: 0.22,
      }),
      steel: new THREE.MeshStandardMaterial({
        color: 0x4a4a52,
        roughness: 0.32,
        metalness: 0.62,
      }),
      screen: new THREE.MeshStandardMaterial({
        color: 0x9bb4d4,
        emissive: 0x334866,
        emissiveIntensity: 0.55,
        roughness: 0.2,
        metalness: 0.1,
      }),
      paper: new THREE.MeshStandardMaterial({
        color: 0xd8dde6,
        roughness: 0.82,
        metalness: 0,
      }),
      accent: new THREE.MeshStandardMaterial({
        color: 0x2f6fdb,
        roughness: 0.45,
        metalness: 0.2,
      }),
    };

    const disposables: THREE.BufferGeometry[] = [];
    const group = new THREE.Group();

    function mesh(
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      x: number,
      y: number,
      z: number,
    ) {
      disposables.push(geometry);
      const item = new THREE.Mesh(geometry, material);
      item.position.set(x, y, z);
      item.castShadow = true;
      item.receiveShadow = true;
      group.add(item);
      return item;
    }

    mesh(new THREE.BoxGeometry(4.4, 0.1, 2.05), mat.desk, 0, 1.08, 0);
    mesh(new THREE.BoxGeometry(0.09, 1.06, 0.09), mat.steel, -2.0, 0.53, 0.88);
    mesh(new THREE.BoxGeometry(0.09, 1.06, 0.09), mat.steel, 2.0, 0.53, 0.88);
    mesh(new THREE.BoxGeometry(0.09, 1.06, 0.09), mat.steel, -2.0, 0.53, -0.88);
    mesh(new THREE.BoxGeometry(0.09, 1.06, 0.09), mat.steel, 2.0, 0.53, -0.88);

    mesh(new THREE.BoxGeometry(1.55, 0.95, 0.07), mat.steel, -0.55, 1.78, -0.42);
    mesh(new THREE.BoxGeometry(1.4, 0.8, 0.03), mat.screen, -0.55, 1.78, -0.37);
    mesh(new THREE.BoxGeometry(0.18, 0.42, 0.16), mat.steel, -0.55, 1.22, -0.4);

    const lampArm = mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 1.15, 16),
      mat.steel,
      1.15,
      1.9,
      -0.15,
    );
    lampArm.rotation.z = 0.55;
    mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.18, 24), mat.desk, 1.55, 2.28, -0.12);
    mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 24), mat.steel, 0.85, 1.14, 0.1);

    const canvas = mesh(new THREE.BoxGeometry(0.72, 1.05, 0.04), mat.paper, 1.72, 1.78, -0.55);
    canvas.rotation.y = -0.35;
    const easel = mesh(new THREE.BoxGeometry(0.05, 1.4, 0.05), mat.desk, 1.55, 1.55, -0.62);
    easel.rotation.z = 0.18;

    mesh(new THREE.BoxGeometry(0.55, 0.04, 0.38), mat.paper, 0.35, 1.16, 0.35);
    mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.32, 18), mat.accent, -1.55, 1.28, 0.45);

    const chairSeat = mesh(new THREE.BoxGeometry(0.85, 0.08, 0.82), mat.desk, 0.2, 0.62, 1.35);
    chairSeat.rotation.y = 0.2;
    const chairBack = mesh(new THREE.BoxGeometry(0.85, 0.9, 0.08), mat.desk, 0.05, 1.05, 1.7);
    chairBack.rotation.y = 0.2;

    const racket = mesh(
      new THREE.TorusGeometry(0.34, 0.035, 12, 32),
      mat.accent,
      1.85,
      0.72,
      1.05,
    );
    racket.rotation.x = 1.15;
    racket.rotation.z = -0.4;
    mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.55, 12), mat.desk, 1.95, 0.38, 1.22);

    scene.add(group);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(8, 64),
      new THREE.MeshStandardMaterial({
        color: 0x09090c,
        roughness: 1,
        metalness: 0,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    disposables.push(floor.geometry);

    scene.add(new THREE.HemisphereLight(0xd7e2ee, 0x121218, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3.2, 7.5, 4.2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const bounce = new THREE.DirectionalLight(0x9bb7ff, 0.85);
    bounce.position.set(-5, 3.2, 2);
    scene.add(bounce);
    const fill = new THREE.PointLight(0x8eb4ff, 22, 20);
    fill.position.set(-2.2, 3.4, 2.8);
    scene.add(fill);

    let frame = 0;
    let live = true;
    let angle = 0.55;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function sizeToMount() {
      const width = Math.max(stage.clientWidth, 1);
      const height = Math.max(stage.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    function placeCamera() {
      camera.position.set(
        Math.sin(angle) * 5.4,
        2.35,
        Math.cos(angle) * 5.4,
      );
      camera.lookAt(0.15, 1.15, 0);
    }

    function tick() {
      if (!live) return;
      if (!reduceMotion) angle += 0.0038;
      placeCamera();
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(tick);
    }

    sizeToMount();
    placeCamera();
    tick();
    window.addEventListener("resize", sizeToMount);

    return () => {
      live = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", sizeToMount);
      renderer.dispose();
      disposables.forEach((geometry) => geometry.dispose());
      Object.values(mat).forEach((material) => material.dispose());
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="table-stage" aria-hidden="true" ref={mountRef} />;
}
