import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hook';
import styles from './Calendar.module.scss';
import {
  currentDate,
  getMonthData,
  resTaskData,
  TaskDay,
} from './calendarHelper';

interface Props {
  year: string,
  month: string
}

function Calendar(props: Props) {
  const { year, month } = props;
  const monthData = getMonthData(+year, +month);
  const [taskData, setTaskData] = useState<TaskDay[]>([]);
  // global state -----------------------------------------
  // language
  const languageState: string = useAppSelector((state) => state.language.language);
  // --------------------------------------------------------------
  interface TextKey {
    weekDayNames: string[],
    future: string,
    complete: string,
    missed: string
  }
  interface Text {
    [key: string]: TextKey
  }
  const text: Text = {
    ru: {
      weekDayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      future: 'Текущие',
      complete: 'Выполененые',
      missed: 'Пропущеные',
    },
    en: {
      weekDayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      future: 'Future',
      complete: 'Complete',
      missed: 'Missed',
    },
  };
  // ------------------------------------------------------------------

  useEffect(() => {
    resTaskData(setTaskData, +year, +month + 1);
  }, [year, month]);

  console.log(taskData);
  console.log(monthData);
  console.log(currentDate.day, currentDate.month, currentDate.year);
  console.log(month, year);

  return (
    <div className={styles.calendar}>
      <div className={styles.dayRow}>
        {text[languageState].weekDayNames.map(
          (dayName) => <div className={styles.dayName} key={Math.random()}>{dayName}</div>,
        )}
      </div>
      <div className={styles.calTable}>
        {monthData.map(
          (arr: (number | undefined)[]) => arr.map(
            (day) => (
              <div
                className={
                  currentDate.day === day
                    && currentDate.month === +month
                    && currentDate.year === +year
                    ? styles.todayCell : styles.calCell
                }
                key={Math.random()}
              >
                <div className={day ? styles.calDay : styles.emptyCalDay}>
                  <div className={styles.date}>{day}</div>
                  <div className={styles.taskBox}>
                    <div className={styles.future}>
                      <div>{text[languageState].future}:</div>
                      <div>{day && taskData[day] ? taskData[day].future : 0}</div>
                    </div>
                    <div className={styles.complete}>
                      <div>{text[languageState].complete}:</div>
                      <div>{day && taskData[day] ? taskData[day].complete : 0}</div>
                    </div>
                    <div className={styles.missed}>
                      <div>{text[languageState].missed}:</div>
                      <div>{day && taskData[day] ? taskData[day].missed : 0}</div>
                    </div>
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
