// src/components/TargetCursor.jsx
import React, { useEffect, useRef, useState } from "react";

const TargetCursor = () => {
  const cursorRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches ||
                    "ontouchstart" in window ||
                    navigator.maxTouchPoints > 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide default cursor
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    const onMouseMove = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };
  }, [isTouchDevice]);

  // Pointer cursor for interactive elements
  useEffect(() => {
    if (isTouchDevice) return;
    const style = document.createElement("style");
    style.textContent = `
      button, a, input, textarea, select, [role="button"], .btn, [tabindex]:not([tabindex="-1"]) {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "28px",
        height: "28px",
        marginLeft: "-14px",
        marginTop: "-14px",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid #3b82f6",
          boxSizing: "border-box",
        }}
      />
      {/* Inner dot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "4px",
          height: "4px",
          marginLeft: "-2px",
          marginTop: "-2px",
          borderRadius: "50%",
          backgroundColor: "#3b82f6",
        }}
      />
      {/* Optional crosshair lines (small) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "1px",
          background: "#3b82f680",
          transform: "translateY(-50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "#3b82f680",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
};

export default TargetCursor;