export interface Member {
  id: number;
  member_id: string;
  name: string;
  phone_number: string;
  joined_at: string;
  last_visited_at: string | null;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}