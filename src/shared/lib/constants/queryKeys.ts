export const queryKeys = {
  products: (params?: unknown) => ["products", params] as const,
  categories: (params?: unknown) => ["categories", params] as const,
  catalog: (params?: unknown) => ["catalog", params] as const,
  members: (params?: unknown) => ["members", params] as const,
  sales: (params?: unknown) => ["sales", params] as const,
} as const;