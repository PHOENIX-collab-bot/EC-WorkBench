import { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, Spin, Typography, Dropdown, Space } from 'antd';
import {
  AppstoreOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  WarningOutlined,
  ToolOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import type { MenuItem } from '@/types/menu';
import { getMyMenusApi } from '@/api/menu';
import { useAuthStore } from '@/store/auth';

const { Header, Sider, Content } = Layout;

const iconMap: Record<string, JSX.Element> = {
  '/dashboard': <DashboardOutlined />,
  '/product': <ShoppingOutlined />,
  '/order': <OrderedListOutlined />,
  '/system': <TeamOutlined />,
  '/inventory': <WarningOutlined />,
  '/tools/creative-assistant': <ToolOutlined />
};

function buildMenuItems(menus: MenuItem[]): MenuProps['items'] {
  const map = new Map<number, MenuItem[]>();
  menus.forEach((m) => {
    if (!map.has(m.parentId)) map.set(m.parentId, []);
    map.get(m.parentId)!.push(m);
  });

  const travel = (parentId: number): NonNullable<MenuProps['items']> => {
    const children = (map.get(parentId) || []).sort((a, b) => a.sortNo - b.sortNo);
    return children
      .filter((item) => item.status === 1 && item.menuType !== 3)
      .map((item) => {
        const sub = travel(item.id);
        const key = item.routePath || `menu-${item.id}`;
        if (sub.length > 0) {
          return { key, label: item.menuName, icon: iconMap[item.routePath || ''] || <AppstoreOutlined />, children: sub };
        }
        return {
          key,
          icon: iconMap[item.routePath || ''] || <SafetyCertificateOutlined />,
          label: item.routePath ? <Link to={item.routePath}>{item.menuName}</Link> : item.menuName
        };
      });
  };

  return travel(0);
}

export default function MainLayout(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, menus, setMenus, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (menus.length > 0) return;
    setLoading(true);
    getMyMenusApi()
      .then((list) => setMenus(list))
      .finally(() => setLoading(false));
  }, [menus.length, setMenus]);

  const menuItems = useMemo(() => {
    const dynamicItems = buildMenuItems(menus) || [];
    return [
      ...dynamicItems,
      { type: 'divider' as const },
      {
        key: '/tools/creative-assistant',
        icon: <ToolOutlined />,
        label: <Link to="/tools/creative-assistant">AI商品创作</Link>
      }
    ];
  }, [menus]);

  const userMenu: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        logout();
        navigate('/login');
      }
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
      <Sider width={220} theme="light" style={{ height: '100vh', position: 'sticky', top: 0, overflow: 'auto' }}>
        <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', fontWeight: 700, color: '#1f1f1f' }}>电商工作台</div>
        <Menu selectedKeys={[location.pathname]} mode="inline" items={menuItems} />
      </Sider>
      <Layout style={{ height: '100vh' }}>
        <Header style={{ background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', height: 56, lineHeight: '56px', position: 'sticky', top: 0, zIndex: 10 }}>
          <Typography.Text strong>商家后台管理系统</Typography.Text>
          <Dropdown menu={{ items: userMenu }}>
            <Space><UserOutlined />{username || '用户'}</Space>
          </Dropdown>
        </Header>
        <Content style={{ margin: 16, background: 'transparent', overflow: 'auto', height: 'calc(100vh - 56px)' }}>
          {loading ? <Spin /> : <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
}
