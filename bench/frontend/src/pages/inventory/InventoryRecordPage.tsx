import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { addInventoryRecordApi, getInventoryRecordPageApi } from '@/api/inventory';
import type { InventoryRecordVO } from '@/types/inventory';

interface Query {
  pageNo: number;
  pageSize: number;
  productId?: number;
  bizType?: number;
  bizNo?: string;
}

export default function InventoryRecordPage(): JSX.Element {
  const [query, setQuery] = useState<Query>({ pageNo: 1, pageSize: 10 });
  const [list, setList] = useState<InventoryRecordVO[]>([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<{ productId: number; bizType: number; bizNo?: string; changeQty: number; remark?: string }>();

  const load = async (): Promise<void> => {
    const res = await getInventoryRecordPageApi(query);
    setList(res.list);
    setTotal(res.total);
  };

  useEffect(() => { void load(); }, [query.pageNo, query.pageSize]);

  const columns: ColumnsType<InventoryRecordVO> = [
    { title: '流水号', dataIndex: 'recordNo' },
    { title: '商品', dataIndex: 'productName' },
    { title: '类型', dataIndex: 'bizType' },
    { title: '变更', dataIndex: 'changeQty' },
    { title: '变更前', dataIndex: 'stockBefore' },
    { title: '变更后', dataIndex: 'stockAfter' },
    { title: '时间', dataIndex: 'operateTime' }
  ];

  return (
    <div className="page-card">
      <Form layout="inline" onFinish={(v) => setQuery((q) => ({ ...q, pageNo: 1, productId: v.productId, bizType: v.bizType, bizNo: v.bizNo }))}>
        <Form.Item name="productId"><InputNumber placeholder="商品ID" /></Form.Item>
        <Form.Item name="bizType"><Select style={{ width: 130 }} allowClear options={[1,2,3,4,5,6,7,8,9].map((n)=>({label:n,value:n}))} /></Form.Item>
        <Form.Item name="bizNo"><Input placeholder="业务单号" /></Form.Item>
        <Form.Item><Button htmlType="submit" type="primary">查询</Button></Form.Item>
        <Form.Item><Button onClick={() => setOpen(true)}>新增流水</Button></Form.Item>
      </Form>
      <Table rowKey="id" style={{ marginTop: 16 }} columns={columns} dataSource={list} pagination={{ current: query.pageNo, pageSize: query.pageSize, total, onChange: (p, s) => setQuery((q) => ({ ...q, pageNo: p, pageSize: s })) }} />

      <Modal open={open} title="新增库存流水" onCancel={() => setOpen(false)} onOk={async () => {
        const values = await form.validateFields();
        await addInventoryRecordApi(values);
        setOpen(false);
        form.resetFields();
        void load();
      }}>
        <Form form={form} layout="vertical">
          <Form.Item label="商品ID" name="productId" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item label="业务类型" name="bizType" rules={[{ required: true }]}><Select options={[1,2,3,4,5,6,7,8,9].map((n)=>({label:n,value:n}))} /></Form.Item>
          <Form.Item label="业务单号" name="bizNo"><Input /></Form.Item>
          <Form.Item label="变更数量" name="changeQty" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item label="备注" name="remark"><Input.TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
