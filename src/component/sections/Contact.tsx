"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/Cards";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { Textarea } from "../ui/Textarea";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isSubmitted && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [isSubmitted]);

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
      formRef.current,
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      infoRef.current,
      {
        x: 50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // Add this line to handle the change event
  ) => {
    const { name, value } = e.target; // Destructure the name and value from the target
    setFormState((prev) => ({ ...prev, [name]: value })); // Update the form state
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-highlight/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-highlight/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold">
            Get In Touch
            <div className="mt-2 h-1 w-32 bg-highlight mx-auto" />
          </h2>
          <p
            ref={titleRef}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          >
            Have a project in mind or want to discuss a potential collaboration?
            I&apos;d love to hear from you. Fill out the form below and
            I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <Card>
              <CardContent className="pt-6">
                {!isSubmitted ? (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your.email@example.com"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject of your message"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message..."
                        value={formState.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-highlight hover:bg-highlight/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          Sending...
                          <svg
                            className="ml-2 h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div
                    ref={successRef}
                    className="success-message h-[365px] flex flex-col items-center justify-center text-center"
                  >
                    <div className="mb-4 text-highlight">
                      <CheckCircle className="h-16 w-16 text-highlight" />
                    </div>
                    <h3 className="text-2xl font-semibold">Message Sent!</h3>
                    <p className="text-muted-foreground max-w-md">
                      Thank you for contacting me. I&apos;ll get back to you as
                      soon as possible.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div ref={infoRef} className="md:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-highlight/10 p-2 rounded-md">
                      <Mail className="h-5 w-5 text-highlight" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        bensaidf232@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-highlight/10 p-2 rounded-md">
                      <Phone className="h-5 w-5 text-highlight" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        +216 51 706 261
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-highlight/10 p-2 rounded-md">
                      <MapPin className="h-5 w-5 text-highlight" />
                    </div>

                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Tunis, Tunisia
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-highlight text-white overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Availability</h3>
                <p className="opacity-90 mb-4">
                  Currently available for freelance projects and full-time
                  opportunities.
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Response Time</span>
                    <span>Within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
