import React from 'react';
import axios from 'axios';
import { Todos } from '../../types/types';

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
  setTaskData: React.Dispatch<React.SetStateAction<Todos>>,
  year: number,
  month: number,
  day: number,
) => {
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const getString = `http://127.0.0.1:5000/todos?range=day&date=${year}-${monthStr}-${dayStr}`;
  const response = await axios.get(getString);
  const { data } = response;
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
  const getString = `http://127.0.0.1:5000/todos?range=month&date=${year}-${monthStr}`;
  const response = await axios.get(getString);
  const { data } = response;
  setTodayTask(data[day].complete + data[day].future + data[day].missed);
  setCompletTodayTask(data[day].complete);
};
