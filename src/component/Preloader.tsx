"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      spinnerRef.current,
      {
        scale: 0,
        opacity: 1,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
      }
    ).fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }
    );

    gsap.to(spinnerRef.current, {
      rotate: 350,
      duration: 0.5,
      repeat: -1,
      ease: "none",
    });

    setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => setLoading(false),
      });
    }, 2000);
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-highlight/20" />

        <div
          ref={spinnerRef}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-highlight to-highlight/50"
        >
          <div className="absolute inset-0 rounded-full border-2 border-t-highlight" />
        </div>
      </div>

      <p ref={textRef} className="text-lg font-medium text-foreground">
        Loading...
      </p>
    </div>
  );
};

export default Preloader;
