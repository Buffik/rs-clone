/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export interface Worker {
  firstName: string;
  patronymic: string;
  surname: string;
  _id: string;
}

export interface TodoCompanyData {
  companyName: string;
}

export interface TodoData {
  type: string;
  startTime: string;
  endTime: string;
  title: string;
  text: string;
}

export interface UserData {
  surname: string;
  mail: string;
}

export interface User {
  data: UserData;
  _id: string;
  role: string;
  id: string;
}

export interface TodosPlacement {
  _id: string;
  start: number;
  end: number;
  column: number;
}

export interface Contacts {
  workers: Worker[];
}

export interface Company {
  data: TodoCompanyData;
  contacts: Contacts;
  _id: string;
  id: string;
}

export interface Todo {
  data: TodoData;
  _id: string;
  isDone: boolean;
  company: Company;
  users: User[];
}

export interface Todos {
  todos: Todo[];
  todosPlacement: TodosPlacement[][];
  columnsNumber: number;
}

// Companies
export enum Role {
  Manager = 'manager',
  Salesman = 'salesman',
}

export interface UserClass {
  data: UserData;
  _id: string;
  role: Role;
  id: string;
}

export interface CompanyWorker {
  firstName: string;
  patronymic: string;
  surname: string;
  birthday?: string;
  mail: string;
  phone: string[];
  _id: string;
}

export interface CompanyContacts {
  commonPhone: string[];
  commonMail: string;
  workers: CompanyWorker[];
}

export interface CompanyData {
  companyName: string;
  inn: number;
  address: string;
}

export interface Companies {
  data: CompanyData;
  contacts: CompanyContacts;
  _id: string;
  users: UserClass[];
  __v: number;
  todos: Todo[];
  id: string;
}

export interface TodoFromClient {
  company: string;
  isDone: boolean;
  data: {
    type: string;
    startTime: string;
    endTime: string;
    title: string;
    text: string;
  };
}
