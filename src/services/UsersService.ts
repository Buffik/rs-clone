import { AxiosResponse } from 'axios';
import api from '../api/api';

interface UserPersonalData {
    firstName: string;
    patronymic: string;
    surname: string;
    birthday: Date;
    mail: string;
    phone: string;
}

interface CompanyData {
    companyName: string;
    inn: number;
    address: string;
}

interface Worker {
  firstName: string;
  patronymic: string;
  surname: string;
  birthday: Date;
  mail: string;
  phone: string[];
  _id: string;
}

interface Contacts {
  commonPhone: string[];
  commonMail: string;
  workers: Worker[];
}

interface Company {
  data: CompanyData;
  contacts: Contacts;
  _id: string;
  users: string[];
  archived: boolean;
  __v: number;
  id: string;
}

interface TodoDetails {
  type: string;
  startTime: string;
  endTime: string;
  title: string;
  text: string;
}

interface TodoExtra {
  year: string;
  month: string;
  day: string;
}

interface TodoData {
  data: TodoDetails;
  extra: TodoExtra;
  _id: string;
  isDone: boolean;
  company: string;
  users: string[];
  __v: number;
}

export interface UserData {
  data: UserPersonalData;
  _id: string;
  role: string;
  companies: Company[];
  todos: TodoData[];
  id: string;
}

interface AddUserPersonalData {
  firstName: string;
  patronymic: string;
  surname: string;
  birthday: Date;
  mail: string;
  phone: string;
  password: string,
}

export interface AddUserData {
  data: AddUserPersonalData;
  role: string;
}

export default class UsersService {
  static async addUser(data: AddUserData): Promise<AxiosResponse> {
    return api.post('/users', data);
  }

  static async fetchUsers(archived = false): Promise<AxiosResponse<UserData[]>> {
    const archivedParam = (archived) ? '?archived=true' : '';
    return api.get<UserData[]>(`/users${archivedParam}`);
  }
}
