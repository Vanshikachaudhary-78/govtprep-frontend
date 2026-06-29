import React from "react";
import Background from "../components/login/Background";
import LoginHero from "../components/login/LoginHero";
import LoginCard from "../components/login/LoginCard";

export default function Login() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background */}
      <Background />

      {/* Main Layout */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6 lg:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          
          {/* Left Side */}
          <div className="hidden h-[82vh] lg:flex">
            <LoginHero />
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center">
            <LoginCard />
          </div>

        </div>
      </div>

      {/* Mobile Header */}
      <div className="absolute top-8 left-0 right-0 z-20 flex justify-center lg:hidden">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            GovtPrep AI
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            AI-Powered Government Exam Preparation
          </p>
        </div>
      </div>
    </div>
  );
}