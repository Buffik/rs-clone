export type TUser = {
  _id: number;
  data: {
    name: string;
    patronymic: string;
    surname: string;
    birthday: string;
    mail: string;
    phone: string;
    password: string;
  };
  role: 'admin' | 'manager' | 'salesman';
};

const users: TUser[] = [
  {
    _id: 1,
    data: {
      name: 'Владимир',
      patronymic: 'Сергеевич',
      surname: 'Буф',
      birthday: '06.04.1989',
      mail: 'boo@mail.ru',
      phone: '+7-921-591-77-77',
      password: '123321123',
    },
    role: 'admin',
  },
  {
    _id: 2,
    data: {
      name: 'Дарья',
      patronymic: 'Михайловна',
      surname: 'Буф',
      birthday: '17.09.1989',
      mail: 'darya@mail.ru',
      phone: '+7-922-222-22-22',
      password: 'string',
    },
    role: 'manager',
  },
  {
    _id: 3,
    data: {
      name: 'Олег',
      patronymic: 'Батькович',
      surname: 'Фамилия',
      birthday: '29.09.1989',
      mail: 'oleg@mail.ru',
      phone: '+7-999-999-99-99',
      password: 'string123',
    },
    role: 'salesman',
  },
];

export default users;
