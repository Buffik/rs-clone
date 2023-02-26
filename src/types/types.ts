export enum ActionTypeAtModalWindow {
  Create = 'create',
  Update = 'update',
}

export enum UserRoles {
  Admin = 'admin',
  Manager = 'manager',
  Salesman = 'salesman',
}

export enum TodoTypes {
  Calc = 'calc',
  Call = 'call',
  Common = 'common',
  Meet = 'meet',
}

export enum Languages {
  En = 'en',
  Ru = 'ru',
}

export interface Worker {
  firstName: string;
  patronymic: string;
  surname: string;
  _id: string;
}

export interface TodoCompanyData {
  // export interface CompanyData {
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
  // data: CompanyData;
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
//   todosPlacement: TodosPlacement[];
//   columnsNumber: number;
// }

export interface FullUserData {
  _id: string;
  role: UserRoles;
  data: {
    firstName: string;
    patronymic: string;
    surname: string;
    birthday: string;
    mail: string;
    phone: string;
  };
  companies: {
    _id: string;
    users: string[];
    data: {
      companyName: string;
    };
    contacts: {
      commonPhone: string[];
      commonMail: string;
      workers: {
        firstName: string;
        surname: string;
        _id: string;
      }[];
    };
  }[];
  todos: {
    _id: string;
    isDone: boolean;
    company: string;
    users: string[];
    data: {
      type: TodoTypes;
      startTime: string;
      endTime: string;
      title: string;
      text: string;
    };
    extra: {
      year: string;
      month: string;
      day: string;
    };
  }[];
}

export interface AddUserRequest {
  data: {
    firstName: string;
    patronymic?: string;
    surname: string;
    birthday: string;
    mail: string;
    phone: string;
    password: string;
  };
  role: UserRoles;
  settings?: {
    language?: Languages;
  };
}

export interface AddUserResponse {
  newUser: AddUserRequest;
}

export interface UpdateUserRequest {
  role?: UserRoles;
  settings?: {
    language?: Languages;
  };
  data?: {
    firstName?: string;
    patronymic?: string;
    surname?: string;
    birthday?: string;
    mail?: string;
    phone?: string;
    password?: string;
  };
}

export interface UpdateUserResponse {
  updatedData: {
    _id: string;
    role?: UserRoles;
    settings?: {
      language?: Languages;
    };
    data?: {
      firstName?: string;
      patronymic?: string;
      surname?: string;
      birthday?: string;
      mail?: string;
      phone?: string;
      password?: string;
    };
  };
}

export interface DeleteUserResponse {
  deletedUser: {
    _id: string;
    role: UserRoles;
    settings?: {
      language?: Languages;
    };
    data: {
      firstName: string;
      patronymic?: string;
      surname: string;
      birthday: string;
      mail: string;
      phone: string;
    };
  };
}

export interface UndeleteUserResponse {
  undeletedUser: {
    _id: string;
    role: UserRoles;
    settings?: {
      language?: Languages;
    };
    data: {
      firstName: string;
      patronymic?: string;
      surname: string;
      birthday: string;
      mail: string;
      phone: string;
    };
  };
}

export interface ProfileData {
  data: {
    firstName: string;
    patronymic?: string;
    surname: string;
    birthday: string;
    mail: string;
    phone: string;
  };
  _id: string;
  role: UserRoles;
  settings?: {
    language?: Languages;
  };
}

export interface UpdateProfileResponse {
  updatedData: {
    data?: {
      firstName?: string;
      patronymic?: string;
      surname?: string;
      birthday?: string;
      mail?: string;
      phone?: string;
    };
    role?: UserRoles;
    settings?: {
      language?: Languages;
    };
  };
}

export interface LoginRequest {
  mail: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: ProfileData;
}

export interface AddClientRequest {
  users?: string[];
  data: {
    companyName: string;
    inn?: number;
    address?: string;
  };
  contacts?: {
    commonPhone: string[];
    commonMail?: string;
    workers?: {
      firstName?: string;
      patronymic?: string;
      surname?: string;
      birthday?: string;
      mail?: string;
      phone?: string[];
    }[];
  };
}

export interface AddClientResponse {
  newCompany: {
    _id: string;
    users: string[];
    data: {
      companyName: string;
      inn?: number;
      address?: string;
    };
    contacts?: {
      commonPhone: string[];
      commonMail?: string;
      workers?: {
        firstName?: string;
        patronymic?: string;
        surname?: string;
        birthday?: string;
        mail?: string;
        phone?: string[];
        _id: string;
      }[];
    };
  };
}

export interface UpdateClientRequest {
  users?: string[];
  data?: {
    companyName?: string;
    inn?: number;
    address?: string;
  };
  contacts?: {
    commonPhone?: string[];
    commonMail?: string;
    workers: {
      firstName?: string;
      patronymic?: string;
      surname?: string;
      birthday?: string;
      mail?: string;
      phone?: string[];
    }[];
  };
}

export interface UpdateClientResponse {
  updatedData: {
    users?: string[];
    data?: {
      companyName?: string;
      inn?: number;
      address?: string;
    };
    contacts?: {
      commonPhone?: string[];
      commonMail?: string;
      workers?: {
        firstName?: string;
        patronymic?: string;
        surname?: string;
        birthday?: string;
        mail?: string;
        phone?: string[];
      }[];
    };
  };
}

export interface DeleteClientResponse {
  deletedCompany: {
    _id: string;
    users: string[];
    data: {
      companyName: string;
      inn?: number;
      address?: string;
    };
    contacts?: {
      commonPhone: string[];
      commonMail?: string;
      workers?: {
        firstName?: string;
        patronymic?: string;
        surname?: string;
        birthday?: string;
        mail?: string;
        phone?: string[];
        _id: string;
      }[];
    };
  };
}

export interface UndeleteClientResponse {
  undeleteCompany: {
    _id: string;
    users: string[];
    data: {
      companyName: string;
      inn?: number;
      address?: string;
    };
    contacts?: {
      commonPhone: string[];
      commonMail?: string;
      workers?: {
        firstName?: string;
        patronymic?: string;
        surname?: string;
        birthday?: string;
        mail?: string;
        phone?: string[];
        _id: string;
      }[];
    };
  };
}

export interface FullClientData {
  _id: string;
  data: {
    companyName: string;
    inn?: number;
    address?: string;
  };
  contacts?: {
    commonPhone: string[];
    commonMail?: string;
    workers: {
      firstName?: string;
      patronymic?: string;
      surname?: string;
      birthday?: string;
      mail?: string;
      phone?: string[];
      _id?: string;
    }[];
  };
  users: {
    _id: string;
    role: UserRoles;
    data: {
      surname: string;
      mail: string;
    };
  }[];
  todos?: {
    _id: string;
    isDone: boolean;
    data: {
      type: TodoTypes;
      startTime: string;
      endTime: string;
      title: string;
      text: string;
    };
    extra: {
      year: string;
      month: string;
      day: string;
    };
  }[];
}

export interface UpdateContactRequest {
  firstName?: string;
  patronymic?: string;
  surname?: string;
  birthday?: string;
  mail?: string;
  phone?: string[];
}

export interface AddContactRequest {
  contact: UpdateContactRequest;
  companyId: string;
}

export interface AddContactResponse {
  newClient: {
    firstName?: string;
    patronymic?: string;
    surname?: string;
    birthday?: string;
    mail?: string;
    phone?: string[];
  };
}

export interface UpdateContactResponse {
  updatedWorker: {
    firstName?: string;
    patronymic?: string;
    surname?: string;
    birthday?: string;
    mail?: string;
    phone?: string[];
    _id?: string;
  };
}

export interface DeleteContactResponse {
  deletedWorker: {
    firstName?: string;
    patronymic?: string;
    surname?: string;
    birthday?: string;
    mail?: string;
    phone?: string[];
    _id?: string;
  };
}

export interface FullContactData {
  firstName?: string;
  patronymic?: string;
  surname?: string;
  birthday?: string;
  mail?: string;
  phone?: string[];
  _id: string;
  companyName: string;
  companyId: string;
  users: {
    data: {
      surname: string;
      mail: string;
    };
    _id: string;
  }[];
}

export interface AddTodoRequest {
  company: string;
  isDone: boolean;
  data: {
    type: TodoTypes;
    startTime: string;
    endTime: string;
    title: string;
    text?: string;
  };
}

export interface AddTodoResponse {
  newTodo: {
    _id: string;
    isDone: boolean;
    company: string;
    users: string[];
    data: {
      type: TodoTypes;
      startTime: string;
      endTime: string;
      title: string;
      text?: string;
    };
    extra: {
      year: string;
      month: string;
      day: string;
    };
  };
}

export interface UpdateTodoRequest {
  company?: string;
  isDone?: boolean;
  data?: {
    type?: TodoTypes;
    startTime?: string;
    endTime?: string;
    title?: string;
    text?: string;
  };
}

export interface UpdateTodoResponse {
  updatedData: UpdateTodoRequest;
}

export interface ShortTodoData {
  _id: string;
  company: string;
  users: string[];
  isDone: boolean;
  data: {
    type: TodoTypes;
    startTime: string;
    endTime: string;
    title: string;
    text?: string;
  };
}

export interface FullTodoData {
  isDone: boolean;
  data: {
    type: TodoTypes;
    startTime: string;
    endTime: string;
    title: string;
    text?: string;
  };
  extra: {
    year: string;
    month: string;
    day: string;
  };
  _id: string;
  company: {
    _id: string;
    archived: boolean;
    data: {
      companyName: string;
    };
    contacts: {
      workers: {
        _id: string;
        firstName: string;
        patronymic: string;
        surname: string;
      }[];
    };
    users: {
      _id: string;
      role: UserRoles;
      archived: boolean;
      data: {
        surname: string;
        mail: string;
      };
    }[];
  };
}

export interface TodoPlacement {
  _id: string;
  start: number;
  end: number;
  column: number;
}

export interface TodosByDayResponse {
  todos: FullTodoData[];
  todosPlacement: TodoPlacement[][];
  columnsNumber: number;
}

export interface TodosCount {
  complete: number;
  future: number;
  missed: number;
}

export interface DataResponse {
  profile: ProfileData;
  clients: FullClientData[];
  contacts: FullContactData[];
  users: FullUserData[];
}

export interface DataUpdate {
  profile?: ProfileData;
  clients?: FullClientData[];
  contacts?: FullContactData[];
  users?: FullUserData[];
}
