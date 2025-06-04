"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ArrowDown, ChevronRight } from "lucide-react";
import Model3D from "../3d/Model3D";
import gsap from "gsap";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
      },
      0
    )
      .fromTo(
        headingRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        0.3
      )
      .fromTo(
        textRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        0.6
      )
      .fromTo(
        buttonRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        0.9
      );

    const handleMoouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;

      gsap.to(headingRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMoouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMoouseMove);
    };
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 dark:from-background/80 dark:to-background" />
      <div className="absolute inset-0 opacity-[0.03] bg-dots-pattern bg-[length:20px_20px]" />

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center z-20">
        <div className="text-left flex flex-col space-y-6">
          <p
            ref={titleRef}
            className="text-highlight font-medium tracking-wide"
          >
            SOFTWARE ENGINNER
          </p>

          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            Hello I&apos;m <br />
            <span className="text-highlight">Farouk</span>
          </h1>

          <p ref={textRef} className="text-lg text-muted-foreground max-w-lg">
            A passionate frontend developer and software engineer studying at
            ESGITECH. I create exceptional digital experiences that blend
            creativity with functionality.
          </p>

          <div ref={buttonRef} className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-highlight hover:bg-highlight/90 text-white"
            >
              <Link href="#projects">
                View Projects
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </div>

        <div className="hidden md:block h-[500px] w-full relative">
          {/* 3D model */}
          <Model3D />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <Link href="#about" aria-label="Scroll down">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10"
          >
            <ArrowDown size={20} />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
