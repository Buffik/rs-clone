import { AxiosResponse } from 'axios';
import api from '../api/api';

export interface LoginData {
  mail: string,
  password: string,
}

interface UserData {
  firstName: string;
  patronymic: string;
  surname: string;
  birthday: string;
  mail: string;
  phone: string;
}

export interface IUser {
  data: UserData,
  _id: string,
  role: string,
}

export interface AuthResponse {
  accessToken: string,
  refreshToken: string,
  user: IUser,
}

export default class AuthService {
  static async login(data: LoginData): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/login', data);
  }

  static async logout(): Promise<void> {
    return api.post('/auth/logout');
  }
}
