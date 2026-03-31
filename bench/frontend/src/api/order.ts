import request from '@/utils/request';
import type { PageResult } from '@/types/common';
import type { OrderDetailVO, OrderQuery, OrderVO } from '@/types/order';

export function getOrderPageApi(params: OrderQuery): Promise<PageResult<OrderVO>> {
  return request.get('/orders', { params });
}

export function getOrderDetailApi(id: number): Promise<OrderDetailVO> {
  return request.get(`/orders/${id}`);
}

export function updateOrderStatusApi(id: number, orderStatus: number): Promise<void> {
  return request.put(`/orders/${id}/status`, { orderStatus });
}

export function deliverOrderApi(id: number, payload: { logisticsCompany: string; logisticsNo: string; sellerRemark?: string }): Promise<void> {
  return request.put(`/orders/${id}/delivery`, payload);
}
