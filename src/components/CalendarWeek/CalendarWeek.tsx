import React from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './CalendarWeek.module.scss';

const currentDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
};

const weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const selectedWekDays = [28, 29, 30, 31, 1, 2, 3];

const resToDayTask = async (
  year: number,
  month: number,
  day: number,
) => {
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const getString = `http://127.0.0.1:5000/todos?range=day&date=${year}-${monthStr}-${dayStr}`;
  const response = await axios.get(getString);
  const { data } = response;
  console.log(year, monthStr, dayStr);
  console.log(data);
};

function CallendarWeek() {
  console.log(currentDate.day);
  resToDayTask(2023, 2, 12);
  return (
    <div className={styles.calendarWeek}>
      <div className={styles.completedRow}><div className={styles.completedBar} /></div>
      <div className={styles.selectedDay}>23 December, Sunday</div>
      <div className={styles.selectDayRow}>
        {weekDayNames.map(
          (day, index) => (
            <div className={styles.selectDayCol} key={Math.random()}>
              <div className={styles.selectDay}>{day}</div>
              <div className={styles.selectDate}>{selectedWekDays[index]}</div>
            </div>
          ),
        )}
      </div>
      <div className={styles.divider} />
      <div className={styles.taskList}>
        <Paper elevation={4} className={styles.taskCard}>
          <div className={styles.taskNameTypeRow}>
            <div className={styles.taskName}>Send benefit review by Sunday</div>
            <div className={styles.taskType}>Reminder</div>
          </div>
          <div className={styles.dateRow}>
            <div className={styles.dueDate}>Due date:</div>
            <div className={styles.taskDate}>December 23, 2018</div>
          </div>
          <div className={styles.managerStatusRow}>
            <div className={styles.manager}>
              <AccountCircleIcon fontSize="medium" />
              <div className={styles.nameManager}>George Fields</div>
            </div>
            <div className={styles.taskStatus}>Completed</div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default CallendarWeek;
