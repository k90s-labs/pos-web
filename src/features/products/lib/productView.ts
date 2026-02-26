import type { Product } from "../types";

export function getDisplayName(p: Product) {
  const nick = (p.nickname ?? "").trim();
  return nick || p.name_ko || p.name_en;
}

export function getCurrentPrice(p: Product) {
  // ✅ 백엔드가 이미 current_price를 내려줌
  return Number(p.current_price);
}

export function isDiscountActive(p: Product) {
  return p.is_discount_active;
}