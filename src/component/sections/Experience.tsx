"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Experience data
const workExperience = [
  {
    id: 1,
    position: "Frontend Developer",
    company: "Freelancer",
    period: "2024 – Present",
    description:
      "Delivering custom, performant web solutions for a range of clients using React, Next.js, Tailwind CSS, and modern animation libraries like GSAP. Focused on sleek UI/UX and seamless user interactions.",
    responsibilities: [
      "Building dynamic, responsive user interfaces using React and Next.js",
      "Implementing modern styling with Tailwind CSS and custom design systems",
      "Integrating animations and scroll effects using GSAP and Framer Motion",
      "Optimizing for performance, accessibility, and Core Web Vitals",
      "Collaborating with clients to understand needs and deliver tailored solutions",
      "Maintaining and iterating on existing client projects",
    ],
  },
  {
    id: 2,
    position: "Junior Frontend Developer",
    company: "Personal & Open Source Projects",
    period: "2024 – present",
    description:
      "Worked independently and with online communities to build and contribute to web projects while sharpening frontend fundamentals. Gained real-world experience by solving problems, debugging, and building UIs from scratch.",
    responsibilities: [
      "Developed small to medium web apps using HTML, CSS, JavaScript, and React",
      "Contributed to open source repositories and personal GitHub projects",
      "Practiced modern responsive design and cross-browser compatibility",
      "Experimented with animation libraries like GSAP and Framer Motion",
      "Built reusable components and layouts with Tailwind CSS",
      "Learned Git workflows, version control, and project organization",
    ],
  },
];

// Education data
const education = [
  {
    id: 1,
    degree: "Bachelor's in Software Engineering",
    institution: "ESSGITECH",
    period: "2024 – Present",
    description:
      "A comprehensive academic program focused on software engineering principles, including full-stack web development, software architecture, and practical project implementation. Emphasis is placed on mastering both front-end and back-end technologies, collaborative development, and real-world problem solving.",
    courses: [
      "Software Architecture & Design Patterns",
      "Database Systems & SQL Optimization",
      "Data Structures & Algorithms",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const workContentRef = useRef<HTMLDivElement>(null);
  const educationContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    requestIdleCallback(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
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
        tabsRef.current,
        { y: 50, opacity: 0 },
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

      ScrollTrigger.batch(".experience-card", {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          }),
        start: "top 80%",
        once: true,
      });
    });
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 md:py-24 bg-muted/20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-dots-pattern bg-[length:16px_16px] opacity-[0.03]" />
      <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-highlight/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Experience & Education
          </h2>
          <div className="mt-2 h-1 w-20 bg-highlight mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <Tabs defaultValue="work" ref={tabsRef} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="work" className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Work Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                Education
              </TabsTrigger>
            </TabsList>

            {/* Work Experience Tab */}
            <TabsContent
              value="work"
              ref={workContentRef}
              className="space-y-6"
            >
              {workExperience.map((job) => (
                <Card
                  key={job.id}
                  className="experience-card relative overflow-hidden"
                >
                  {/* Decorative line */}
                  <div className="absolute left-8 top-[72px] bottom-6 w-0.5 bg-muted" />

                  <CardHeader className="relative">
                    <div className="absolute left-0 w-16 h-16 bg-highlight/10 flex items-center justify-center rounded-full">
                      <Briefcase className="h-6 w-6 text-highlight" />
                    </div>

                    <div className="ml-20">
                      <CardTitle>{job.position}</CardTitle>
                      <CardDescription className="flex items-center">
                        <span>{job.company}</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {job.period}
                        </span>
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="ml-20">
                    <p className="text-muted-foreground mb-4">
                      {job.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">
                        Key Responsibilities:
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {job.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Education Tab */}
            <TabsContent
              value="education"
              ref={educationContentRef}
              className="space-y-6"
            >
              {education.map((edu) => (
                <Card
                  key={edu.id}
                  className="experience-card relative overflow-hidden"
                >
                  {/* Decorative line */}
                  <div className="absolute left-8 top-[72px] bottom-6 w-0.5 bg-muted" />

                  <CardHeader className="relative">
                    <div className="absolute left-0 w-16 h-16 bg-highlight/10 flex items-center justify-center rounded-full">
                      <GraduationCap className="h-6 w-6 text-highlight" />
                    </div>

                    <div className="ml-20">
                      <CardTitle>{edu.degree}</CardTitle>
                      <CardDescription className="flex items-center">
                        <span>{edu.institution}</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {edu.period}
                        </span>
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="ml-20">
                    <p className="text-muted-foreground mb-4">
                      {edu.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Key Courses:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {edu.courses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
