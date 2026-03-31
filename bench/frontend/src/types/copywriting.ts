// 文案风格类型
export interface CopywritingStyle {
  key: string;
  name: string;
  description: string;
  prompt: string;
}

// 可选的文案风格
export const copywritingStyles: CopywritingStyle[] = [
  {
    key: 'grass',
    name: '种草安利',
    description: '真实分享，推荐好物',
    prompt: '请为以下商品写一条抖音种草文案，要求：1) 真实自然，像朋友推荐 2) 突出产品亮点 3) 口语化，有感染力 4) 不超过100字'
  },
  {
    key: 'promo',
    name: '促销爆款',
    description: '限时优惠，刺激购买',
    prompt: '请为以下商品写一条抖音促销文案，要求：1) 突出优惠力度 2) 营造紧迫感 3) 行动号召明确 4) 不超过80字'
  },
  {
    key: 'story',
    name: '故事场景',
    description: '场景代入，引发共鸣',
    prompt: '请为以下商品写一条抖音故事型文案，要求：1) 设定生活场景 2) 引发情感共鸣 3) 自然引出产品 4) 不超过120字'
  },
  {
    key: 'compare',
    name: '对比测评',
    description: '专业分析，突出优势',
    prompt: '请为以下商品写一条抖音对比测评文案，要求：1) 专业客观 2) 突出产品优势 3) 适合成分党 4) 不超过100字'
  },
  {
    key: 'humor',
    name: '幽默风趣',
    description: '搞笑段子，吸引眼球',
    prompt: '请为以下商品写一条抖音幽默文案，要求：1) 风趣搞笑 2) 让人印象深刻 3) 适合年轻群体 4) 不超过100字'
  }
];
