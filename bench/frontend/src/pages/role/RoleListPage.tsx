import { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getRoleListApi } from '@/api/role';
import type { RoleVO } from '@/types/rbac';

export default function RoleListPage(): JSX.Element {
  const [list, setList] = useState<RoleVO[]>([]);
  useEffect(() => { getRoleListApi().then(setList); }, []);

  const columns: ColumnsType<RoleVO> = [
    { title: '角色名', dataIndex: 'roleName' },
    { title: '角色编码', dataIndex: 'roleCode' },
    { title: '状态', dataIndex: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '启用' : '禁用'}</Tag> }
  ];

  return <div className="page-card"><Table rowKey="id" columns={columns} dataSource={list} pagination={false} /></div>;
}
