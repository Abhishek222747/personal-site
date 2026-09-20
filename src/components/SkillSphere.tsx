"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const RADIUS = 148;

export function SkillSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const surface: HTMLCanvasElement = el;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const raw = surface.getContext("2d");
    if (!raw) return;
    const context: CanvasRenderingContext2D = raw;

    const words = [...site.skills];
    const phi = Math.PI * (3 - Math.sqrt(5));
    const points = words.map((label, index) => {
      const y = 1 - (index / (words.length - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * index;
      return {
        label,
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
      };
    });

    let angleX = 0.18;
    let angleY = 0.4;
    let targetX = 0.18;
    let targetY = 0.4;
    let frame = 0;
    let running = true;

    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = surface.clientWidth;
      const height = surface.clientHeight;
      surface.width = width * dpr;
      surface.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rotate(point: { x: number; y: number; z: number }, ax: number, ay: number) {
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const x1 = point.x * cosY + point.z * sinY;
      const z1 = point.z * cosY - point.x * sinY;
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const y1 = point.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + point.y * sinX;
      return { x: x1, y: y1, z: z2 };
    }

    function draw() {
      if (!running) return;
      const width = surface.clientWidth;
      const height = surface.clientHeight;
      context.clearRect(0, 0, width, height);

      if (!reduceMotion) {
        targetY += 0.004;
        angleX += (targetX - angleX) * 0.04;
        angleY += (targetY - angleY) * 0.04;
      }

      const projected = points
        .map((point) => {
          const rotated = rotate(point, angleX, angleY);
          const depth = (rotated.z + 2) / 3;
          return {
            label: point.label,
            x: width / 2 + rotated.x * RADIUS,
            y: height / 2 + rotated.y * RADIUS,
            z: rotated.z,
            depth,
          };
        })
        .sort((a, b) => a.z - b.z);

      for (const item of projected) {
        const size = 11 + item.depth * 7;
        context.globalAlpha = 0.28 + item.depth * 0.72;
        context.fillStyle = item.z > 0.15 ? "#b5471d" : "#1c1712";
        context.font = `${item.z > 0.2 ? "560" : "450"} ${size}px "Source Sans 3", "Segoe UI", sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(item.label, item.x, item.y);
      }

      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    }

    function onMove(event: PointerEvent) {
      const bounds = surface.getBoundingClientRect();
      const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
      const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
      targetX = ny * 0.9;
      targetY += nx * 0.02;
    }

    sizeCanvas();
    draw();
    window.addEventListener("resize", sizeCanvas);
    surface.addEventListener("pointermove", onMove);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", sizeCanvas);
      surface.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="sphere-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="skill-sphere" />
    </div>
  );
}
