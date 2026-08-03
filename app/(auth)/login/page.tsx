"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SpineLogo from "@/components/SpineLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden flex flex-col md:flex-row bg-[#202020]">
      {/* Left Column - Login Form (65% width on desktop) */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-12 md:py-16 bg-[#202020] overflow-y-auto">
        {/* Spine Logo - Always at the top left corner */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
          <SpineLogo textClassName="text-xl font-bold tracking-tight text-white" iconClassName="h-5 w-5" />
        </div>

        <div className="w-full max-w-sm mt-8 md:mt-0">
          {/* Welcome Header */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
            <p className="mt-1.5 text-sm text-white/70">
              Welcome back to your shelf. Enter your details below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#181818]/60 backdrop-blur-sm border border-neutral-800/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4"
          >
            {error && (
              <div className="text-sm text-red-400 bg-red-950/80 border border-red-900/60 rounded-lg px-3.5 py-2.5">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-white/80 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-[#202020]/50 text-white placeholder-white/35 px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:border-[#e8b28b] focus:ring-1 focus:ring-[#e8b28b]"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/80 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-[#202020]/50 text-white placeholder-white/35 px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:border-[#e8b28b] focus:ring-1 focus:ring-[#e8b28b]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e8b28b] hover:bg-[#d4966a] text-[#0e0c0a] font-semibold rounded-lg py-2.5 text-sm active:scale-[0.98] transition-all duration-150 disabled:opacity-50 shadow-sm mt-2 border-0 outline-none"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#e8b28b] font-medium hover:underline transition-all">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column - Image (35% width on desktop) */}
      <div className="relative hidden md:flex md:w-[35%] flex-col justify-between p-8 bg-[#202020] overflow-hidden group">
        {/* Background Image */}
        <img
          src="/hanging_bulb_book.jpg"
          alt="Spine Bookshelf"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-[1000ms] ease-out group-hover:scale-105"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-[#202020]/15 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#202020] via-transparent to-[#202020]/30 z-[2]" />

        {/* Quote (Pushed to bottom) */}
        <div className="relative z-10 mt-auto pl-4 border-l border-stone-700">
          <p className="text-lg font-light text-white leading-relaxed italic">
            "A room without books is like a body without a soul."
          </p>
          <p className="mt-2 text-sm text-white/70">
            &mdash; Marcus Tullius Cicero
          </p>
        </div>
      </div>
    </div>
  );
}