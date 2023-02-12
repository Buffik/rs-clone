import React from 'react';
import Paper from '@mui/material/Paper';
import styles from './CalendarWeek.module.scss';

const currentDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
};

const weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const selectedWekDays = [28, 29, 30, 31, 1, 2, 3];

function CallendarWeek() {
  console.log(currentDate.day);
  return (
    <div className={styles.calendarWeek}>
      <div className={styles.completedRow}><div className={styles.completedBar} /></div>
      <div className={styles.selectedDay}>23 December, Sunday</div>
      <div className={styles.selectDayRow}>
        {weekDayNames.map(
          (day, index) => (
            <div className={styles.selectDayCol}>
              <div className={styles.selectDay}>{day}</div>
              <div className={styles.selectDate}>{selectedWekDays[index]}</div>
            </div>
          ),
        )}
      </div>
      <div className={styles.divider} />
      <div className={styles.taskList}>
        <Paper elevation={5} className={styles.taskCard}>
          Task
        </Paper>
        <Paper elevation={5} className={styles.taskCard}>
          Task
        </Paper>
        <Paper elevation={5} className={styles.taskCard}>
          Task
        </Paper>
      </div>
    </div>
  );
}

export default CallendarWeek;
