"use client";

import { Code2, PanelLeft, TestTube, Workflow } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "../ui/Progress";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <Code2 className="h-5 w-5" />,
    skills: [
      { name: "React.js", proficiency: 95 },
      { name: "Next.js", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "HTML/CSS", proficiency: 95 },
      { name: "Tailwind CSS", proficiency: 90 },
      { name: "GSAP/Animations", proficiency: 80 },
    ],
  },
  {
    id: "ui",
    label: "UI/UX",
    icon: <PanelLeft className="h-5 w-5" />,
    skills: [
      { name: "Responsive Design", proficiency: 95 },
      { name: "UI Frameworks", proficiency: 90 },
      { name: "Accessibility", proficiency: 80 },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: <Workflow className="h-5 w-5" />,
    skills: [
      { name: "Git/GitHub", proficiency: 90 },
      { name: "Vercel/Netlify", proficiency: 85 },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    icon: <TestTube className="h-5 w-5" />,
    skills: [{ name: "React Testing Library", proficiency: 75 }],
  },
];

const Skills = () => {
  const [activeCategory, setactiveCategory] = useState("frontend");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

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
      categoriesRef.current,
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
      skillsRef.current,
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
    const progressBars = document.querySelectorAll(".skill-progress");

    gsap.fromTo(
      progressBars,
      {
        width: 0,
      },
      {
        width: "100%",
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
        },
      }
    );
  }, [activeCategory]);

  const activeSkills =
    skillCategories.find((cat) => cat.id === activeCategory)?.skills || [];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 md:py-24 bg-muted/20 realtive overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-highlight/5 rounded-full blur-3xl z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>
          <div className="mt-2 h-1 w-40 bg-highlight mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            ref={categoriesRef}
            className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-8"
          >
            {skillCategories.map((category) => (
              <button
                key={category.id}
                className={`p-4 rounded-lg flex flex-col items-center justify-center text-center space-y-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-highlight text-white shadow-lg"
                    : "bg-card hover:bg-card/80"
                }`}
                onClick={() => setactiveCategory(category.id)}
              >
                <div
                  className={
                    activeCategory === category.id
                      ? "text-white"
                      : "text-highlight"
                  }
                >
                  {category.icon}
                </div>
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>

          <div ref={skillsRef} className="bg-card rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              {skillCategories.find((cat) => cat.id === activeCategory)?.icon}
              <span className="ml-2">
                {
                  skillCategories.find((cat) => cat.id === activeCategory)
                    ?.label
                }{" "}
                Skills
              </span>
            </h3>

            <div className="space-y-6">
              {activeSkills.map((skill, index) => (
                <div key={`${skill.name}-${index}`} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <Progress
                    value={skill.proficiency}
                    className="h-2 skill-progress"
                    indicatorClassName="bg-highlight"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
