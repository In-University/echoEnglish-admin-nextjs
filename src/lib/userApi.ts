import api from "./api";
import { Response } from "@/types/response";

export const getUsers = async (page: number, limit: number, search?: string): Promise<Response<any>> => {
  const res = await api.get(`/users`, { params: { page, limit, search } });
  return res.data;
};

export const createUser = async (data: any): Promise<Response<any>> => {
  const res = await api.post(`/users`, data);
  return res.data;
};

export const updateUser = async (id: string, data: any): Promise<Response<any>> => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const softDeleteUser = async (id: string): Promise<Response<void>> => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
