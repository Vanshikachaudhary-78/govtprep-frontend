import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [examPreference, setExamPreference] = useState("UPSC");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://govtprep-backend.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            exam_preference: examPreference,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created! Redirecting to login...");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setError(data.detail || "Signup failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Glow */}
      <div className="absolute -inset-3 rounded-4xl bg-blue-500/10 blur-3xl" />

      {/* Card */}
      <div className="relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            GovtPrep AI
          </h1>

          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-blue-300">
            AI-Powered Government Exam Preparation
          </p>
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Prepare smarter with AI-powered current affairs.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />

          <select
            value={examPreference}
            onChange={(e) => setExamPreference(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          >
            <option className="bg-[#0b1220]" value="UPSC">
              UPSC
            </option>
            <option className="bg-[#0b1220]" value="SSC">
              SSC
            </option>
            <option className="bg-[#0b1220]" value="Banking">
              Banking
            </option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(59,130,246,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Get Started"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}