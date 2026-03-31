import { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getWarnPageApi } from '@/api/inventory';
import type { InventoryWarnVO } from '@/types/inventory';

export default function InventoryWarnPage(): JSX.Element {
  const [list, setList] = useState<InventoryWarnVO[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getWarnPageApi(pageNo, pageSize).then((res) => {
      setList(res.list);
      setTotal(res.total);
    });
  }, [pageNo, pageSize]);

  const columns: ColumnsType<InventoryWarnVO> = [
    { title: '商品编码', dataIndex: 'productNo' },
    { title: '商品名称', dataIndex: 'productName' },
    { title: '库存', dataIndex: 'stockQuantity' },
    { title: '预警值', dataIndex: 'stockWarnThreshold' },
    { title: '状态', dataIndex: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'default'}>{v === 1 ? '上架' : '非上架'}</Tag> }
  ];

  return <div className="page-card"><Table rowKey="productId" columns={columns} dataSource={list} pagination={{ current: pageNo, pageSize, total, onChange: (p, s) => { setPageNo(p); setPageSize(s); } }} /></div>;
}
