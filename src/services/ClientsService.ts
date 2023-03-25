import { AxiosResponse } from 'axios';
import api from '../api/api';
import {
  AddClientRequest,
  AddClientResponse,
  DeleteClientResponse,
  FullClientData,
  UndeleteClientResponse,
  UpdateClientRequest,
  UpdateClientResponse,
} from '../types/types';

export default class ClientsService {
  static async addCompany(data: AddClientRequest): Promise<AxiosResponse<AddClientResponse>> {
    return api.post<AddClientResponse>('/companies', data);
  }

  static async updateClient(data: UpdateClientRequest, id: string)
    : Promise<AxiosResponse<UpdateClientResponse | undefined>> {
    return api.patch<UpdateClientResponse>(`/companies/${id}`, data);
  }

  static async deleteClient(id: string): Promise<AxiosResponse<DeleteClientResponse>> {
    return api.delete<DeleteClientResponse>(`/companies/${id}`);
  }

  static async undeleteClient(id: string): Promise<AxiosResponse<UndeleteClientResponse>> {
    return api.patch<UndeleteClientResponse>(`/companies/archived/${id}`);
  }

  static async fetchClients(archived = false): Promise<AxiosResponse<FullClientData[]>> {
    const archivedParam = (archived) ? '?archived=true' : '';
    return api.get<FullClientData[]>(`/companies${archivedParam}`);
  }
}
