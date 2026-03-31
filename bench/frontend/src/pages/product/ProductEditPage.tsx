import { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Modal, Select, Space, Spin, Tag, Typography, message } from 'antd';
import { BulbOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { createProductApi, getCategoryListApi, getProductDetailApi, updateProductApi } from '@/api/product';
import { copywritingStyles, generateCopywriting, type CopywritingStyle } from '@/api/copywriting';
import type { ProductCategoryVO, ProductForm } from '@/types/product';

const { Text, Paragraph } = Typography;

export default function ProductEditPage(): JSX.Element {
  const [form] = Form.useForm<ProductForm>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ProductCategoryVO[]>([]);

  // 文案生成相关状态
  const [copywritingVisible, setCopywritingVisible] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<CopywritingStyle | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getCategoryListApi(1).then(setCategories);
    if (id) {
      getProductDetailApi(Number(id)).then((res) => form.setFieldsValue(res));
    }
  }, [form, id]);

  const onSubmit = async (): Promise<void> => {
    const values = await form.validateFields();
    if (id) {
      await updateProductApi(Number(id), values);
    } else {
      await createProductApi(values);
    }
    navigate('/product/list');
  };

  // 打开文案生成弹窗
  const openCopywritingModal = (): void => {
    const values = form.getFieldsValue();
    if (!values.productName) {
      message.warning('请先填写商品名称');
      return;
    }
    if (!values.salePrice || Number(values.salePrice) <= 0) {
      message.warning('请先填写有效销售价（大于0）');
      return;
    }
    setSelectedStyle(null);
    setGeneratedContent('');
    setCopywritingVisible(true);
  };

  // 生成文案
  const handleGenerate = async (style: CopywritingStyle): Promise<void> => {
    const values = form.getFieldsValue();
    setSelectedStyle(style);
    setGenerating(true);
    setGeneratedContent('');

    try {
      const result = await generateCopywriting({
        productName: values.productName,
        salePrice: Number(values.salePrice),
        categoryName: categories.find((c) => c.id === values.categoryId)?.categoryName,
        brandName: values.brandName,
        productNo: values.productNo,
        style: style.key,
        prompt: style.prompt
      });
      setGeneratedContent(result);
    } catch {
      // 错误已由API模块处理
    } finally {
      setGenerating(false);
    }
  };

  // 复制文案
  const handleCopy = (): void => {
    navigator.clipboard.writeText(generatedContent).then(() => {
      setCopied(true);
      message.success('文案已复制到剪贴板');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <Card className="page-card" title={id ? '编辑商品' : '新增商品'}>
        <Form form={form} layout="vertical" initialValues={{ unitName: '件', stockQuantity: 0, stockWarnThreshold: 10 }}>
          {!id && <Form.Item label="商品编码" name="productNo" rules={[{ required: true }]}><Input /></Form.Item>}
          <Form.Item label="商品名称" name="productName" rules={[{ required: true }]}>
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item label="分类" name="categoryId" rules={[{ required: true }]}>
            <Select options={categories.map((c) => ({ label: c.categoryName, value: c.id }))} />
          </Form.Item>
          <Form.Item label="销售价" name="salePrice" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
          <Form.Item label="成本价" name="costPrice" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
          <Form.Item label="市场价" name="marketPrice" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
          <Form.Item label="库存" name="stockQuantity"><InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
          <Form.Item label="预警值" name="stockWarnThreshold"><InputNumber style={{ width: '100%' }} min={0} /></Form.Item>
          <Form.Item label="备注" name="remark"><Input.TextArea rows={3} /></Form.Item>
          <Space>
            <Button type="primary" onClick={() => void onSubmit()}>保存</Button>
            <Button onClick={() => navigate(-1)}>返回</Button>
            {/* AI文案生成按钮 */}
            <Button icon={<BulbOutlined />} onClick={() => void openCopywritingModal()}>
              AI文案生成
            </Button>
          </Space>
        </Form>
      </Card>

      {/* AI文案生成弹窗 */}
      <Modal
        title={
          <Space>
            <BulbOutlined style={{ color: '#faad14' }} />
            <span>抖音电商文案生成</span>
          </Space>
        }
        open={copywritingVisible}
        onCancel={() => setCopywritingVisible(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        {/* 风格选择 */}
        <div style={{ marginBottom: 16 }}>
          <Text strong style={{ display: 'block', marginBottom: 12 }}>选择文案风格</Text>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {copywritingStyles.map((style) => (
              <Tag
                key={style.key}
                style={{
                  padding: '6px 12px',
                  fontSize: 13,
                  cursor: 'pointer',
                  border: selectedStyle?.key === style.key ? '2px solid #1890ff' : '1px solid #d9d9d9',
                  background: selectedStyle?.key === style.key ? '#e6f7ff' : '#fff'
                }}
                onClick={() => void handleGenerate(style)}
              >
                {selectedStyle?.key === style.key && <CheckOutlined style={{ marginRight: 4 }} />}
                {style.name}
              </Tag>
            ))}
          </div>
          {selectedStyle && (
            <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>
              {selectedStyle.description}
            </Text>
          )}
        </div>

        {/* 生成中的加载状态 */}
        {generating && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin tip="AI正在生成文案，请稍候..." />
          </div>
        )}

        {/* 生成的文案展示 */}
        {!generating && generatedContent && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text strong>生成结果</Text>
              <Button
                type="text"
                icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                onClick={handleCopy}
                size="small"
              >
                {copied ? '已复制' : '复制文案'}
              </Button>
            </div>
            <Card
              size="small"
              style={{
                background: '#fafafa',
                border: '1px solid #e8e8e8',
                borderRadius: 8
              }}
              styles={{ body: { padding: '16px' } }}
            >
              <Paragraph
                style={{ margin: 0, fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
                copyable={{ text: generatedContent }}
              >
                {generatedContent}
              </Paragraph>
            </Card>
          </div>
        )}

        {/* 提示信息 */}
        {!generating && !generatedContent && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#999' }}>
            <Text type="secondary">点击上方风格标签，即可生成对应风格的抖音文案</Text>
          </div>
        )}
      </Modal>
    </>
  );
}
