import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/authApi';
import { toast } from 'sonner';

export interface RegistrationData {
  email: string;
  fullName: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}

export interface RegistrationErrors {
  email?: string;
  fullName?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  address?: string;
  general?: string;
}

export const useRegistration = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegistrationErrors>({});

  const validateForm = useCallback((formData: any): RegistrationErrors => {
    const newErrors: RegistrationErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    } else if (formData.fullName.length > 100) {
      newErrors.fullName = 'Full name must not exceed 100 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (formData.password.length > 100) {
      newErrors.password = 'Password must not exceed 100 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phoneNumber && !/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format (e.g., 0912345678)';
    }

    return newErrors;
  }, []);

  const submitRegistration = useCallback(
    async (formData: any) => {
      setErrors({});

      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
      }

      setLoading(true);
      try {
        const { confirmPassword, ...registerData } = formData;
        const response = await register(registerData);

        toast.success(response.message || 'Account created! Check your email for OTP.');

        // Store email in localStorage for OTP verification
        localStorage.setItem('registration_email', formData.email);
        localStorage.setItem('registration_data', JSON.stringify(registerData));

        // Redirect to OTP verification page
        setTimeout(() => {
          router.push(
            `/auth/verify-registration?email=${encodeURIComponent(formData.email)}`
          );
        }, 1500);

        return true;
      } catch (err: any) {
        console.error('Registration error:', err);
        const errorMessage =
          err.response?.data?.message || 'Registration failed. Please try again.';
        setErrors({ general: errorMessage });
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [validateForm, router]
  );

  return {
    loading,
    errors,
    submitRegistration,
    validateForm,
  };
};
