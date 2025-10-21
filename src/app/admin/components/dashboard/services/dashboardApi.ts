import api from '@/lib/api';
import type {
  UserStatsResponse,
  TestStatsResponse,
  PaymentStatsResponse,
  ResourceStatsResponse,
  DashboardDateRange,
} from '../types/dashboard.types';

export const getUserGrowthStats = async (params: DashboardDateRange = {}): Promise<UserStatsResponse> => {
  const searchParams = new URLSearchParams();

  if (params.from) searchParams.append('from', params.from);
  if (params.to) searchParams.append('to', params.to);
  if (params.by) searchParams.append('by', params.by);

  const response = await api.get(`/dashboard/user-stats${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  return response.data;
};

export const getTestStats = async (params: DashboardDateRange = {}): Promise<TestStatsResponse> => {
  const searchParams = new URLSearchParams();

  if (params.from) searchParams.append('from', params.from);
  if (params.to) searchParams.append('to', params.to);
  if (params.by) searchParams.append('by', params.by);

  const response = await api.get(`/dashboard/test-stats${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  return response.data;
};

export const getPaymentStats = async (params: DashboardDateRange = {}): Promise<PaymentStatsResponse> => {
  const searchParams = new URLSearchParams();

  if (params.from) searchParams.append('from', params.from);
  if (params.to) searchParams.append('to', params.to);
  if (params.by) searchParams.append('by', params.by);

  const response = await api.get(`/dashboard/payment-stats${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
  return response.data;
};

export const getResourceStats = async (): Promise<ResourceStatsResponse> => {
  const response = await api.get('/dashboard/resource-stats');
  return response.data;
};
