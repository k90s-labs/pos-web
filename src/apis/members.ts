// src/apis/members.ts
import api from "./client";
import type { Member, PaginatedResponse } from "../types/member";

export interface CreateMemberPayload {
  name: string;
  phone_number: string;
  prefix?: string;      
  member_id?: string;   
}

export interface FetchMembersParams {
  search?: string;
  page?: number;
}

// Fetch members with optional search and pagination
export async function fetchMembers(params: FetchMembersParams = {}) {
  const response = await api.get<PaginatedResponse<Member>>("/members/", {
    params: {
      search: params.search,
      ordering: "-joined_at",
      page: params.page,
    },
  });

  return response.data; // { count, next, previous, results }
}

// Create a new member
export async function createMember(payload: CreateMemberPayload) {
  const response = await api.post<Member>("/members/", payload);
  return response.data;
}

// Add points to a member
export async function addMemberPoints(memberId: number, points: number) {
  const response = await api.post<Member>(
    `/members/${memberId}/add-points/`,
    { points },
  );
  return response.data;
}

// Generate a unique member ID based on a given prefix
export async function generateMemberId(prefix: string) {
  const response = await api.get<{ member_id: string }>(
    "/members/generate-id/",
    {
      params: { prefix },
    },
  );
  return response.data.member_id;
}
