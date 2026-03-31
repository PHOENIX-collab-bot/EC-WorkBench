export interface OrderQuery {
  pageNo: number;
  pageSize: number;
  orderNo?: string;
  orderStatus?: number;
  customerKeyword?: string;
  startTime?: string;
  endTime?: string;
}

export interface OrderVO {
  id: number;
  orderNo: string;
  orderStatus: number;
  payStatus: number;
  deliveryStatus: number;
  customerName: string;
  customerMobile: string;
  payableAmount: number;
  paidAmount: number;
  createdAt: string;
}

export interface OrderItemVO {
  id: number;
  productId: number;
  productNo: string;
  productName: string;
  skuAttr?: string;
  unitPrice: number;
  quantity: number;
  lineTotalAmount: number;
  itemStatus: number;
}

export interface OrderDetailVO {
  id: number;
  orderNo: string;
  orderStatus: number;
  payStatus: number;
  deliveryStatus: number;
  customerName: string;
  customerMobile: string;
  receiverName: string;
  receiverMobile: string;
  addressDetail: string;
  totalAmount: number;
  payableAmount: number;
  paidAmount: number;
  sellerRemark?: string;
  deliveryTime?: string;
  createdAt: string;
  items: OrderItemVO[];
}
