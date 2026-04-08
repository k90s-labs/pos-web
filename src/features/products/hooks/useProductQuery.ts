import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/constants/queryKeys";
import { getProducts } from "../api/getProducts";
import type {  GetProductParams } from "../types";

export function useProductQuery(params: GetProductParams) {
  return useQuery({
    queryKey: [...queryKeys.products(), params],
    queryFn: () => getProducts(params),
  });
}