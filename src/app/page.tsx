import Footer from "@/component/layout/Footer";
import Header from "@/component/layout/Header";
import About from "@/component/sections/About";
import Contact from "@/component/sections/Contact";
import Experience from "@/component/sections/Experience";
import Hero from "@/component/sections/Hero";
import Projects from "@/component/sections/Projects";
import Skills from "@/component/sections/Skills";
import ThemeProvider from "@/component/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
