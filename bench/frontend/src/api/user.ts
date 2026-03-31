import request from '@/utils/request';
import type { PageResult } from '@/types/common';
import type { UserVO } from '@/types/rbac';

export function getUserPageApi(pageNo: number, pageSize: number): Promise<PageResult<UserVO>> {
  return request.get('/sys/users', { params: { pageNo, pageSize } });
}

export function updateUserApi(id: number, data: { nickname: string; mobile: string; status: number; password?: string; roleIds: number[] }): Promise<void> {
  return request.put(`/sys/users/${id}`, data);
}

export function deleteUserApi(id: number): Promise<void> {
  return request.delete(`/sys/users/${id}`);
}
