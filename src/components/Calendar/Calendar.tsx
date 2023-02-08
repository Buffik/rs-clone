import React from 'react';
import styles from './Calendar.module.scss';

const defData = {
  date: new Date(),
  years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  weekDayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
};

const DAYS_IN_WEEK = 7;

const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

export function getDayOfWeek(year: number, month: number) {
  const date = new Date(year, month);
  const dayOfWeek = date.getDay();
  return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}

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

function Calendar() {
  const monthData = getMonthData(2023, 1);
  return (
    <div className={styles.calendar}>
      <div className={styles.dayRow}>
        {defData.weekDayNames.map(
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
