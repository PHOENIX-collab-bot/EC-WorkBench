import type { ReactNode } from 'react';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProductListPage from '@/pages/product/ProductListPage';
import ProductCategoryPage from '@/pages/product/ProductCategoryPage';
import ProductEditPage from '@/pages/product/ProductEditPage';
import OrderListPage from '@/pages/order/OrderListPage';
import OrderDetailPage from '@/pages/order/OrderDetailPage';
import UserListPage from '@/pages/user/UserListPage';
import RoleListPage from '@/pages/role/RoleListPage';
import MenuManagePage from '@/pages/menu/MenuManagePage';
import InventoryWarnPage from '@/pages/inventory/InventoryWarnPage';
import InventoryRecordPage from '@/pages/inventory/InventoryRecordPage';
import OperationLogPage from '@/pages/log/OperationLogPage';
import CreativeAssistantPage from '@/pages/tools/CreativeAssistantPage';

export interface AppRoute {
  path: string;
  title: string;
  element: ReactNode;
  perm?: string;
}

export const appRoutes: AppRoute[] = [
  { path: '/dashboard', title: 'Dashboard', element: <DashboardPage />, perm: 'dashboard:view' },
  { path: '/product/category', title: '商品分类', element: <ProductCategoryPage />, perm: 'product:category:list' },
  { path: '/product/list', title: '商品列表', element: <ProductListPage />, perm: 'product:list' },
  { path: '/product/edit/:id', title: '编辑商品', element: <ProductEditPage />, perm: 'product:list' },
  { path: '/product/create', title: '新增商品', element: <ProductEditPage />, perm: 'product:list' },
  { path: '/order/list', title: '订单列表', element: <OrderListPage />, perm: 'order:list' },
  { path: '/order/detail/:id', title: '订单详情', element: <OrderDetailPage />, perm: 'order:list' },
  { path: '/system/user', title: '用户管理', element: <UserListPage />, perm: 'sys:user:list' },
  { path: '/system/role', title: '角色管理', element: <RoleListPage />, perm: 'sys:role:list' },
  { path: '/system/menu', title: '菜单管理', element: <MenuManagePage />, perm: 'sys:menu:list' },
  { path: '/inventory/warn', title: '库存预警', element: <InventoryWarnPage />, perm: 'inventory:warn:list' },
  { path: '/inventory/record', title: '库存流水', element: <InventoryRecordPage />, perm: 'inventory:record:list' },
  { path: '/log/operation', title: '操作日志', element: <OperationLogPage />, perm: 'log:operation:list' },
  { path: '/tools/creative-assistant', title: 'AI商品创作', element: <CreativeAssistantPage /> },
];
