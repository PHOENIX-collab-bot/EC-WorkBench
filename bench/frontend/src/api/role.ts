import request from '@/utils/request';
import type { RoleVO } from '@/types/rbac';

export function getRoleListApi(): Promise<RoleVO[]> {
  return request.get('/sys/roles');
}
