"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Send OTP to:", email);
    // TODO: Gọi API gửi OTP
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Quên mật khẩu
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Nhập email để nhận mã OTP
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Gửi OTP
          </Button>

          <p className="text-center text-sm mt-3">
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Quay lại đăng nhập
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
