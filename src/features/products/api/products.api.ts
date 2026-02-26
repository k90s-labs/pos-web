// features/products/api/products.api.ts

import { http } from "@/shared/lib/http/client";
import { endpoints } from "@/shared/lib/http/endpoints";
import type { Product } from "../types";

export const productsApi = {
  list: async (params?: any) => {
    const res = await http.get(endpoints.products, { params });
    return res.data.results;
  },

  create: async (body: Partial<Product>) => {
    const res = await http.post(endpoints.products, body);
    return res.data;
  },

  update: async (id: number, body: Partial<Product>) => {
    const res = await http.put(`${endpoints.products}${id}/`, body);
    return res.data;
  },

  delete: async (id: number) => {
    await http.delete(`${endpoints.products}${id}/`);
  },
};