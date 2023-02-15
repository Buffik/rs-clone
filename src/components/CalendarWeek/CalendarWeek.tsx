import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Todos } from '../../types/types';
import styles from './CalendarWeek.module.scss';

const weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
  setTaskData: React.Dispatch<React.SetStateAction<Todos>>,
  year: number,
  month: number,
  day: number,
) => {
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  const getString = `http://127.0.0.1:5000/todos?range=day&date=${year}-${monthStr}-${dayStr}`;
  const response = await axios.get(getString);
  const { data } = response;
  setTaskData(data);
};

function CallendarWeek() {
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [tasksData, setTasksData] = useState<Todos>({} as Todos);
  console.log(tasksData);

  useEffect(() => {
    resToDayTask(
      setTasksData,
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDate(),
    );
  }, [selectDate]);

  const currentWeek = getWeek(
    selectDate.getFullYear(),
    selectDate.getMonth(),
    selectDate.getDate(),
  );

  const clickOnDate = (date: Date) => {
    setSelectDate(date);
  };

  const clickPreWeek = () => {
    const date = new Date(selectDate);
    date.setDate(selectDate.getDate() - 7);
    setSelectDate(date);
  };

  const clickNextWeek = () => {
    const date = new Date(selectDate);
    date.setDate(selectDate.getDate() + 7);
    setSelectDate(date);
  };

  return (
    <div className={styles.calendarWeek}>
      <div className={styles.completedRow}><div className={styles.completedBar} /></div>
      <div className={styles.selectedDay}>
        {monthNames[selectDate.getMonth()]} {selectDate.getDate()}, {selectDate.getFullYear()}
      </div>
      <div className={styles.selectDayRow}>
        <button type="button" className={styles.selectWeekBtn} onClick={clickPreWeek}>←</button>
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
        <button type="button" className={styles.selectWeekBtn} onClick={clickNextWeek}>→</button>
      </div>
      <div className={styles.divider} />
      <div className={styles.taskList}>
        {
          tasksData.todos && tasksData.todos.length > 0
            ? tasksData.todos.map(
              () => (
                <Paper elevation={4} className={styles.taskCard} key={Math.random()}>
                  <div className={styles.taskNameTypeRow}>
                    <div className={styles.taskName}>Name</div>
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
              ),
            )
            : <div className={styles.noTasks}>No tasks</div>
        }
      </div>
    </div>
  );
}

export default CallendarWeek;
