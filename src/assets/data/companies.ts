export type TCompany = {
  id: number;
  key: string;
  belongTo: string[];
  data: {
    name: string;
    inn: number;
    address: string;
  };
  contacts: {
    commonTelephone: string[];
    workers: {
      name: string;
      patronymic: string;
      surname: string;
      birthday: string;
      tel: string[];
    }[];
  };
};

const companies: TCompany[] = [
  {
    id: 1,
    key: 'someFlagToCheckCompany_1',
    belongTo: ['someFlagToCheckUser_1', 'someFlagToCheckUser_2'],
    data: {
      name: 'РОГА_И_КОПЫТА',
      inn: 1234567890,
      address: 'some address here',
    },
    contacts: {
      commonTelephone: ['+7-921-123-55-48', '+7-812-426-44-45'],
      workers: [
        {
          name: 'Ольга',
          patronymic: 'Сергеевна',
          surname: 'Рабочая',
          birthday: '15.12.2000',
          tel: ['+7-921-000-00-00'],
        },
        {
          name: 'Вася',
          patronymic: 'Сергеевич',
          surname: 'Рабочий',
          birthday: '22.10.1999',
          tel: ['+7-921-999-99-99'],
        },
      ],
    },
  },
];

export default companies;
