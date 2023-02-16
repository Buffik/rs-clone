import { AxiosResponse } from 'axios';
import api from '../api/api';
import {
  AddUserRequest,
  ProfileData,
  FullUserData,
  UpdateUserRequest,
  UpdateProfileResponse,
  AddUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
  UndeleteUserResponse,
} from '../types/types';

export default class UsersService {
  static async addUser(data: AddUserRequest): Promise<AxiosResponse<AddUserResponse>> {
    return api.post<AddUserResponse>('/users', data);
  }

  static async updateUser(data: UpdateUserRequest, id: string)
    : Promise<AxiosResponse<UpdateUserResponse>> {
    return api.patch<UpdateUserResponse>(`/users/${id}`, data);
  }

  static async deleteUser(id: string): Promise<AxiosResponse<DeleteUserResponse>> {
    return api.delete<DeleteUserResponse>(`/users/${id}`);
  }

  static async undeleteUser(id: string): Promise<AxiosResponse<UndeleteUserResponse>> {
    return api.patch<UndeleteUserResponse>(`/users/archived/${id}`);
  }

  static async fetchUsers(archived = false): Promise<AxiosResponse<FullUserData[]>> {
    const archivedParam = (archived) ? '?archived=true' : '';
    return api.get<FullUserData[]>(`/users${archivedParam}`);
  }

  static async fetchProfile(): Promise<AxiosResponse<ProfileData>> {
    return api.get<ProfileData>('/profile');
  }

  static async updateProfile(data: UpdateUserRequest)
    : Promise<AxiosResponse<UpdateProfileResponse>> {
    return api.patch<UpdateProfileResponse>('/profile', data);
  }
}
