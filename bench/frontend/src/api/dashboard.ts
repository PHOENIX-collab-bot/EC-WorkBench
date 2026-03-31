import request from '@/utils/request';
import type { DashboardMetrics } from '@/types/dashboard';

export function getDashboardMetricsApi(): Promise<DashboardMetrics> {
  return request.get('/dashboard/metrics');
}
