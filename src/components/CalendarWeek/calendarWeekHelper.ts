import React from 'react';
import { TodosByDayResponse } from '../../types/types';
import TodosService from '../../services/TodosService';

export const getWeek = (
  year: number,
  month: number,
  day: number,
) => {
  const date = new Date(year, month, day);
  const weekDay = date.getDay();
  const monthDay = date.getDate();
  const weekLength = 7;
  const result: Date[] = [];
  const monDate = new Date(date);
  if (weekDay === 0) monDate.setDate(monthDay - 6);
  else monDate.setDate(monthDay - (weekDay - 1));
  for (let i = 0; i < weekLength; i += 1) {
    const tempDate = new Date(monDate);
    tempDate.setDate(tempDate.getDate() + i);
    result.push(tempDate);
  }
  return result;
};

export const resToDayTask = async (
  setTaskData: React.Dispatch<React.SetStateAction<TodosByDayResponse[]>>,
  year: number,
  month: number,
  day: number,
) => {
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const getString = `${year}-${monthStr}-${dayStr}`;
  const response = await TodosService.fetchTodosByDay(getString);
  const { data } = response;
  console.log(data);
  setTaskData(data);
};

export interface TaskDay {
  complete: number,
  future: number,
  missed: number,
}

export const resTaskData = async (
  setTodayTask: React.Dispatch<React.SetStateAction<number>>,
  setCompletTodayTask: React.Dispatch<React.SetStateAction<number>>,
  year: number,
  month: number,
  day: number,
) => {
  const monthStr = String(month).padStart(2, '0');
  const getString = `${year}-${monthStr}`;
  const response = await TodosService.fetchTodosByMonth(getString);
  const { data } = response;
  setTodayTask(data[day].complete + data[day].future + data[day].missed);
  setCompletTodayTask(data[day].complete);
};
