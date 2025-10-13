import api from "./api";
import { Response } from "@/types/response";


export const getPromos = async (page: number, limit: number, filters?: any): Promise<Response<any>> => {
  const res = await api.get(`/promo`, {
    params: { page, limit, ...filters },
  });
  if (filters.active === '' || filters.active === undefined) delete filters.active;
  if (filters.minDiscount === '' || filters.minDiscount === undefined) delete filters.minDiscount;
  if (filters.maxDiscount === '' || filters.maxDiscount === undefined) delete filters.maxDiscount;
  return res.data;
};

export const createPromo = async (data: any) => {
  const res = await api.post(`/promo`, data);
  return res.data;
};

export const updatePromo = async (id: string, data: any) => {
  const res = await api.put(`/promo/${id}`, data);
  return res.data;
};

export const deletePromo = async (id: string) => {
  const res = await api.delete(`/promo/${id}`);
  return res.data;
};