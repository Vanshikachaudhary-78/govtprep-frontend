import React from "react";
import Background from "../components/signup/Background";
import SignupCard from "../components/signup/SignupCard";

export default function Signup() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[#050816] px-6">
      {/* Premium Background */}
      <Background />

      {/* Signup Card */}
      <div className="relative z-10 flex w-full items-center justify-center">
        <SignupCard />
      </div>
    </div>
  );
}