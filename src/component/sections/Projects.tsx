"use client";

import { Code, ExternalLink, Filter, Github } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Cards";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Apps" },
  { id: "mobile", label: "Mobile" },
  { id: "ui", label: "UI/UX" },
];

const projects = [
  {
    id: 1,
    title: "XORA-SaaS Landing Page",
    description:
      "Responsive SaaS landing page built with Tailwind CSS, featuring a modern layout and clean design.",
    image: "/xora.png",
    category: "web",
    technologies: ["React", "Vite", "Tailwind CSS"],
    demoUrl: "https://chamakhmakh.github.io/SaaS-app/",
    repoUrl: "https://github.com/chamakhmakh/SaaS-app",
  },
  {
    id: 2,
    title: "Nike Landing Page",
    description:
      "Nike-inspired responsive landing page crafted with Tailwind CSS, featuring dynamic product showcases and modern UI design.",
    image: "/nike.png",
    category: "web",
    technologies: ["Vite", "React", "Tailwind CSS"],
    demoUrl: "https://chamakhmakh.github.io/Nike/",
    repoUrl: "https://github.com/chamakhmakh/Nike",
  },
  {
    id: 3,
    title: "Brainwave",
    description:
      "Futuristic landing page concept designed with Tailwind CSS, featuring animated sections and a clean, tech-focused aesthetic.",
    image: "/brainwave.png",
    category: "web",
    technologies: ["React Native", "GraphQL", "AWS", "Chart.js"],
    demoUrl: "https://chamakhmakh.github.io/Brainwave/",
    repoUrl: "https://github.com/chamakhmakh/Brainwave",
  },
  {
    id: 4,
    title: "Zentry Clone",
    description:
      "Immersive landing page built with Tailwind CSS and GSAP, blending futuristic design with smooth, scroll-triggered animations.",
    image: "/zentry.png",
    category: "web",
    technologies: ["Vite", "React", "Tailwind CSS", "GSAP"],
    demoUrl: "https://try-zentry.netlify.app/",
    repoUrl: "https://github.com/chamakhmakh/zentry",
  },
  {
    id: 5,
    title: "Suberbia",
    description:
      "Dynamic 3D-enabled landing page powered by Tailwind CSS, Prismic CMS, and Slice Machine for seamless content management.",
    image: "/suberbia.png",
    category: "web",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Prismic",
      "Slice Machine",
      "GSAP",
      "Three.js",
    ],
    demoUrl: "https://suberbia.netlify.app/",
    repoUrl: "https://github.com/chamakhmakh/suberbia",
  },
  {
    id: 6,
    title: "Block Forge",
    description:
      "Interactive blockchain-themed landing page built with Astro.js, TypeScript, and Tailwind CSS, featuring smooth animations powered by Framer Motion.",
    image: "/block-forge.png",
    category: "web",
    technologies: ["Astro.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://block-forge.netlify.app/",
    repoUrl: "https://github.com/chamakhmakh/blockchain",
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((projects) => projects.category === filter);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      headingRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
    gsap.fromTo(
      titleRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      filtersRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!projectsRef.current) return;

    gsap.fromTo(
      ".project-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".project-card",
      {
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)",
      }
    );
  }, [filter]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-highlight/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold">
            Featured Projects
            <div className="mt-2 h-1 w-44 bg-highlight mx-auto" />
          </h2>
          <p
            ref={titleRef}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          >
            A selection of my recent work, showcasing my skills in frontend
            development, UI/UX design, and full-stack applications.
          </p>
        </div>

        <div ref={filtersRef} className="flex justify-center mb-10">
          <div className="flex items-center bg-card rounded-full p-1 shadow-sm">
            <Filter className="h-4 w-4 ml-3 mr-2 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "ghost"}
                size="sm"
                className={`rounded-full px-4 ${
                  filter === category.id
                    ? "bg-highlight hover:bg-highlight/90"
                    : ""
                }`}
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <Card key={project.id} className="project-card overflow-hidden">
              <div className="relative h-48 overflow-hidden rounded-md">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <CardHeader className="pb-2">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-muted text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild size="sm" variant="outline">
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View source code</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        size="sm"
                        className="bg-highlight hover:bg-highlight/90"
                      >
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View live demo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <Code className="mr-2 h-4 w-4" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
