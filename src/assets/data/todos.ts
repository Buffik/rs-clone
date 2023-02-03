export type TTodos = {
  _id: number;
  belongsTo: number;
  isDone: boolean;
  data: {
    type: 'call' | 'calc' | 'meet' | 'common';
    startTime: number;
    endTime: number;
    title: string;
    text: string;
  };
};

const todos: TTodos[] = [
  {
    _id: 1,
    belongsTo: 1,
    isDone: false,
    data: {
      type: 'common', // call | calc | meet | common
      startTime: 123346465462,
      endTime: 3456546554,
      title: 'заголовок таска',
      text: 'тело таска',
    },
  },
  {
    _id: 2,
    belongsTo: 1,
    isDone: true,
    data: {
      type: 'common', // call | calc | meet | common
      startTime: 654545,
      endTime: 657323,
      title: 'заголовок таска',
      text: 'тело таска',
    },
  },
];

export default todos;
