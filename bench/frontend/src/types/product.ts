
export interface ProductQuery {
  pageNo: number;
  pageSize: number;
  productNo?: string;
  productName?: string;
  categoryId?: number;
  status?: number;
}

export interface ProductVO {
  id: number;
  productNo: string;
  productName: string;
  categoryId: number;
  categoryName?: string;
  salePrice: number;
  stockQuantity: number;
  stockWarnThreshold: number;
  status: number;
  createdAt: string;
}

export interface ProductDetailVO {
  id: number;
  productNo: string;
  categoryId: number;
  categoryName?: string;
  productName: string;
  subTitle?: string;
  brandName?: string;
  unitName?: string;
  mainImage?: string;
  salePrice: number;
  costPrice: number;
  marketPrice: number;
  stockQuantity: number;
  stockWarnThreshold: number;
  status: number;
  auditStatus: number;
  remark?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductForm {
  productNo?: string;
  categoryId: number;
  productName: string;
  subTitle?: string;
  brandName?: string;
  unitName?: string;
  mainImage?: string;
  salePrice: number;
  costPrice: number;
  marketPrice: number;
  stockQuantity: number;
  stockWarnThreshold: number;
  remark?: string;
}

export interface ProductCategoryVO {
  id: number;
  parentId: number;
  categoryName: string;
  categoryCode: string;
  levelNo: number;
  sortNo: number;
  status: number;
}
