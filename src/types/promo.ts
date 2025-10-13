// src/types/promo.ts

export interface PromoCode {
  _id?: string;
  code: string;
  discount: number;
  expiration?: string;
  usageLimit?: number;
  usedCount?: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Dữ liệu dùng cho form tạo / chỉnh sửa mã giảm giá
 */
export interface PromoFormData {
  code: string;
  discount: number;
  expiration?: string;
  usageLimit?: number;
  active?: boolean;
}



