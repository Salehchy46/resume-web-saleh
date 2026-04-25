// src/components/CustomCursor.jsx
import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const requestRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ballX = useRef(0);
  const ballY = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      // Check if the element under cursor is clickable
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const isClickable =
        element?.tagName === "BUTTON" ||
        element?.tagName === "A" ||
        element?.closest?.("button") ||
        element?.closest?.("a") ||
        element?.closest?.("[role='button']") ||
        window.getComputedStyle(element).cursor === "pointer";

      if (isClickable) {
        cursor.style.opacity = "0";
      } else {
        cursor.style.opacity = "1";
      }
    };

    const animate = () => {
      // Smooth follow with easing
      ballX.current += (mouseX.current - ballX.current) * 0.12;
      ballY.current += (mouseY.current - ballY.current) * 0.12;

      cursor.style.transform = `translate3d(${ballX.current - 20}px, ${ballY.current - 20}px, 0)`;
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    const onMouseLeave = () => (cursor.style.opacity = "0");
    const onMouseEnter = () => (cursor.style.opacity = "1");
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 rounded-full bg-blue-500 blur-md shadow-lg shadow-blue-500/30 z-9999 transition-opacity duration-200"
      style={{
        width: "40px",
        height: "40px",
        willChange: "transform",
        opacity: 0,
      }}
    />
  );
};

export default CustomCursor;