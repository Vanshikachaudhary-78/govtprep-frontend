import React from "react";

const stats = [
  {
    value: "10K+",
    label: "Articles",
  },
  {
    value: "24×7",
    label: "Updates",
  },
  {
    value: "AI",
    label: "Powered",
  },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.06] hover:shadow-[0_10px_35px_rgba(37,99,235,0.18)]"
        >
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 rounded-full bg-blue-500/20 blur-2xl" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
              {stat.value}
            </h3>

            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}