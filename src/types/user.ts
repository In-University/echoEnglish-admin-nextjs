// src/types/user.ts

export interface Role {
  _id: string;
  name: string;
  description?: string;
  permissions?: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  gender?: Gender;
  image?: string;
  roles: Role[] | string[];
  credits?: number;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserFormData {
  fullName: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  gender?: Gender | "";
  role?: string; // "admin" | "user"
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  totalItems?: number;
}
