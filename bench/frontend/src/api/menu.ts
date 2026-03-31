import request from '@/utils/request';
import type { MenuItem } from '@/types/menu';

export function getMyMenusApi(): Promise<MenuItem[]> {
  return request.get('/sys/menus/my');
}
