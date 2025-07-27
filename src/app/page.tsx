"use client";

import Footer from "@/component/layout/Footer";
// import Header from "@/component/layout/Header";
import Preloader from "@/component/Preloader";
// import About from "@/component/sections/About";
import Contact from "@/component/sections/Contact";
import Experience from "@/component/sections/Experience";
// import Hero from "@/component/sections/Hero";
// import Projects from "@/component/sections/Projects";
// import Skills from "@/component/sections/Skills";
import ThemeProvider from "@/component/ThemeProvider";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {/* <Header /> */}
            <main>
              {/* <Hero /> */}
              {/* <About /> */}
              {/* <Skills /> */}
              {/* <Projects /> */}
              <Experience />
              <Contact />
              hello
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
