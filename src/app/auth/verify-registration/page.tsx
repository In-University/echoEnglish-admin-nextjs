'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { OTPVerification } from '@/components/otp-verification';
import { verifyRegistrationOtp, resendRegistrationOtp } from '@/lib/authApi';

export default function VerifyRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleVerify = async (otp: string) => {
    const response = await verifyRegistrationOtp(email, otp);
    
    // Store user data if returned
    if (response.data?.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    // Clear registration temporary data
    localStorage.removeItem('registration_email');
    localStorage.removeItem('registration_data');

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  };

  const handleResend = async () => {
    await resendRegistrationOtp(email);
  };

  const handleCancel = () => {
    router.push('/auth/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-green-200/30 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>

      <OTPVerification
        email={email}
        onVerify={handleVerify}
        onResend={handleResend}
        onCancel={handleCancel}
      />
    </div>
  );
}
