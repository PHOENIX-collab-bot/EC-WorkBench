import { useEffect, useMemo, useState } from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getMyMenusApi } from '@/api/menu';
import type { MenuVO } from '@/types/rbac';

export default function MenuManagePage(): JSX.Element {
  const [list, setList] = useState<MenuVO[]>([]);
  useEffect(() => { getMyMenusApi().then((d) => setList(d as unknown as MenuVO[])); }, []);

  const map = useMemo(() => {
    const m = new Map<number, MenuVO[]>();
    list.forEach((i) => {
      if (!m.has(i.parentId)) m.set(i.parentId, []);
      m.get(i.parentId)!.push(i);
    });
    return m;
  }, [list]);

  const toTree = (pid: number): (MenuVO & { children?: MenuVO[] })[] => (map.get(pid) || []).map((i) => ({ ...i, children: toTree(i.id) }));

  const columns: ColumnsType<MenuVO> = [
    { title: '名称', dataIndex: 'menuName' },
    { title: '路由', dataIndex: 'routePath' },
    { title: '权限标识', dataIndex: 'perms' },
    { title: '类型', dataIndex: 'menuType', render: (v: number) => <Tag>{v === 1 ? '目录' : v === 2 ? '菜单' : '按钮'}</Tag> }
  ];

  return <div className="page-card"><Table rowKey="id" columns={columns} dataSource={toTree(0)} pagination={false} /></div>;
}
