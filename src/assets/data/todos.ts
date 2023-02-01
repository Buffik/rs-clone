export type TTodos = {
  id: number;
  belongTo: string;
  isDone: boolean;
  data: {
    type: string;
    date: string;
    startTime: string;
    endTime: string;
    title: string;
    text: string;
  };
};

const todos: TTodos[] = [
  {
    id: 1, // уникальный номер, можно добавить библиотеку для его создания
    belongTo: 'РОГА_И_КОПЫТА',
    isDone: false,
    data: {
      type: 'тип таска', // call | calc | meet | common
      date: 'дата создания',
      startTime: 'время начала таска',
      endTime: 'время окончания таска',
      title: 'заголовок таска',
      text: 'тело таска',
    },
  },
  {
    id: 2, // уникальный номер, можно добавить библиотеку для его создания
    belongTo: 'РОГА_И_КОПЫТА',
    isDone: true,
    data: {
      type: 'тип таска', // call | calc | meet | common
      date: 'дата создания',
      startTime: 'время начала таска',
      endTime: 'время окончания таска',
      title: 'заголовок таска',
      text: 'тело таска',
    },
  },
];

export default todos;
