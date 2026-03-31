import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1a73e8',
          colorInfo: '#1a73e8',
          borderRadius: 8,
          colorBgLayout: '#f8f9fa',
          colorBgContainer: '#ffffff',
          colorText: '#202124',
          colorTextSecondary: '#5f6368',
          colorBorder: '#dadce0',
          fontFamily: 'Roboto, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif'
        },
        components: {
          Layout: {
            bodyBg: '#f8f9fa',
            headerBg: '#ffffff',
            siderBg: '#ffffff',
            triggerBg: '#ffffff'
          },
          Card: {
            borderRadiusLG: 12
          },
          Button: {
            borderRadius: 999
          },
          Table: {
            headerBg: '#fafbfc',
            headerColor: '#5f6368',
            borderColor: '#edf0f2'
          },
          Menu: {
            itemBorderRadius: 8,
            itemHoverColor: '#1a73e8',
            itemSelectedColor: '#1a73e8',
            itemSelectedBg: '#e8f0fe'
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
