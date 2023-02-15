import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Calendar from '../../components/Calendar/Calendar';
import CalendarWeek from '../../components/CalendarWeek/CalendarWeek';
import { useAppSelector } from '../../hook';
import styles from './CalendarPage.module.scss';

const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const currentDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
};

function CalendarPage() {
  const [todayTask, setTodayTask] = useState(0);
  const [completTodayTask, setCompletTodayTask] = useState(0);
  const [show, showAge] = useState('month');
  const showChange = (event: SelectChangeEvent) => showAge(event.target.value);
  const [monthDate, setMonthDate] = useState(String(currentDate.month));
  const changeMonth = (event: SelectChangeEvent) => setMonthDate(event.target.value as string);
  const [yearDate, setYearDate] = useState(String(currentDate.year));
  const changeYear = (event: SelectChangeEvent) => setYearDate(event.target.value as string);
  // global state -----------------------------------------
  // language
  const languageState: string = useAppSelector((state) => state.language.language);
  // --------------------------------------------------------------
  interface TextKey {
    monthNames: string[],
    show: string,
    month: string,
    week: string
  }
  interface Text {
    [key: string]: TextKey
  }
  const text: Text = {
    ru: {
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      show: 'Показaть',
      month: 'Месяц',
      week: 'Неделя',
    },
    en: {
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      show: 'Show',
      month: 'Month',
      week: 'Week',
    },
  };
  // ------------------------------------------------------------------
  return (
    <Paper elevation={4} className={styles.calendarPage}>
      <div className={styles.setBox}>

        <div className={styles.yearMonthRow} style={show === 'month' ? { display: 'flex' } : { display: 'none' }}>
          <Select
            value={yearDate}
            onChange={changeYear}
            sx={{ minWidth: 100, height: 30 }}
          >
            {years.map(
              (year) => <MenuItem key={Math.random()} value={year}>{year}</MenuItem>,
            )}
          </Select>
          <Select
            sx={{ minWidth: 100, height: 30 }}
            value={monthDate}
            onChange={changeMonth}
          >
            {text[languageState].monthNames.map(
              (month, index) => <MenuItem key={Math.random()} value={index}>{month}</MenuItem>,
            )}
          </Select>
        </div>
        <div className={styles.completed} style={show === 'week' ? { display: 'flex' } : { display: 'none' }}>
          {completTodayTask} task completed out of {todayTask}
        </div>

        <div className={styles.selectRow}>
          <div className={styles.show}>{text[languageState].show}:</div>
          <Select
            value={show}
            onChange={showChange}
            sx={{ minWidth: 100, height: 30 }}
          >
            <MenuItem value="month">{text[languageState].month}</MenuItem>
            <MenuItem value="week">{text[languageState].week}</MenuItem>
          </Select>
        </div>
      </div>

      <div className={styles.divider} />
      <div style={show === 'month' ? { display: 'flex' } : { display: 'none' }} className={styles.calendarBox}>
        <Calendar year={yearDate} month={monthDate} />
      </div>
      <div style={show === 'week' ? { display: 'flex' } : { display: 'none' }} className={styles.calendarBox}>
        <CalendarWeek
          todayTask={todayTask}
          setTodayTask={setTodayTask}
          completTodayTask={completTodayTask}
          setCompletTodayTask={setCompletTodayTask}
        />
      </div>
    </Paper>
  );
}

export default CalendarPage;
