"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-stone-50">Spine</h1>
          <p className="mt-1 text-sm text-stone-400">
            Welcome back to your shelf.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-sm space-y-4"
        >
          {error && (
            <div className="text-sm text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-stone-700 bg-stone-950 text-stone-50 placeholder-stone-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-stone-700 bg-stone-950 text-stone-50 placeholder-stone-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-50 text-stone-950 rounded-md py-2 text-sm font-medium hover:bg-stone-200 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-stone-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-stone-50 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}