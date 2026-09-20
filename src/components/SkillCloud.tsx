"use client";

import { useEffect, useRef } from "react";

type SkillCloudProps = {
  skills: readonly string[];
};

export function SkillCloud({ skills }: SkillCloudProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const stage: HTMLDivElement = host;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const count = skills.length;
    const points = skills.map((label, index) => {
      const y = count === 1 ? 0 : 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * index;
      return {
        label,
        x: Math.cos(theta) * radius,
        y,
        z: Math.sin(theta) * radius,
      };
    });

    const items = [...stage.querySelectorAll<HTMLElement>("[data-skill]")];
    let frame = 0;
    let live = true;
    let angleY = 0;
    let angleX = 0.18;
    let speed = 0.006;
    let pointerX = 0;
    let pointerY = 0;

    function size() {
      return Math.min(stage.clientWidth, stage.clientHeight, 520) * 0.42;
    }

    function onPointer(event: PointerEvent) {
      const box = stage.getBoundingClientRect();
      pointerX = (event.clientX - box.left) / box.width - 0.5;
      pointerY = (event.clientY - box.top) / box.height - 0.5;
      speed = 0.004 + Math.abs(pointerX) * 0.018;
    }

    function tick() {
      if (!live) return;
      angleY += speed + pointerX * 0.01;
      angleX += pointerY * 0.002;
      angleX = Math.max(-0.6, Math.min(0.6, angleX));
      const radius = size();
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      points.forEach((point, index) => {
        const item = items[index];
        if (!item) return;
        let y = point.y * cosX - point.z * sinX;
        let z = point.y * sinX + point.z * cosX;
        const x = point.x * cosY - z * sinY;
        z = point.x * sinY + z * cosY;
        const depth = (z + 1) / 2;
        const scale = 0.72 + depth * 0.55;
        item.style.transform = `translate(-50%, -50%) translate3d(${x * radius}px, ${y * radius}px, 0) scale(${scale})`;
        item.style.opacity = String(0.35 + depth * 0.65);
        item.style.zIndex = String(Math.round(depth * 100));
      });

      frame = window.requestAnimationFrame(tick);
    }

    stage.addEventListener("pointermove", onPointer);
    tick();

    return () => {
      live = false;
      window.cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onPointer);
    };
  }, [skills]);

  return (
    <div className="skill-cloud" ref={hostRef}>
      {skills.map((skill) => (
        <span key={skill} data-skill>
          {skill}
        </span>
      ))}
    </div>
  );
}
