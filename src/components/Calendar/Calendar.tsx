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
interface TaskDay {
  complete: number,
  future: number,
  missed: number,
}

const resTaskData = async (
  setTaskData: React.Dispatch<React.SetStateAction<TaskDay[]>>,
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
  const [taskData, setTaskData] = useState<TaskDay[]>([]);

  useEffect(() => { // TODO не срабатывает при изменении даты
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
                <div className={day ? styles.calDay : styles.emptyCalDay}>
                  <div className={styles.date}>{day}</div>
                  <div className={styles.taskBox}>
                    <div className={styles.future}>
                      Future: {day && taskData.length > 0 ? taskData[day].future : 0}
                    </div>
                    <div className={styles.complete}>Complete: {0}</div>
                    <div className={styles.missed}> Missed: {0}</div>
                  </div>
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
