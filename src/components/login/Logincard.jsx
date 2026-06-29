import React, { useState } from "react";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://govtprep-backend.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed.");
      }

      localStorage.setItem("token", data.access_token);
      window.location.href = "/news";
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* Background Glow */}
      <div className="absolute -inset-2 rounded-[28px] bg-blue-600/10 blur-3xl" />

      <div className="relative rounded-[24px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white">
          Welcome Back
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Continue your preparation.
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(59,130,246,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Continue"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 h-px bg-white/10" />

        {/* Footer */}
        <p className="text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}