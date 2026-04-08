import type { Category } from "../types";

export const mockCategories: Category[] = [
  { id: "all", name: "All" },
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
  { id: "3", name: "Category 3" },
];

export async function getCategories(): Promise<Category[]> {
  return Promise.resolve(mockCategories);
}