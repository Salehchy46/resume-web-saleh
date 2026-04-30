// src/components/TargetCursor.jsx
import React, { useEffect, useRef } from "react";

const TargetCursor = () => {
  const cursorRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePosition.current.x}px, ${mousePosition.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(updatePosition);
    };

    const onMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // Hide default cursor
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    window.addEventListener("mousemove", onMouseMove);
    rafId.current = requestAnimationFrame(updatePosition);

    // Force pointer cursor on interactive elements
    const style = document.createElement("style");
    style.textContent = `
      button, a, input, textarea, select, [role="button"], .btn, [tabindex]:not([tabindex="-1"]) {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
      style.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "24px",
        height: "24px",
        marginLeft: "-12px",
        marginTop: "-12px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.8), rgba(96,165,250,0.4))",
        filter: "blur(4px)",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 0.05s linear", // ultra‑smooth follow
        willChange: "transform",
      }}
    />
  );
};

export default TargetCursor;