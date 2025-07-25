"use client";

// import Model3D from "../3d/Model3D";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Code, Lightbulb, Users } from "lucide-react";
import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(_ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

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
          start: "top 90%",
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      }
    );

    gsap.fromTo(
      tabsRef.current,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 md:py-24 realtive overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="mt-2 h-1 w-20 bg-highlight mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square max-w-md mx-auto md:mx-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-highlight/80 to-highlight/20 blur-xl opacity-20 -z-10" />
            <div
              ref={imageRef}
              className="h-full w-full rounded-2xl overflow-hidden border border-border/30 p-2 bg-card/50 backdrop-blur-sm hidden md:block"
            >
              <div className="h-full w-full relative rounded-xl overflow-hidden">
                <Image
                  src="/about.png"
                  alt="farouk"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-highlight/10 rounded-full blur-xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-highlight/20 rounded-full blur-xl" />
          </div>

          <div className="space-y-6">
            <Tabs ref={tabsRef} defaultValue="personel" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="personel">Personel</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="values">Values</TabsTrigger>
              </TabsList>

              <TabsContent
                ref={contentRef}
                value="personel"
                className="space-y-4 mt-6"
              >
                <h3 className="text-3xl font-semibold">
                  Crafting Digial Experiences
                </h3>
                <p className="text-muted-foreground">
                  I&apos;m Farouk, a passionate software engineer and frontend
                  developer with a keen eye for design and user experience. I
                  blend creativity with technical expertise to build innovative
                  and intuitive digital solutions.
                </p>
                <p className="text-muted-foreground">
                  With experience in React, Next.js, and modern frontend
                  technologies, I create responsive, performant, and accessible
                  web applications that solve real-world problems.
                </p>
              </TabsContent>

              <TabsContent value="education" className="space-y-4 mt-6">
                <h3>Academic Background</h3>
                <div className="space-y-2">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium">ESGITECH</h4>
                    <p className="text-sm text-muted-foreground">
                      Bachelor&apos;s Degree in Software Engineering
                    </p>
                    <p className="text-sm text-muted-foreground">Present</p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold">Self-Taught Development</h4>
                    <p className="text-sm text-muted-foreground">
                      Continuous learning through online courses, bootcamps, and
                      personal projects
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2024-Present
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="values" className="space-y-4 mt-6">
                <h3 className="text-xl font-semibold">What Drives Me</h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-highlight/10 p-2 rounded-md">
                      <Code className="h-5 w-5 text-highlight" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Clean Code</h4>
                      <p className="text-sm text-muted-foreground">
                        I believe in writing maintainable, readable, and
                        efficient code.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-highlight/10 p-2 rounded-md">
                      <Lightbulb className="h-5 w-5 text-highlight" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Innovation</h4>
                      <p className="text-sm text-muted-foreground">
                        Constantly exploring new technologies and approaches to
                        solve problems.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-highlight/10 p-2 rounded-md">
                      <Users className="h-5 w-5 text-highlight" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Collaboration</h4>
                      <p className="text-sm text-muted-foreground">
                        I thrive in team environments and enjoy sharing
                        knowledge with others.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
