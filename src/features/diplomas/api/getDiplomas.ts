import { api } from "@/services/api/axios";
import type { GetDiplomasResponse } from "../types/diploma";

export async function getDiplomas({
  page = 1,
  limit = 9,
  search = "",
  sort = "",
  immutable = "all",
}: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  immutable?: string;
} = {}) {
  const params: any = { page, limit };
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (immutable !== "all") params.immutable = immutable;

  const response = await api.get<GetDiplomasResponse>("/diplomas", {
    params,
  });

  return response.data;
}