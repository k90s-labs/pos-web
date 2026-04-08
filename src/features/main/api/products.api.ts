// features/products/api/products.api.ts

import { httpClient } from "@/shared/lib/http/client";
import { endpoints } from "@/shared/lib/http/endpoints";
import type { Product } from "../types";

export const productsApi = {
  list: async (params?: any) => {
    const res = await httpClient.get(endpoints.products, { params });
    return res.data.results;
  },

  create: async (body: Partial<Product>) => {
    const res = await httpClient.post(endpoints.products, body);
    return res.data;
  },

  update: async (id: number, body: Partial<Product>) => {
    const res = await httpClient.put(`${endpoints.products}${id}/`, body);
    return res.data;
  },

  delete: async (id: number) => {
    await httpClient.delete(`${endpoints.products}${id}/`);
  },
};