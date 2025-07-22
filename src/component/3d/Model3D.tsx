"use client"; // Force client-side only

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Disable SSR for Spline – avoid hydration issues and WebGL crash
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const Model3D = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("pointer-events-auto w-full h-full relative", className)}
    >
      <Spline scene="/modules/scene.splinecode" />
    </div>
  );
};

export default Model3D;
