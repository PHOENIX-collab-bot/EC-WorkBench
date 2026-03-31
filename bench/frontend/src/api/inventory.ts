import request from '@/utils/request';
import type { PageResult } from '@/types/common';
import type { InventoryRecordVO, InventoryWarnVO } from '@/types/inventory';

export function getWarnPageApi(pageNo: number, pageSize: number): Promise<PageResult<InventoryWarnVO>> {
  return request.get('/inventory/warn', { params: { pageNo, pageSize } });
}

export function getInventoryRecordPageApi(params: {
  pageNo: number;
  pageSize: number;
  productId?: number;
  bizType?: number;
  bizNo?: string;
}): Promise<PageResult<InventoryRecordVO>> {
  return request.get('/inventory/records', { params });
}

export function addInventoryRecordApi(data: {
  productId: number;
  bizType: number;
  bizNo?: string;
  changeQty: number;
  remark?: string;
}): Promise<void> {
  return request.post('/inventory/records', data);
}
