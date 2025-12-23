"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        // Save "Token" to Browser Storage
        localStorage.setItem("adminToken", data.token);
        // Redirect to Dashboard
        router.push("/admin");
      } else {
        setError("Invalid Email or Password");
      }
    } catch (err) {
      setError("Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-900">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="p-8 text-center bg-blue-600">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl backdrop-blur-sm">
            <Lock className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-sm text-blue-100">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-500">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-blue-600"
                placeholder="admin@blue.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-bold uppercase text-slate-500">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {error && (
              <div className="p-3 text-sm font-bold text-center text-red-600 rounded-lg bg-red-50">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 py-4 font-bold text-white transition-all bg-slate-900 rounded-xl hover:bg-slate-800"
            >
              {loading ? "Verifying..." : "Login to Dashboard"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
