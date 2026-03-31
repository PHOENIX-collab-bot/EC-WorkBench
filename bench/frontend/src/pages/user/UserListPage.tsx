import { useEffect, useState } from 'react';
import { Modal, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { deleteUserApi, getUserPageApi } from '@/api/user';
import type { UserVO } from '@/types/rbac';
import PermissionButton from '@/components/PermissionButton';

export default function UserListPage(): JSX.Element {
  const [list, setList] = useState<UserVO[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const load = async (): Promise<void> => {
    const res = await getUserPageApi(pageNo, pageSize);
    setList(res.list);
    setTotal(res.total);
  };

  useEffect(() => {
    void load();
  }, [pageNo, pageSize]);

  const columns: ColumnsType<UserVO> = [
    { title: '用户名', dataIndex: 'username' },
    { title: '昵称', dataIndex: 'nickname' },
    { title: '手机', dataIndex: 'mobile' },
    { title: '状态', dataIndex: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '启用' : '禁用'}</Tag> },
    { title: '创建时间', dataIndex: 'createdAt' },
    {
      title: '操作',
      render: (_, row) => (
        <PermissionButton
          perm="sys:user:list"
          danger
          size="small"
          onClick={() => {
            Modal.confirm({
              title: '确认删除该用户？',
              onOk: async () => {
                await deleteUserApi(row.id);
                await load();
              }
            });
          }}
        >删除</PermissionButton>
      )
    }
  ];

  return (
    <div className="page-card">
      <Table rowKey="id" columns={columns} dataSource={list} pagination={{ current: pageNo, pageSize, total, onChange: (p, s) => { setPageNo(p); setPageSize(s); } }} />
    </div>
  );
}
