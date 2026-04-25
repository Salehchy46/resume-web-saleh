// src/components/TargetCursor.jsx
import React, { useEffect, useRef, useState } from "react";

const TargetCursor = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const trail = useRef([]);
  const animationId = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  const MAX_TRAIL_LENGTH = 24;
  const TRAIL_LIFE = 0.9;
  const TRAIL_DISTANCE_THRESHOLD = 8;

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Hide default cursor
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mousePos.current = { x, y };

      if (trail.current.length === 0) {
        trail.current.push({ x, y, createdAt: performance.now() / 1000 });
      } else {
        const last = trail.current[trail.current.length - 1];
        const dx = x - last.x;
        const dy = y - last.y;
        if (Math.hypot(dx, dy) > TRAIL_DISTANCE_THRESHOLD) {
          trail.current.push({ x, y, createdAt: performance.now() / 1000 });
          while (trail.current.length > MAX_TRAIL_LENGTH) trail.current.shift();
        }
      }
    };

    const onMouseLeave = () => {
      trail.current = [];
    };

    // ── SCROLL EVENT: trigger cursor animation ──────────────────────────────
    const onScroll = () => {
      // Clear previous timeout
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      setIsScrolling(true);
      // Reset after scrolling stops (300ms)
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll);

    const draw = () => {
      if (!canvas || !ctx) return;
      const now = performance.now() / 1000;
      const { width, height } = dimensions;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // ── TRAIL (same as before) ─────────────────────────────────────────────
      trail.current = trail.current.filter((p) => now - p.createdAt < TRAIL_LIFE);
      for (let i = 0; i < trail.current.length; i++) {
        const p = trail.current[i];
        const age = now - p.createdAt;
        const lifeRatio = 1 - age / TRAIL_LIFE;
        const opacity = lifeRatio * 0.5;
        const size = 12 * lifeRatio + 2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.7})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 0.9})`;
        ctx.fill();
      }

      // ── MAIN CURSOR ───────────────────────────────────────────────────────
      if (mousePos.current.x) {
        // Dynamic sizes based on scroll state
        const outerRadius = isScrolling ? 32 : 22;
        const middleRadius = isScrolling ? 20 : 14;
        const innerRadius = isScrolling ? 10 : 6;
        const outerOpacity = isScrolling ? 0.6 : 0.35;
        const shadowBlur = isScrolling ? 28 : 20;

        // Outer blurry glow (bigger & brighter when scrolling)
        ctx.shadowBlur = shadowBlur;
        ctx.shadowColor = "#3b82f6";
        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${outerOpacity})`;
        ctx.fill();

        // Middle solid ball
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, middleRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#3b82f6";
        ctx.fill();

        // Inner bright core
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, innerRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#60a5fa";
        ctx.fill();

        // Tiny white highlight (also slightly larger when scrolling)
        ctx.shadowBlur = 0;
        const highlightOffset = isScrolling ? 4 : 3;
        const highlightSize = isScrolling ? 3.5 : 2.5;
        ctx.beginPath();
        ctx.arc(mousePos.current.x - highlightOffset, mousePos.current.y - highlightOffset, highlightSize, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // ── SCROLL‑SPECIAL FX: extra particles / sparks ─────────────────────
        if (isScrolling) {
          // Draw a few random sparks around the cursor
          for (let i = 0; i < 6; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 15 + Math.random() * 20;
            const xOffset = Math.cos(angle) * dist;
            const yOffset = Math.sin(angle) * dist;
            ctx.beginPath();
            ctx.arc(mousePos.current.x + xOffset, mousePos.current.y + yOffset, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(96, 165, 250, ${Math.random() * 0.6})`;
            ctx.fill();
          }
        }
      }

      animationId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (animationId.current) cancelAnimationFrame(animationId.current);
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };
  }, [dimensions, isScrolling]);

  // Keep pointer cursor on interactive elements
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      button, a, input, textarea, select, [role="button"], .btn, [tabindex]:not([tabindex="-1"]) {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default TargetCursor;