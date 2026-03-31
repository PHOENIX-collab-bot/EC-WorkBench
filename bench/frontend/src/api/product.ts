import request from '@/utils/request';
import type { PageResult } from '@/types/common';
import type { ProductCategoryVO, ProductDetailVO, ProductForm, ProductQuery, ProductVO } from '@/types/product';

export function getProductPageApi(params: ProductQuery): Promise<PageResult<ProductVO>> {
  return request.get('/products', { params });
}

export function getProductDetailApi(id: number): Promise<ProductDetailVO> {
  return request.get(`/products/${id}`);
}

export function createProductApi(data: ProductForm): Promise<void> {
  return request.post('/products', data);
}

export function updateProductApi(id: number, data: ProductForm): Promise<void> {
  return request.put(`/products/${id}`, data);
}

export function updateProductStatusApi(id: number, status: number): Promise<void> {
  return request.put(`/products/${id}/status`, { status });
}

export function deleteProductApi(id: number): Promise<void> {
  return request.delete(`/products/${id}`);
}

export function getCategoryListApi(status?: number): Promise<ProductCategoryVO[]> {
  return request.get('/product-categories', { params: { status } });
}
