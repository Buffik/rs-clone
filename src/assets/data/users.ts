export type TUser = {
  id: number;
  key: string;
  data: {
    name: string;
    patronymic: string;
    surname: string;
    birthday: string;
  };
  isAdmin: boolean;
};

const users: TUser[] = [
  {
    id: 1,
    key: 'someFlagToCheckUser_1',
    data: {
      name: 'Владимир',
      patronymic: 'Сергеевич',
      surname: 'Буф',
      birthday: '06.04.1989',
    },
    isAdmin: true,
  },
  {
    id: 2,
    key: 'someFlagToCheckUser_2',
    data: {
      name: 'Дарья',
      patronymic: 'Михайловна',
      surname: 'Буф',
      birthday: '17.09.1989',
    },
    isAdmin: false,
  },
  {
    id: 3,
    key: 'someFlagToCheckUser_3',
    data: {
      name: 'Олег',
      patronymic: 'Батькович',
      surname: 'Фамилия',
      birthday: '29.09.1989',
    },
    isAdmin: false,
  },
];

export default users;
