"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/authApi";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await resetPassword(email, otp, password);
      console.log(res.message);
      router.push("/auth/login");
    } catch (err) {
      setError("Failed to reset password. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>

      <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 w-[380px]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Reset Password 🔑
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter a new password for <b>{email}</b>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-xl shadow-lg hover:shadow-indigo-300/40 transition-all duration-300"
          >
            Confirm Reset
          </Button>
        </form>
      </div>
    </div>
  );
}
