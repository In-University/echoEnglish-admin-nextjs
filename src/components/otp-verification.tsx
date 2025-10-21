'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { OTPInput, OTPInputGroup, OTPInputSlot } from '@/components/ui/otp';
import { toast } from 'sonner';

interface OTPVerificationProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
  resendButtonText?: string;
  verifyButtonText?: string;
  cancelButtonText?: string;
  otpLength?: number;
}

export const OTPVerification = ({
  email,
  onVerify,
  onResend,
  onCancel,
  title = 'Verify Your Email ✉️',
  subtitle = "We've sent a verification code to:",
  resendButtonText = 'Resend OTP',
  verifyButtonText = 'Verify Code',
  cancelButtonText = 'Register again',
  otpLength = 6,
}: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Timer for resend button
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setError('');
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const numbers = pastedText.replace(/\D/g, '').slice(0, otpLength);
    handleOtpChange(numbers);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email not found. Please try again.');
      return;
    }

    if (!otp || otp.length !== otpLength) {
      setError(`Please enter a valid ${otpLength}-digit OTP`);
      return;
    }

    setLoading(true);
    try {
      await onVerify(otp);
      toast.success('Email verified successfully!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Verification failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError('Email not found. Please try again.');
      return;
    }

    setResending(true);
    setError('');
    try {
      await onResend();
      toast.success('OTP resent to your email');
      setResendTimer(60); // 60 seconds cooldown
      setOtp('');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Resend OTP error:', err);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 w-[420px]">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          {title}
        </h1>
        <p className="text-gray-600 text-sm mt-3">
          {subtitle}
        </p>
        <p className="text-gray-800 font-medium text-sm mt-1 break-all">
          {email}
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        {/* OTP Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Enter OTP Code
          </label>
          <OTPInput
            maxLength={otpLength}
            value={otp}
            onChange={handleOtpChange}
            onPaste={handlePaste}
            disabled={loading}
            containerClassName="justify-center gap-3"
          >
            <OTPInputGroup>
              {Array.from({ length: otpLength }).map((_, index) => (
                <OTPInputSlot
                  key={index}
                  index={index}
                  className="w-12 h-14 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-300 transition-all"
                />
              ))}
            </OTPInputGroup>
          </OTPInput>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Enter the {otpLength}-digit code sent to your email. Code expires in 5 minutes.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Verify button */}
        <Button
          type="submit"
          disabled={loading || otp.length !== otpLength}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-green-300/40 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : verifyButtonText}
        </Button>

        {/* Resend section */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600">
            Didn&apos;t receive the code?
          </p>
          <Button
            type="button"
            onClick={handleResendOtp}
            disabled={resending || resendTimer > 0}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-2 rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
          >
            {resending
              ? 'Sending...'
              : resendTimer > 0
              ? `Resend in ${resendTimer}s`
              : resendButtonText}
          </Button>
        </div>

        {/* Cancel/Back button */}
        <div className="text-center">
          <Button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-100 text-gray-700 font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            {cancelButtonText}
          </Button>
        </div>
      </form>

      {/* Info box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700">
          <span className="font-semibold">💡 Tip:</span> Check your spam folder if you don&apos;t see the email.
        </p>
      </div>
    </div>
  );
};
