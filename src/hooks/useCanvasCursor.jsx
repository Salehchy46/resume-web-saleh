// src/hooks/useCanvasCursor.js
import { useEffect, useRef } from 'react';

const useCanvasCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Configuration
    const config = {
      friction: 0.5,
      trails: 20,
      size: 30,
      dampening: 0.25,
      tension: 0.98,
      colorHueRange: 60, // will shift between blue and cyan
    };

    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let lines = [];
    let animationId = null;
    let running = true;

    // Simple oscillator for color shift
    let phase = 0;
    const baseHue = 200; // blue-ish

    // eslint-disable-next-line react-hooks/unsupported-syntax
    class Node {
      constructor() {
        this.x = pos.x;
        this.y = pos.y;
        this.vx = 0;
        this.vy = 0;
      }
    }

    // eslint-disable-next-line react-hooks/unsupported-syntax
    class Line {
      constructor(springBase) {
        this.spring = springBase + Math.random() * 0.05 - 0.025;
        this.friction = config.friction + Math.random() * 0.02 - 0.01;
        this.nodes = Array.from({ length: config.size }, () => new Node());
      }
      update() {
        let spring = this.spring;
        const head = this.nodes[0];
        head.vx += (pos.x - head.x) * spring;
        head.vy += (pos.y - head.y) * spring;
        for (let i = 0; i < this.nodes.length; i++) {
          const node = this.nodes[i];
          if (i > 0) {
            const prev = this.nodes[i - 1];
            node.vx += (prev.x - node.x) * spring;
            node.vy += (prev.y - node.y) * spring;
            node.vx += prev.vx * config.dampening;
            node.vy += prev.vy * config.dampening;
          }
          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;
          spring *= config.tension;
        }
      }
      draw() {
        if (this.nodes.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(this.nodes[0].x, this.nodes[0].y);
        for (let i = 1; i < this.nodes.length - 1; i++) {
          const curr = this.nodes[i];
          const next = this.nodes[i + 1];
          const x = (curr.x + next.x) / 2;
          const y = (curr.y + next.y) / 2;
          ctx.quadraticCurveTo(curr.x, curr.y, x, y);
        }
        const last = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(last.x, last.y, last.x, last.y);
        ctx.stroke();
      }
    }

    // Resize canvas to full window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Update mouse position
    const onMove = (e) => {
      const x = e.clientX ?? (e.touches?.[0]?.pageX ?? pos.x);
      const y = e.clientY ?? (e.touches?.[0]?.pageY ?? pos.y);
      pos = { x, y };
    };

    // Initialize all lines
    const initLines = () => {
      lines = [];
      for (let i = 0; i < config.trails; i++) {
        const spring = 0.4 + (i / config.trails) * 0.03;
        lines.push(new Line(spring));
      }
    };

    // Animation loop
    const animate = () => {
      if (!running) return;
      // Clear canvas completely (transparent background)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // No background fill – just the trails

      // Update color – cycles nicely between blue and cyan
      phase += 0.01;
      const hue = baseHue + Math.sin(phase) * config.colorHueRange;

      ctx.globalCompositeOperation = 'screen'; // makes trails glow
      ctx.strokeStyle = `hsla(${hue}, 80%, 65%, 0.35)`;
      ctx.lineWidth = 1.8;

      for (const line of lines) {
        line.update();
        line.draw();
      }

      animationId = requestAnimationFrame(animate);
    };

    // Setup
    resize();
    initLines();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchstart', onMove);

    running = true;
    animate();

    // Cleanup
    return () => {
      running = false;
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchstart', onMove);
    };
  }, []);

  return canvasRef;
};

export default useCanvasCursor;