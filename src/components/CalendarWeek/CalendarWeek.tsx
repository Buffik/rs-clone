import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './CalendarWeek.module.scss';

const weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getWeek = (
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
  console.log(data);
};

function CallendarWeek() {
  resToDayTask(2023, 2, 12);
  const [selectDate, setSelectDate] = useState(new Date());

  const currentWeek = getWeek(
    selectDate.getFullYear(),
    selectDate.getMonth(),
    selectDate.getDate(),
  );

  const clickOnDate = (date: Date) => {
    setSelectDate(date);
  };

  console.log('selectDate', selectDate);

  return (
    <div className={styles.calendarWeek}>
      <div className={styles.completedRow}><div className={styles.completedBar} /></div>
      <div className={styles.selectedDay}>23 December, Sunday</div>
      <div className={styles.selectDayRow}>
        {weekDayNames.map(
          (day, index) => (
            <div className={styles.selectDayCol} key={Math.random()}>
              <div className={styles.selectDay}>{day}</div>
              <button
                type="button"
                className={
                  currentWeek[index].getDate() === selectDate.getDate()
                    ? styles.selectedDate
                    : styles.selectDate
                }
                onClick={() => clickOnDate(currentWeek[index])}
              >
                {currentWeek[index].getDate()}
              </button>
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
