import Spline from "@splinetool/react-spline";
import React from "react";

const Model3D = () => {
  return (
    <div className="pointer-events-auto w-full h-full relative bg-gradient-to-br from-transparent to-highlight/5 rounded-2xl backdrop-blur-sm">
      <Spline scene="/modules/scene.splinecode" />
    </div>
  );
};

export default Model3D;
