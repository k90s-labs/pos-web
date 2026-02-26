export type ApiList<T> = T[];

// pagination 쓰면 이걸로
export type ApiPaginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export function unwrapList<T>(data: any): T[] {
  // DRF pagination( results ) 이면 results 반환, 아니면 그대로 배열로 가정
  if (data && Array.isArray(data.results)) return data.results;
  return data as T[];
}