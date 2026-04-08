import { endpoints } from "@/shared/lib/http/endpoints";
import { httpClient } from "@/shared/lib/http/client";
import type { GetProductParams, GetProductResponse, Product } from "../types";

interface ProductApiItem {
  id: number;
  category: number;
  category_id: number;
  supplier: number;
  supplier_id: number;
  name_en: string;
  name_ko: string;
  purchase_price: string;
  sale_price: string;
  is_discount_active: boolean;
  discount_price: string;
  discount_start_at: string;
  discount_end_at: string;
  current_price: string;
  is_weight_based: boolean;
  weight_kg: string;
  is_stock_managed: boolean;
  stock_quantity: number;
  is_taxable: boolean;
  barcode: string;
  is_fixed_price: boolean;
  nickname: string;
  created_at: string;
  updated_at: string;
}

interface ProductsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductApiItem[];
}

function formatDate(value: string): string {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export async function getProducts(
  params: GetProductParams,
): Promise<GetProductResponse> {
  const response = await httpClient.get<ProductsApiResponse>(endpoints.products, {
    params,
  });

  const results = Array.isArray(response.data.results)
    ? response.data.results
    : [];

  const products: Product[] = results.map((product) => ({
    id: product.id,
    nameEn: product.name_en,
    nameKr: product.name_ko,
    price: Number(product.sale_price ?? 0),
    stockQty: product.stock_quantity ?? 0,
    lastSold: formatDate(product.created_at),
    categoryId: String(product.category_id ?? ""),
    supplierId: String(product.supplier_id ?? ""),
    color: "#22c55e",
    taxable: product.is_taxable ?? true,
    visibleInSales: true,
  }));

  return {
    products,
    total: response.data.count ?? 0,
    page: params.page ?? 1,
    size: params.size ?? 30,
  };
}