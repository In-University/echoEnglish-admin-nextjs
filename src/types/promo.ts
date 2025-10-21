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
 * Data used for create / edit promo code form
 */
export interface PromoFormData {
  code: string;
  discount: number;
  expiration?: string;
  usageLimit?: number;
  active?: boolean;
}
