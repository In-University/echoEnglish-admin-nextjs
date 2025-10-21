'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRegistration } from '@/hooks/useRegistration';
import { toast } from 'sonner';

export default function RegisterPage() {
  const { loading, errors, submitRegistration } = useRegistration();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitRegistration(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-green-200/30 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>

      {/* Register card */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 w-[420px]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Create Account 🚀
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Join Echo English and improve your English skills
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-gray-50 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-300 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              name="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full bg-gray-50 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-300 ${
                errors.fullName ? 'border-red-500' : ''
              }`}
            />
            {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Min 8 characters"
              value={formData.password}
              onChange={handleChange}
              className={`w-full bg-gray-50 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-300 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full bg-gray-50 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-300 ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Phone Number (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="+84 123456789"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full bg-gray-50 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-300 ${
                errors.phoneNumber ? 'border-red-500' : ''
              }`}
            />
            {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Address (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address (Optional)
            </label>
            <Input
              type="text"
              name="address"
              placeholder="Your address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Error message */}
          {errors.general && (
            <p className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-lg">
              {errors.general}
            </p>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-green-300/40 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-green-500 font-semibold hover:text-green-600 transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
