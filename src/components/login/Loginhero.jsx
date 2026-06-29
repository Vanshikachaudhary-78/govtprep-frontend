import React from "react";

export default function LoginHero() {
  return (
    <div className="flex h-full flex-col justify-center py-4">
      <div className="max-w-lg">
        {/* Brand */}
        <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          GovtPrep AI
        </h1>

        {/* Badge */}
        <div className="mt-4 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 backdrop-blur-xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
            AI-Powered Government Exam Preparation
          </span>
        </div>

        {/* Heading */}
        <div className="mt-7">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Stop Reading
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
              Everything.
            </span>
            <br />
            Read What Matters.
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400 lg:text-base">
            AI organizes current affairs into concise, exam-focused insights so
            you spend less time searching and more time preparing.
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 space-y-3">
          <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.06]">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 transition-transform duration-300 group-hover:scale-125" />

            <span className="text-sm font-medium text-slate-200">
              AI-curated current affairs
            </span>
          </div>

          <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.06]">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 transition-transform duration-300 group-hover:scale-125" />

            <span className="text-sm font-medium text-slate-200">
              Daily insights that actually matter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}