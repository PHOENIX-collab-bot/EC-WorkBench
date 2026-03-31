import request from '@/utils/request';

export { copywritingStyles } from '@/types/copywriting';
export type { CopywritingStyle } from '@/types/copywriting';

export interface CopywritingRequest {
  productName: string;
  salePrice: number;
  categoryName?: string;
  brandName?: string;
  productNo?: string;
  style: string;
  prompt: string;
}

// 调用后端API生成文案（后端代理DeepSeek调用，解决跨域问题）
export async function generateCopywriting(data: CopywritingRequest): Promise<string> {
  console.log('[Copywriting] 调用后端API生成文案...');
  const result = await request.post<string>('/ai/copywriting/generate', data, { timeout: 60000 });
  console.log('[Copywriting] 生成成功:', result);
  return result;
}
