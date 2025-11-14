import type { FetchUsersParams } from "./user.model";

export const fetchUsers = async ({ queryKey }: { queryKey: [string, FetchUsersParams] }) => {
  const [, params] = queryKey;
  const { pageNumber, pageSize } = params;

  const response = await apiClient.get(`/users?page=${pageNumber}&pageSize=${pageSize}`);
  return response.data;
}

export const fetchUser = async ({ queryKey }: { queryKey: [string, number] }) => {
  const [, id] = queryKey;
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
}