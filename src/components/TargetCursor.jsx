// src/components/TargetCursor.jsx (merged with snowflake particles)
import React, { useEffect, useRef } from 'react';

class Particle {
  constructor(x, y, canvasItem) {
    this.position = { x, y };
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: 0.5 + Math.random() * 1.5,
    };
    this.lifeSpan = 60 + Math.floor(Math.random() * 40);
    this.initialLifeSpan = this.lifeSpan;
    this.canv = canvasItem;
  }
  update(context) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.lifeSpan--;
    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 1.5) / 75;
    this.velocity.y -= Math.random() / 200;
    const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
    context.save();
    context.translate(this.position.x, this.position.y);
    context.scale(scale, scale);
    context.drawImage(this.canv, -this.canv.width / 2, -this.canv.height / 2);
    context.restore();
  }
}

const TargetCursor = () => {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const canvImages = useRef([]);
  const animationFrame = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastAdded = useRef(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const possibleEmoji = ['❄️'];

  useEffect(() => {
    // ----- Setup canvas for snowflakes -----
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998'; // just below cursor
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createEmojiImages = () => {
      context.font = '14px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
      context.textBaseline = 'middle';
      context.textAlign = 'center';
      possibleEmoji.forEach((emoji) => {
        const measurements = context.measureText(emoji);
        const bgCanvas = document.createElement('canvas');
        const bgContext = bgCanvas.getContext('2d');
        if (!bgContext) return;
        bgCanvas.width = Math.max(measurements.width, 20);
        bgCanvas.height = Math.max(measurements.actualBoundingBoxAscent * 2, 20);
        bgContext.textAlign = 'center';
        bgContext.font = '14px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
        bgContext.textBaseline = 'middle';
        bgContext.fillStyle = 'rgba(173, 216, 230, 0.9)'; // light blue
        bgContext.fillText(
          emoji,
          bgCanvas.width / 2,
          measurements.actualBoundingBoxAscent || bgCanvas.height / 2
        );
        canvImages.current.push(bgCanvas);
      });
    };

    const addParticle = (x, y) => {
      if (canvImages.current.length === 0) return;
      const randomImage = canvImages.current[Math.floor(Math.random() * canvImages.current.length)];
      particles.current.push(new Particle(x, y, randomImage));
      // keep particle count reasonable
      if (particles.current.length > 80) particles.current.shift();
    };

    const updateParticles = () => {
      if (!context || !canvas) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((particle, index) => {
        particle.update(context);
        if (particle.lifeSpan < 0) {
          particles.current.splice(index, 1);
        }
      });
    };

    const animationLoop = () => {
      updateParticles();
      animationFrame.current = requestAnimationFrame(animationLoop);
    };

    // ----- Main cursor logic -----
    const updateCursorPosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePosition.current.x}px, ${mousePosition.current.y}px, 0)`;
      }
    };

    let rafCursor;
    const animateCursor = () => {
      updateCursorPosition();
      rafCursor = requestAnimationFrame(animateCursor);
    };

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      mousePosition.current = { x: clientX, y: clientY };
      // Add snowflake particle (throttle a bit)
      const now = Date.now();
      if (now - lastAdded.current > 30) { // ~33 fps max particles
        addParticle(clientX, clientY);
        lastAdded.current = now;
      }
    };

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    window.addEventListener('mousemove', onMouseMove);
    rafCursor = requestAnimationFrame(animateCursor);
    animateCursor();

    // Force pointer cursor on interactive elements
    const style = document.createElement('style');
    style.textContent = `
      button, a, input, textarea, select, [role="button"], .btn, [tabindex]:not([tabindex="-1"]) {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);

    // Initialize snowflake canvas
    setCanvasSize();
    createEmojiImages();
    window.addEventListener('resize', setCanvasSize);
    animationLoop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      if (rafCursor) cancelAnimationFrame(rafCursor);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
      style.remove();
      if (canvasRef.current) canvasRef.current.remove();
    };
  }, [possibleEmoji]);

  return (
    <>
      {/* Main cursor (blurry ball) */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          marginLeft: '-14px',
          marginTop: '-14px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.9), rgba(96,165,250,0.4))',
          filter: 'blur(5px)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.03s linear',
          willChange: 'transform',
        }}
      />
      {/* Snowflake canvas is added imperatively, not as JSX */}
    </>
  );
};

export default TargetCursor;