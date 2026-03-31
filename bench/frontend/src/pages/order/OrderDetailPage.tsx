import { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Form, Input, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useParams } from 'react-router-dom';
import { deliverOrderApi, getOrderDetailApi } from '@/api/order';
import type { OrderDetailVO, OrderItemVO } from '@/types/order';

export default function OrderDetailPage(): JSX.Element {
  const { id } = useParams();
  const [detail, setDetail] = useState<OrderDetailVO | null>(null);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<{ logisticsCompany: string; logisticsNo: string; sellerRemark?: string }>();

  const load = async (): Promise<void> => {
    const data = await getOrderDetailApi(Number(id));
    setDetail(data);
  };

  useEffect(() => { void load(); }, [id]);

  const columns: ColumnsType<OrderItemVO> = [
    { title: '商品', dataIndex: 'productName' },
    { title: '单价', dataIndex: 'unitPrice' },
    { title: '数量', dataIndex: 'quantity' },
    { title: '小计', dataIndex: 'lineTotalAmount' }
  ];

  return (
    <div className="page-card">
      <Card title="订单信息" extra={<Space><Button onClick={() => setOpen(true)}>发货</Button></Space>}>
        <Descriptions column={2}>
          <Descriptions.Item label="订单号">{detail?.orderNo}</Descriptions.Item>
          <Descriptions.Item label="状态">{detail?.orderStatus}</Descriptions.Item>
          <Descriptions.Item label="买家">{detail?.customerName}</Descriptions.Item>
          <Descriptions.Item label="手机">{detail?.customerMobile}</Descriptions.Item>
          <Descriptions.Item label="收货人">{detail?.receiverName}</Descriptions.Item>
          <Descriptions.Item label="地址">{detail?.addressDetail}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="商品明细" style={{ marginTop: 16 }}>
        <Table rowKey="id" columns={columns} dataSource={detail?.items || []} pagination={false} />
      </Card>

      <Modal open={open} title="订单发货" onCancel={() => setOpen(false)} onOk={async () => {
        const values = await form.validateFields();
        await deliverOrderApi(Number(id), values);
        setOpen(false);
        void load();
      }}>
        <Form form={form} layout="vertical">
          <Form.Item label="物流公司" name="logisticsCompany" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="物流单号" name="logisticsNo" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="备注" name="sellerRemark"><Input.TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
