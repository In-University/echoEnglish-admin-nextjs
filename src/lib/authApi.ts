import api from './api';
import { Response } from '@/types/response'; 

export const register = async (data: {
  email: string;
  fullName: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}): Promise<Response<any>> => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const verifyRegistrationOtp = async (
  email: string,
  otp: string
): Promise<Response<any>> => {
  const res = await api.post('/auth/verify-registration-otp', { email, otp });
  return res.data;
};

export const resendRegistrationOtp = async (
  email: string
): Promise<Response<any>> => {
  const res = await api.post('/auth/resend-registration-otp', { email });
  return res.data;
};

export const sendOtp = async (email: string): Promise<Response<any>> => {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<Response<any>> => {
  const res = await api.post('/auth/verify-otp', { email, otp });
  return res.data;
};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
): Promise<Response<any>> => {
  const res = await api.post('/auth/reset-password', {
    email,
    otp,
    newPassword,
  });
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<Response<any>> => {
  const res = await api.post('/auth/login', data);
  return res.data;
};
