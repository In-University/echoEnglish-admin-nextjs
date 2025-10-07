
import api from "./api";

export const getRoles = async (search: string) => {
  const res = await api.get(`/roles`, {
    params: {search },
  });
  return res.data;
};