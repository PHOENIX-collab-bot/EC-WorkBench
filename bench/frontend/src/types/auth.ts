export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
  username: string;
  roleCodes: string[];
  permissions: string[];
}
