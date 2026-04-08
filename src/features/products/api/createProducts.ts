import axios from "axios";
import { endpoints } from "@/shared/lib/http/endpoints";
import { httpClient } from "@/shared/lib/http/client";
import type { CreateProductRequest, Product } from "../types";

export async function createProduct(payload: CreateProductRequest): Promise<Product> {
  if (!payload.categoryId) {
    throw new Error("카테고리를 선택해야 합니다.");
  }

  if (!payload.supplierId) {
    throw new Error("공급처를 선택해야 합니다.");
  }

  if (!payload.productName.trim()) {
    throw new Error("영문 상품명은 필수입니다.");
  }

  if (!payload.productNameKr.trim()) {
    throw new Error("한글 상품명은 필수입니다.");
  }

  if (payload.retailPrice === "") {
    throw new Error("판매가는 필수입니다.");
  }

  if (!payload.barcode.trim()) {
    throw new Error("바코드는 필수입니다.");
  }

  const category = Number(payload.categoryId);
  const supplier = Number(payload.supplierId);

  if (!Number.isFinite(category)) {
    throw new Error("유효한 카테고리를 선택해야 합니다.");
  }

  if (!Number.isFinite(supplier)) {
    throw new Error("유효한 공급처를 선택해야 합니다.");
  }

  const requestBody = {
    category,
    supplier,
    name_en: payload.productName.trim(),
    name_ko: payload.productNameKr.trim(),
    purchase_price:
      payload.unitCost === "" ? null : Number(payload.unitCost).toFixed(2),
    sale_price: Number(payload.retailPrice).toFixed(2),
    is_weight_based: false,
    is_stock_managed: true,
    stock_quantity: payload.amount === "" ? 0 : Number(payload.amount),
    is_taxable: payload.taxable,
    barcode: payload.barcode.trim(),
    is_fixed_price: true,
    nickname: (payload.productNameKr || payload.productName).trim(),
  };

  console.log("POST body:", requestBody);

  try {
    const response = await httpClient.post<Product>(endpoints.products, requestBody);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("POST status:", error.response?.status);
      console.error("POST error data:", error.response?.data);
    }
    throw error;
  }
}