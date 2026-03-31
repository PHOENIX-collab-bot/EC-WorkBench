export interface InventoryWarnVO {
  productId: number;
  productNo: string;
  productName: string;
  stockQuantity: number;
  stockWarnThreshold: number;
  status: number;
}

export interface InventoryRecordVO {
  id: number;
  recordNo: string;
  productId: number;
  productNo: string;
  productName: string;
  bizType: number;
  bizNo?: string;
  changeQty: number;
  stockBefore: number;
  stockAfter: number;
  operatorId: number;
  operateTime: string;
  remark?: string;
}
