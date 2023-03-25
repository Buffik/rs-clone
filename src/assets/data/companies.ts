export type TCompany = {
  _id: number;
  belongsTo: number[];
  data: {
    name: string;
    inn: number;
    address: string;
  };
  contacts: {
    commonPhone: string[];
    commonMail: string;
    workers: {
      name: string;
      patronymic: string;
      surname: string;
      birthday: string;

      phone: string[];
      mail: string;
    }[];
  };
};

const companies: TCompany[] = [
  {

    _id: 1,
    belongsTo: [123, 12332],
    data: {
      name: 'РОГА_И_КОПЫТА',
      inn: 1234567890,
      address: 'some address here',
    },
    contacts: {
      commonPhone: ['+7-921-123-55-48', '+7-812-426-44-45'],
      commonMail: 'someCommon@mainModule.ru',
      workers: [
        {
          name: 'Ольга',
          patronymic: 'Сергеевна',
          surname: 'Рабочая',
          birthday: '15.12.2000',
          phone: ['+7-921-000-00-00'],
          mail: 'some@mail.ru',
        },
        {
          name: 'Вася',
          patronymic: 'Сергеевич',
          surname: 'Рабочий',
          birthday: '22.10.1999',
          phone: ['+7-921-999-99-99'],
          mail: 'some2@mail.ru',
        },
      ],
    },
  },
];

export default companies;
