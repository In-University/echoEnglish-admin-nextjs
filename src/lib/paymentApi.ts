import { Response } from '@/types/response';
import api from './api';

export const getPayments = async (
  page: number,
  limit: number,
  filters?: any
): Promise<Response<any>> => {
  const params: any = { page, limit, ...filters };

  Object.keys(params).forEach(
    (k) => (params[k] === '' || params[k] === undefined) && delete params[k]
  );

  const res = await api.get('/payments', { params });
  return res.data;
};
