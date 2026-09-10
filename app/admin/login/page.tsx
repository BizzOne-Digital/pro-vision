"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Lock } from "lucide-react";
import { Toaster } from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }
      toast.success("Welcome back");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#031D33] px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex justify-center">
          <div className="rounded-full bg-gradient-primary p-3">
            <Lock className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
        </div>
        <h1 className="mt-5 text-center font-heading text-2xl font-bold text-[#102A43]">
          Admin Login
        </h1>
        <p className="mt-1 text-center text-sm text-[#627D98]">
          Pro-Vision Team Funding Inc.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-[#102A43]">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm outline-none focus:border-[#078BE7] focus:ring-2 focus:ring-[#078BE7]/30"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-[#102A43]">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm outline-none focus:border-[#078BE7] focus:ring-2 focus:ring-[#078BE7]/30"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-primary px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
