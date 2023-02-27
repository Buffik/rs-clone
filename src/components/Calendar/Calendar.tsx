/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hook';
import { selectDay } from '../../store/selectDaySlice';
import LoadingSpinner from '../UI/Spinner/LoadingSpinner';
import styles from './Calendar.module.scss';
import {
  currentDate,
  getMonthData,
  resTaskData,
  TaskDay,
} from './calendarHelper';

// --------------------------------------------------------------
interface TextKey {
  weekDayNames: string[];
  future: string;
  complete: string;
  missed: string;
}
interface Text {
  [key: string]: TextKey;
}
const text: Text = {
  ru: {
    weekDayNames: [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ],
    future: 'Текущие',
    complete: 'Выполененые',
    missed: 'Пропущеные',
  },
  en: {
    weekDayNames: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    future: 'Future',
    complete: 'Complete',
    missed: 'Missed',
  },
};
// ------------------------------------------------------------------

interface Props {
  year: string;
  month: string;
}

function Calendar(props: Props) {
  const { year, month } = props;
  const monthData = getMonthData(+year, +month);
  const [taskData, setTaskData] = useState<TaskDay[]>([]);
  const languageState: string = useAppSelector(
    (state) => state.data.language,
  );
  useEffect(() => {
    resTaskData(setTaskData, +year, +month + 1);
  }, [year, month]);

  // ----------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const changeSelectedDayState = (str: string) => {
    dispatch(selectDay(str));
  };
  const clickOnDay = (
    sYear: string,
    sMonth: string,
    sDay: number | undefined,
  ) => {
    const monthStr = String(+sMonth + 1).padStart(2, '0');
    const dayStr = String(sDay).padStart(2, '0');
    const selDay = `${sYear}-${monthStr}-${dayStr}`;
    changeSelectedDayState(selDay);
  };
  // -----------------------------------------------------------------------------

  if (!taskData.length && taskData) {
    return <LoadingSpinner />;
  }
  return (
    <div className={styles.calendar}>
      <div className={styles.dayRow}>
        {text[languageState].weekDayNames.map((dayName) => (
          <div className={styles.dayName} key={Math.random()}>
            {dayName}
          </div>
        ))}
      </div>
      <div className={styles.calTable}>
        {monthData.map((arr: (number | undefined)[]) =>
          arr.map((day) => (
            <div
              className={
                currentDate.day === day &&
                currentDate.month === +month &&
                currentDate.year === +year
                  ? styles.todayCell
                  : styles.calCell
              }
              key={Math.random()}
            >
              <Link
                className={day ? styles.calDay : styles.emptyCalDay}
                onClick={() => {
                  clickOnDay(year, month, day);
                }}
                to="/tasks"
              >
                <div className={styles.date}>{day}</div>
                <div className={styles.taskBox}>
                  <div
                    className={
                      day && taskData[day - 1]?.future
                        ? styles.future
                        : styles.displayNone
                    }
                  >
                    <div>
                      {day && taskData[day - 1] ? taskData[day - 1].future : 0}
                    </div>
                  </div>
                  <div
                    className={
                      day && taskData[day - 1]?.complete
                        ? styles.complete
                        : styles.displayNone
                    }
                  >
                    <div>
                      {day && taskData[day - 1]
                        ? taskData[day - 1].complete
                        : 0}
                    </div>
                  </div>
                  <div
                    className={
                      day && taskData[day - 1]?.missed
                        ? styles.missed
                        : styles.displayNone
                    }
                  >
                    <div>
                      {day && taskData[day - 1] ? taskData[day - 1].missed : 0}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export default Calendar;
