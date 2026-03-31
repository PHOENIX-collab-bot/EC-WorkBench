import { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getOrderPageApi, updateOrderStatusApi } from '@/api/order';
import type { OrderQuery, OrderVO } from '@/types/order';
import PermissionButton from '@/components/PermissionButton';

export default function OrderListPage(): JSX.Element {
  const navigate = useNavigate();
  const [query, setQuery] = useState<OrderQuery>({ pageNo: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OrderVO[]>([]);
  const [total, setTotal] = useState(0);

  const load = async (): Promise<void> => {
    setLoading(true);
    const res = await getOrderPageApi(query);
    setData(res.list);
    setTotal(res.total);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, [query.pageNo, query.pageSize]);

  const columns: ColumnsType<OrderVO> = [
    { title: '订单号', dataIndex: 'orderNo' },
    { title: '买家', dataIndex: 'customerName' },
    { title: '手机号', dataIndex: 'customerMobile' },
    { title: '应付', dataIndex: 'payableAmount' },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      render: (v: number) => <Tag>{['待付款', '待发货', '待收货', '已完成', '已取消', '售后中'][v] || v}</Tag>
    },
    {
      title: '操作',
      render: (_, row) => (
        <Space>
          <PermissionButton perm="order:list" size="small" onClick={() => navigate(`/order/detail/${row.id}`)}>详情</PermissionButton>
          <PermissionButton perm="order:list" size="small" onClick={async () => { await updateOrderStatusApi(row.id, 3); void load(); }}>完成</PermissionButton>
        </Space>
      )
    }
  ];

  return (
    <div className="page-card">
      <Form layout="inline" onFinish={(v) => {
        const range = v.timeRange as [dayjs.Dayjs, dayjs.Dayjs] | undefined;
        setQuery((q) => ({
          ...q,
          pageNo: 1,
          orderNo: v.orderNo,
          orderStatus: v.orderStatus,
          customerKeyword: v.customerKeyword,
          startTime: range?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
          endTime: range?.[1]?.format('YYYY-MM-DD HH:mm:ss')
        }));
      }}>
        <Form.Item name="orderNo"><Input placeholder="订单号" /></Form.Item>
        <Form.Item name="orderStatus"><Select style={{ width: 120 }} allowClear options={[0, 1, 2, 3, 4, 5].map((n) => ({ label: n, value: n }))} /></Form.Item>
        <Form.Item name="customerKeyword"><Input placeholder="用户(姓名/手机)" /></Form.Item>
        <Form.Item name="timeRange"><DatePicker.RangePicker showTime /></Form.Item>
        <Form.Item><PermissionButton perm="order:list" type="primary" htmlType="submit">查询</PermissionButton></Form.Item>
      </Form>
      <Table
        rowKey="id"
        style={{ marginTop: 16 }}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ current: query.pageNo, pageSize: query.pageSize, total, onChange: (pageNo, pageSize) => setQuery((q) => ({ ...q, pageNo, pageSize })) }}
      />
    </div>
  );
}
