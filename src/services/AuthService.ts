import { AxiosResponse } from 'axios';
import api from '../api/api';
import { AuthResponse, LoginRequest } from '../types/types';

export default class AuthService {
  static async login(data: LoginRequest): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/login', data);
  }

  static async logout(): Promise<void> {
    return api.post('/auth/logout');
  }
}
