import React from 'react';
import styles from './CalendarWeek.module.scss';

const currentDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
};

const weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function CallendarWeek() {
  return (
    <div className={styles.calendarWeek}>
      <div className={styles.completedRow}><div className={styles.completedBar} /></div>
      <div className={styles.selectedDay}>23 December, Sunday</div>
      <div className={styles.selectDayRow}>
        {weekDayNames.map(
          (day) => (
            <div className={styles.selectDayCol}>
              <div className={styles.selectDay}>{day}</div>
              <div className={styles.selectDate}>14</div>
            </div>
          ),
        )}
      </div>
      <div>month - {currentDate.month}</div>
      <div>day - {currentDate.day}</div>
    </div>
  );
}

export default CallendarWeek;
