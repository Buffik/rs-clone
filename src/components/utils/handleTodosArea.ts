import { AddTodoRequest, TodosPlacement, TodoTypes } from '../../types/types';

export const handleTodosArea = (todosPlacement: TodosPlacement[]) => {
  let currentArray = 0;
  const result: TodosPlacement[][] = [];
  todosPlacement.forEach((todo, index) => {
    const nextTodo = todosPlacement[index + 1];
    if (nextTodo && index > 0) {
      if (todo.column < nextTodo.column) {
        result[currentArray].push(todo);
      } else {
        result[currentArray].push(todo);
        result.push([]);
        currentArray += 1;
      }
    } else if (!nextTodo) {
      result[currentArray].push(todo);
    } else {
      result.push([todo]);
    }
  });
  return result;
};

export const calculateItemHeight = (
  start: number,
  end: number,
  heightPerHalfHour: number,
) => {
  const durationInMinutes = (end - start) / 1000 / 60;
  const height = (durationInMinutes / 30) * heightPerHalfHour;
  return height;
};

export const calculateTopByTime = (
  start: string,
  todoMinTimeLength: number,
  heightPerHalfHour: number,
) => {
  const startTime = start.split('T')[1].split(':');

  const fullMinutesFromDayStart = parseInt(startTime[0], 10) * 60 + parseInt(startTime[1], 10);
  const result = (fullMinutesFromDayStart / todoMinTimeLength) * heightPerHalfHour;
  return result;
};

export const calculateItemWidth = (arrLength: number, maxTodoWidth: number) => {
  const width = maxTodoWidth / arrLength;
  return width;
};

export const calculateTop = (
  timestamp: number,
  todoMinTimeLength: number,
  heightPerHalfHour: number,
) => {
  const currentDate = new Date(timestamp);
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const fullMinutesFromDayStart = hours * 60 + minutes;
  const result = (fullMinutesFromDayStart / todoMinTimeLength) * heightPerHalfHour;
  return result;
};

export const calculateLeft = (currentWidth: number, currentIndex: number) => {
  const result = currentWidth * currentIndex;
  return result;
};

export const calculateDataAfterDrag = (
  HEIGHT_PER_HALF_HOUR: number,
  company: string,
  isDone: boolean,
  type: TodoTypes,
  height: number,
  top: number,
  title: string,
  text: string,
  date: string,
) => {
  const start = top / HEIGHT_PER_HALF_HOUR < 0 ? 0 : top / HEIGHT_PER_HALF_HOUR;
  const startTime = `${date}T${
    Math.floor(start / 2) < 10
      ? `0${Math.floor(start / 2)}`
      : `${Math.floor(start / 2)}`
  }:${start % 2 > 0 ? '30' : '00'}`;
  const end = (top + height) / HEIGHT_PER_HALF_HOUR > 48
    ? 48
    : (top + height) / HEIGHT_PER_HALF_HOUR;
  const endTime = `${date}T${
    Math.floor(end / 2) < 10
      ? `0${Math.floor(end / 2)}`
      : `${Math.floor(end / 2)}`
  }:${end % 2 > 0 ? '30' : '00'}`;
  const data: AddTodoRequest = {
    company,
    isDone,
    data: {
      type,
      startTime,
      endTime,
      title,
      text,
    },
  };
  return data;
};

export const handleDragging = (y: number, top: number) => {
  if (top < 0) {
    return 0;
  }
  if (y + top > 2112) {
    return top - y;
  }
  return top;
};
interface ILang {
  [key: string]: string;
}
interface IText {
  [key: string]: ILang;
}

export const handleDate = (
  currentDay: string,
  normalizedDate: string,
  lang: string,
) => {
  const text: IText = {
    ru: {
      '01': 'января',
      '02': 'февраля',
      '03': 'марта',
      '04': 'апреля',
      '05': 'мая',
      '06': 'июня',
      '07': 'июля',
      '08': 'августа',
      '09': 'сентября',
      10: 'октября',
      11: 'ноября',
      12: 'декабря',
    },
    en: {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    },
  };
  if (currentDay) {
    const [year, month, day] = currentDay.split('-');
    return `${day} ${text[lang][month]} ${year}`;
  }
  const [year, month, day] = normalizedDate.split('-');
  return `${day} ${text[lang][month]} ${year}`;
};
