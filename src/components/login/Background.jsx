import React from "react";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050816]">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.14),transparent_40%),linear-gradient(to_bottom_right,#050816,#070b1a,#04060f)]" />

      {/* Blurred Blue Blobs */}
      <div className="absolute -top-40 -left-40 h-112 w-md rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-sky-500/15 blur-[120px]" />

      <div className="absolute -bottom-32 left-1/3 h-88 w-88 rounded-full bg-indigo-600/15 blur-[120px]" />

      {/* Soft Glow */}
      <div className="absolute left-1/2 top-1/2 h-136 w-136 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[140px]" />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* Top Fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/3 to-transparent" />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/40 to-transparent" />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 1px, transparent 1px), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}