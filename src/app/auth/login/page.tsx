'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/authApi';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login({ email, password });
      const { access_token, user } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success(response.message || 'Login successful!');
      
      router.push('/admin');
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Đăng nhập thất bại';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Hiệu ứng background nhẹ */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-[600px] h-[600px] bg-cyan-200/30 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>

      {/* Khối login glass */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 w-[380px]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to continue accessing the system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm mb-1 font-medium"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-100 border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 text-gray-800"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm mb-1 font-medium"
            >
              Mật khẩu
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-100 border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 text-gray-800"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-semibold py-2 rounded-xl shadow-lg hover:shadow-indigo-300/40 transition-all duration-300"
          >
            Đăng nhập
          </Button>

          <div className="text-center mt-4 space-y-2">
            <a
              href="/auth/forgot-password"
              className="text-sm text-indigo-500 hover:underline hover:text-indigo-600 transition-colors"
            >
              Forgot password?
            </a>
            <div>
              <span className="text-sm text-gray-500">Don't have an account? </span>
              <a
                href="/auth/register"
                className="text-sm text-indigo-500 hover:underline hover:text-indigo-600 transition-colors"
              >
                Register now
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
