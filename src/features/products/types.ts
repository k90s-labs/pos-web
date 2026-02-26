export type Product = {
  id: number;

  category: number;      // 입력용(보통 숫자로 옴)
  category_id: number;   // 출력 편의
  supplier: number;
  supplier_id: number;

  name_en: string;
  name_ko: string;

  purchase_price: string | null;
  sale_price: string;

  is_discount_active: boolean;
  discount_price: string | null;
  discount_start_at: string | null;
  discount_end_at: string | null;
  current_price: string; // ✅ serializer에 포함됨

  is_weight_based: boolean;
  weight_kg: string | null;

  is_stock_managed: boolean;
  stock_quantity: number | null;

  is_taxable: boolean;
  barcode: string;
  is_fixed_price: boolean;
  nickname: string | null;

  created_at: string;
  updated_at: string;
};