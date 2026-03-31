import { Button, Card, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '@/api/auth';
import { getMyMenusApi } from '@/api/menu';
import { useAuthStore } from '@/store/auth';
import type { LoginRequest } from '@/types/auth';

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const { setLogin, setMenus } = useAuthStore();

  const onFinish = async (values: LoginRequest): Promise<void> => {
    const loginResp = await loginApi(values);
    setLogin(loginResp);
    const menus = await getMyMenusApi();
    setMenus(menus);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div style={{ height: '100vh', display: 'grid', placeItems: 'center', background: '#f8f9fa' }}>
      <Card style={{ width: 420, borderRadius: 12, borderColor: '#dadce0' }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>电商工作台登录</Typography.Title>
        <Form<LoginRequest> layout="vertical" onFinish={onFinish} initialValues={{ username: 'admin', password: 'Admin@123' }}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>
          <Button block type="primary" htmlType="submit">登录</Button>
        </Form>
      </Card>
    </div>
  );
}
