import { AxiosResponse } from 'axios';
import api from '../api/api';
import {
  AddContactRequest,
  AddContactResponse,
  DeleteContactResponse,
  FullContactData,
  UpdateContactRequest,
  UpdateContactResponse,
} from '../types/types';

export default class ContactsService {
  static async addContact(data: AddContactRequest): Promise<AxiosResponse<AddContactResponse>> {
    return api.post<AddContactResponse>('/contacts', data);
  }

  static async updateContact(data: UpdateContactRequest, id: string)
    : Promise<AxiosResponse<UpdateContactResponse>> {
    return api.patch<UpdateContactResponse>(`/contacts/${id}`, data);
  }

  static async deleteContact(id: string): Promise<AxiosResponse<DeleteContactResponse>> {
    return api.delete<DeleteContactResponse>(`/contacts/${id}`);
  }

  static async fetchContacts(): Promise<AxiosResponse<FullContactData[]>> {
    return api.get<FullContactData[]>('/contacts');
  }
}
