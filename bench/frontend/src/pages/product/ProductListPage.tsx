import { useEffect, useState } from 'react';
import { Form, Input, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { getProductPageApi, updateProductStatusApi } from '@/api/product';
import type { ProductQuery, ProductVO } from '@/types/product';
import PermissionButton from '@/components/PermissionButton';

export default function ProductListPage(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductVO[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<ProductQuery>({ pageNo: 1, pageSize: 10 });

  const load = async (): Promise<void> => {
    setLoading(true);
    const res = await getProductPageApi(query);
    setData(res.list);
    setTotal(res.total);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, [query.pageNo, query.pageSize]);

  const columns: ColumnsType<ProductVO> = [
    { title: '商品编码', dataIndex: 'productNo' },
    { title: '商品名称', dataIndex: 'productName' },
    { title: '分类', dataIndex: 'categoryName' },
    { title: '售价', dataIndex: 'salePrice' },
    { title: '库存', dataIndex: 'stockQuantity' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (v: number) => <Tag color={v === 1 ? 'green' : 'default'}>{v === 1 ? '上架' : '下架/草稿'}</Tag>
    },
    {
      title: '操作',
      render: (_, row) => (
        <Space>
          <PermissionButton perm="product:list" size="small" onClick={() => navigate(`/product/edit/${row.id}`)}>编辑</PermissionButton>
          <PermissionButton
            perm="product:list"
            size="small"
            onClick={async () => {
              await updateProductStatusApi(row.id, row.status === 1 ? 0 : 1);
              void load();
            }}
          >
            {row.status === 1 ? '下架' : '上架'}
          </PermissionButton>
        </Space>
      )
    }
  ];

  return (
    <div className="page-card">
      <Form layout="inline" onFinish={(v) => setQuery((q) => ({ ...q, pageNo: 1, productNo: v.productNo, productName: v.productName, status: v.status }))}>
        <Form.Item name="productNo"><Input placeholder="商品编码" /></Form.Item>
        <Form.Item name="productName"><Input placeholder="商品名称" /></Form.Item>
        <Form.Item name="status"><Select style={{ width: 120 }} allowClear options={[{ label: '上架', value: 1 }, { label: '下架', value: 0 }]} /></Form.Item>
        <Form.Item><PermissionButton perm="product:list" type="primary" htmlType="submit">查询</PermissionButton></Form.Item>
        <Form.Item><PermissionButton perm="product:list" onClick={() => navigate('/product/create')}>新增商品</PermissionButton></Form.Item>
      </Form>
      <Table
        style={{ marginTop: 16 }}
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{ current: query.pageNo, pageSize: query.pageSize, total, onChange: (pageNo, pageSize) => setQuery((q) => ({ ...q, pageNo, pageSize })) }}
      />
    </div>
  );
}
