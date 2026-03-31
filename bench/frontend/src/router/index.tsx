import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Result } from 'antd';
import LoginPage from '@/pages/login/LoginPage';
import MainLayout from '@/layouts/MainLayout';
import { appRoutes } from './routes';
import { useAuthStore } from '@/store/auth';
import { hasPerm } from '@/utils/permission';

function AuthGuard({ children }: { children: JSX.Element }): JSX.Element {
  const token = useAuthStore((s) => s.token);
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

function PermissionWrap({ perm, children }: { perm?: string; children: JSX.Element }): JSX.Element {
  if (!hasPerm(perm)) {
    return <Result status="403" title="403" subTitle="没有访问权限" />;
  }
  return children;
}

export default function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PermissionWrap perm={route.perm}>{route.element as JSX.Element}</PermissionWrap>}
          />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
