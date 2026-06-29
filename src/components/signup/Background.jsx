import React from "react";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050816] pointer-events-none">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.12),transparent_40%),linear-gradient(to_bottom_right,#050816,#070b1a,#04060f)]" />

      {/* Top Left Blob */}
      <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-[90px]" />

      {/* Right Blob */}
      <div className="absolute top-1/3 -right-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-[90px]" />

      {/* Bottom Blob */}
      <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-indigo-600/15 blur-[90px]" />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 h-96 w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/3 to-transparent" />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/40 to-transparent" />
    </div>
  );
}