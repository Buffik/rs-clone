import React from 'react';
import axios from 'axios';

export const weekDayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const DAYS_IN_WEEK = 7;
const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];
export const currentDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
};

const getDayOfWeek = (year: number, month: number) => {
  const date = new Date(year, month);
  const dayOfWeek = date.getDay();
  return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
};

const getDaysInMonth = (
  year: number,
  month: number,
) => new Date(year, month + 1, 0).getDate();

export const getMonthData = (year: number, month: number) => {
  const result: (number | undefined)[][] = [];
  const daysInMonth = getDaysInMonth(year, month);
  const monthStartsOn = getDayOfWeek(year, month);
  let day = 1;
  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i += 1) {
    result[i] = [];
    for (let j = 0; j < DAYS_IN_WEEK; j += 1) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined;
      } else {
        result[i][j] = day;
        day += 1;
      }
    }
  }
  return result;
};

// --------------------------------------------------------
export interface TaskDay {
  complete: number,
  future: number,
  missed: number,
}

export const resTaskData = async (
  setTaskData: React.Dispatch<React.SetStateAction<TaskDay[]>>,
  year: number,
  month: number,
) => {
  const monthStr = String(month).padStart(2, '0');
  const getString = `http://127.0.0.1:5000/todos?range=month&date=${year}-${monthStr}`;
  const response = await axios.get(getString);
  const { data } = response;
  setTaskData(data);
};
// ----------------------------------------------------------
