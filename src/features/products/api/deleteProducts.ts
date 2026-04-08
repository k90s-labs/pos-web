import { endpoints } from "@/shared/lib/http/endpoints";
import { httpClient } from "@/shared/lib/http/client";

export async function deleteProduct(ProductId: number): Promise<void> {
  await httpClient.delete(`${endpoints.products}${ProductId}/`);
}