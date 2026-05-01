// src/components/TextFlagCursor.jsx
'use client';
import { useEffect, useRef } from 'react';

const TextFlagCursor = (options = {}) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    let cursorOptions = options || {};
    let hasWrapperEl = options && options.element;
    let element = hasWrapperEl || document.body;
    let text = cursorOptions.text ? ' ' + cursorOptions.text : "  Let's Contact Saleh!";
    let font = cursorOptions.font || 'monospace';
    let textSize = cursorOptions.textSize || 12;
    let fontFamily = textSize + 'px ' + font;
    let gap = cursorOptions.gap || textSize + 2;
    let angle = 0;
    let radiusX = 2;
    let radiusY = 5;
    let charArray = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: width / 2 };

    for (let i = 0; i < text.length; i++) {
      charArray[i] = { letter: text.charAt(i), x: width / 2, y: width / 2 };
    }

    let canvas, context, animationFrame;
    let time = 0; // for color animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Generates a bright, highly saturated color that cycles hue over time
    function getColor() {
      const hue = (time * 0.02) % 360; // slow rotation (approx 18 sec per cycle)
      return `hsl(${hue}, 100%, 70%)`; // 100% saturation, 70% lightness → vivid on dark bg
    }

    function init() {
      if (prefersReducedMotion.matches) {
        console.log('Reduced motion enabled, cursor disabled');
        return false;
      }
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.pointerEvents = 'none';
      if (hasWrapperEl) {
        canvas.style.position = 'absolute';
        element.appendChild(canvas);
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.style.position = 'fixed';
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
      }
      bindEvents();
      loop();
    }

    function bindEvents() {
      element.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (hasWrapperEl) {
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
    }

    function onMouseMove(e) {
      if (hasWrapperEl) {
        const rect = element.getBoundingClientRect();
        cursor.x = e.clientX - rect.left;
        cursor.y = e.clientY - rect.top;
      } else {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
    }

    function updateParticles() {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      time++;
      const currentColor = getColor();
      
      angle += 0.15;
      let locX = radiusX * Math.cos(angle);
      let locY = radiusY * Math.sin(angle);
      
      // Draw trailing characters (behind the head)
      for (let i = charArray.length - 1; i > 0; i--) {
        charArray[i].x = charArray[i - 1].x + gap;
        charArray[i].y = charArray[i - 1].y;
        context.fillStyle = currentColor;
        context.font = fontFamily;
        context.fillText(charArray[i].letter, charArray[i].x, charArray[i].y);
      }
      
      // Update head position to follow cursor
      let x1 = charArray[0].x;
      let y1 = charArray[0].y;
      x1 += (cursor.x - x1) / 5 + locX + 2;
      y1 += (cursor.y - y1) / 5 + locY;
      charArray[0].x = x1;
      charArray[0].y = y1;
      
      // Draw head
      context.fillStyle = currentColor;
      context.fillText(charArray[0].letter, charArray[0].x, charArray[0].y);
    }

    function loop() {
      updateParticles();
      animationFrame = requestAnimationFrame(loop);
    }

    function destroy() {
      if (canvas) canvas.remove();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      element.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    }

    const handleReducedMotionChange = () => {
      if (prefersReducedMotion.matches) destroy();
      else init();
    };

    prefersReducedMotion.addEventListener('change', handleReducedMotionChange);
    init();

    cursorRef.current = { destroy };
    return () => {
      if (cursorRef.current) cursorRef.current.destroy();
      prefersReducedMotion.removeEventListener('change', handleReducedMotionChange);
    };
  }, [options]);

  return null;
};

export default TextFlagCursor;