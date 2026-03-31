import { useEffect, useState } from 'react';
import { Form, Input, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getCategoryListApi } from '@/api/product';
import type { ProductCategoryVO } from '@/types/product';
import PermissionButton from '@/components/PermissionButton';

export default function ProductCategoryPage(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductCategoryVO[]>([]);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [keyword, setKeyword] = useState('');

  const load = async (s?: number): Promise<void> => {
    setLoading(true);
    const list = await getCategoryListApi(s);
    setData(list);
    setLoading(false);
  };

  useEffect(() => {
    void load(status);
  }, [status]);

  const columns: ColumnsType<ProductCategoryVO> = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '分类名称', dataIndex: 'categoryName' },
    { title: '分类编码', dataIndex: 'categoryCode' },
    { title: '父级ID', dataIndex: 'parentId', width: 100 },
    { title: '层级', dataIndex: 'levelNo', width: 80 },
    { title: '排序', dataIndex: 'sortNo', width: 80 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (v: number) => <Tag color={v === 1 ? 'green' : 'default'}>{v === 1 ? '启用' : '停用'}</Tag>
    }
  ];

  const filtered = keyword
    ? data.filter((x) => x.categoryName?.includes(keyword) || x.categoryCode?.includes(keyword))
    : data;

  return (
    <div className="page-card">
      <Form layout="inline" onFinish={(v) => { setKeyword(v.keyword || ''); setStatus(v.status); }}>
        <Form.Item name="keyword"><Input placeholder="分类名称/编码" allowClear /></Form.Item>
        <Form.Item name="status">
          <Select style={{ width: 120 }} allowClear options={[{ label: '启用', value: 1 }, { label: '停用', value: 0 }]} />
        </Form.Item>
        <Form.Item><PermissionButton perm="product:category:list" type="primary" htmlType="submit">查询</PermissionButton></Form.Item>
        <Form.Item><PermissionButton perm="product:category:list" onClick={() => { setKeyword(''); setStatus(undefined); void load(undefined); }}>重置</PermissionButton></Form.Item>
      </Form>
      <Table
        style={{ marginTop: 16 }}
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={filtered}
        pagination={false}
      />
    </div>
  );
}
