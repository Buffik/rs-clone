import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.scss';
import {
  weekDayNames,
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
        {weekDayNames.map(
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
                      Future: {day && taskData[day] ? taskData[day].future : 0}
                    </div>
                    <div className={styles.complete}>
                      Complete: {day && taskData[day] ? taskData[day].complete : 0}
                    </div>
                    <div className={styles.missed}>
                      Missed: {day && taskData[day] ? taskData[day].missed : 0}
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
