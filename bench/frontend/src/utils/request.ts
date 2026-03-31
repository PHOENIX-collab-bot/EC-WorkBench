
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';
import type { Result } from '@/types/common';
import type { LoginResponse } from '@/types/auth';
import { useAuthStore } from '@/store/auth';

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000
});

let refreshing = false;
let queue: Array<(token: string) => void> = [];

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  (resp: AxiosResponse) => resp,
  async (error: AxiosError) => {
    const originalConfig = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    if (error.response?.status === 401 && originalConfig && !originalConfig._retry) {
      originalConfig._retry = true;
      const { token, setLogin, logout } = useAuthStore.getState();
      if (!token) {
        logout();
        location.href = '/login';
        return Promise.reject(error);
      }

      if (!refreshing) {
        refreshing = true;
        try {
          const refreshResp = await axios.post<Result<LoginResponse>>('/api/auth/refresh', { refreshToken: token });
          if (refreshResp.data.code !== 0) {
            throw new Error(refreshResp.data.message || '刷新失败');
          }
          const refreshed = refreshResp.data.data;
          setLogin(refreshed);
          queue.forEach((cb) => cb(refreshed.token));
          queue = [];
          originalConfig.headers.Authorization = `Bearer ${refreshed.token}`;
          return service(originalConfig);
        } catch (e) {
          logout();
          message.error('登录已过期，请重新登录');
          location.href = '/login';
          return Promise.reject(e);
        } finally {
          refreshing = false;
        }
      }

      return new Promise((resolve) => {
        queue.push((newToken: string) => {
          if (originalConfig.headers) {
            originalConfig.headers.Authorization = `Bearer ${newToken}`;
          }
          resolve(service(originalConfig));
        });
      });
    }

    message.error((error.response?.data as { message?: string } | undefined)?.message || error.message || '网络异常');
    return Promise.reject(error);
  }
);

async function unwrap<T>(promise: Promise<AxiosResponse<Result<T>>>): Promise<T> {
  const resp = await promise;
  const data = resp.data;
  if (data.code !== 0) {
    message.error(data.message || '请求失败');
    return Promise.reject(new Error(data.message || '请求失败'));
  }
  return data.data;
}

const request = {
  get<T>(url: string, config?: object): Promise<T> {
    return unwrap<T>(service.get<Result<T>>(url, config));
  },
  post<T>(url: string, data?: object, config?: object): Promise<T> {
    return unwrap<T>(service.post<Result<T>>(url, data, config));
  },
  put<T>(url: string, data?: object, config?: object): Promise<T> {
    return unwrap<T>(service.put<Result<T>>(url, data, config));
  },
  delete<T>(url: string, config?: object): Promise<T> {
    return unwrap<T>(service.delete<Result<T>>(url, config));
  }
};

export default request;
