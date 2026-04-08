import type { Supplier } from "../types";

export const mockSuppliers: Supplier[] = [
  { id: "1", name: "UNIMART" },
  { id: "2", name: "SNACK FACTORY" },
  { id: "3", name: "SEOUL FOOD" },
  { id: "4", name: "ORGANIC FARM" },
  { id: "5", name: "DAILY GROCERY" },
  { id: "6", name: "COFFEE HOUSE" },
];

export async function getSuppliers(): Promise<Supplier[]> {
  return Promise.resolve(mockSuppliers);
}