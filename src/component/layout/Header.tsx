"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const sections = navItems.map((item) => item.href.substring(1));

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="text-xl font-heading font-bold tracking-tight"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="bg-gradient-to-r from-foreground to-highlight bg-clip-text text-transparent">
              Farouk
            </span>
            <span className="text-highlight">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors relative group",
                  activeSection === item.href.substring(1)
                    ? "text-highlight"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute inset-0 rounded-full bg-highlight/10 -z-10" />
                )}
                <span className="absolute inset-0 rounded-full bg-highlight/0 group-hover:bg-highlight/5 transition-colors -z-10" />
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="rounded-full relative z-50"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-2xl font-medium px-6 py-3 rounded-full transition-all duration-300 relative group",
                  "transform transition-transform duration-300",
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0",
                  activeSection === item.href.substring(1)
                    ? "text-highlight"
                    : "text-foreground hover:text-highlight"
                )}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute inset-0 rounded-full bg-highlight/10 -z-10" />
                )}
                <span className="absolute inset-0 rounded-full bg-highlight/0 group-hover:bg-highlight/5 transition-colors -z-10" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
