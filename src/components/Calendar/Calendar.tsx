import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Calendar.module.scss';

const weekDayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const DAYS_IN_WEEK = 7;

const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

const getDayOfWeek = (year: number, month: number) => {
  const date = new Date(year, month);
  const dayOfWeek = date.getDay();
  return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const getMonthData = (year: number, month: number) => {
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
interface TaskData {
  complete: number,
  future: number,
  missed: number,
}
interface TasksData {
  [index: number]: TaskData,
}
const resTaskData = async (
  setTaskData: React.Dispatch<React.SetStateAction<TasksData>>,
  year: number,
  month: number,
) => {
  const monthStr = String(month).padStart(2, '0');
  console.log(year, monthStr);
  const getString = `http://127.0.0.1:5000/todos?range=month&date=${year}-${monthStr}`;
  const response = await axios.get(getString);
  const { data } = response;
  setTaskData(data);
};
// ----------------------------------------------------------

interface Props {
  year: string,
  month: string
}

function Calendar(props: Props) {
  const { year, month } = props;
  const monthData = getMonthData(+year, +month);
  const [taskData, setTaskData] = useState<TasksData>([]);

  useEffect(() => {
    resTaskData(setTaskData, +year, +month + 1);
  }, []);
  console.log(taskData);

  return (
    <div className={styles.calendar}>
      <div className={styles.dayRow}>
        {weekDayNames.map(
          (dayName) => <div className={styles.dayName} key={Math.random()}>{dayName}</div>,
        )}
      </div>
      <div className={styles.calTable}>
        {monthData.map(
          (arr: (number | undefined)[]) => arr.map(
            (day) => (
              <div className={styles.calCell} key={Math.random()}>
                <div className={styles.calDay}>
                  {day}
                </div>
              </div>
            ),
          ),
        )}
      </div>
    </div>
  );
}

export default Calendar;
