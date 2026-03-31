import request from '@/utils/request';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export function loginApi(data: LoginRequest): Promise<LoginResponse> {
  return request.post('/auth/login', data);
}

export function refreshTokenApi(refreshToken: string): Promise<LoginResponse> {
  return request.post('/auth/refresh', { refreshToken });
}
