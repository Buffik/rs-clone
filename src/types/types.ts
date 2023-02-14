export interface Worker {
  firstName: string;
  patronymic: string;
  surname: string;
  _id: string;
}

export interface CompanyData {
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
  data: CompanyData;
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
