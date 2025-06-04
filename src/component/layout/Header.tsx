"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
    const header = document.querySelector("header"); // Get the header element

    gsap.fromTo(
      header,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.1, // slight delay helps avoid layout jank
      }
    );
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300 opacity-0 -translate-y-12",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          href="#home"
          className="text-xl font-heading font-bold tracking-tight"
          onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
        >
          <span className="bg-gradient-to-r from-foreground to-highlight bg-clip-text text-transparent">
            Farouk
          </span>
          <span className="text-highlight">.</span>
        </Link>

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
            className="rounded-full"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[57px] bg-background/95 backdrop-blur-sm transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-lg font-medium px-6 py-2 rounded-full transition-colors relative group",
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
