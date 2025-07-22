"use client";

import { cn } from "@/lib/utils";
import Spline from "@splinetool/react-spline";
import React from "react";

const Model3D = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("pointer-events-auto w-full h-full relative ", className)}
    >
      <Spline scene="/modules/scene.splinecode" />
    </div>
  );
};

export default Model3D;
//bg-gradient-to-br from-transparent to-highlight/5 rounded-2xl backdrop-blur-sm
