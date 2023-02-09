import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Calendar from '../../components/Calendar/Calendar';
import styles from './CalendarPage.module.scss';

const defData = {
  years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
};

const currentDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDay(),
};

function CalendarPage() {
  const [show, showAge] = useState('month');
  const showChange = (event: SelectChangeEvent) => showAge(event.target.value);
  const [monthDate, setMonthDate] = useState(String(currentDate.month));
  const changeMonth = (event: SelectChangeEvent) => setMonthDate(event.target.value as string);
  const [yearDate, setYearDate] = useState(String(currentDate.year));
  const changeYear = (event: SelectChangeEvent) => setYearDate(event.target.value as string);

  return (
    <Paper elevation={5} className={styles.calendarPage}>
      <div className={styles.setBox}>
        <div className={styles.yearMonthRow}>
          <Select
            value={yearDate}
            onChange={changeYear}
            sx={{ minWidth: 100, height: 30 }}
          >
            {defData.years.map(
              (year) => <MenuItem key={Math.random()} value={year}>{year}</MenuItem>,
            )}
          </Select>

          <Select
            sx={{ minWidth: 100, height: 30 }}
            value={monthDate}
            onChange={changeMonth}
          >
            {defData.monthNames.map(
              (month, index) => <MenuItem key={Math.random()} value={index}>{month}</MenuItem>,
            )}
          </Select>
        </div>
        <div className={styles.selectRow}>
          <div className={styles.show}>Show:</div>
          <Select
            value={show}
            onChange={showChange}
            sx={{ minWidth: 100, height: 30 }}
          >
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="week">Week</MenuItem>
          </Select>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.calendarBox}>
        <Calendar year={yearDate} month={monthDate} />
      </div>
    </Paper>
  );
}

export default CalendarPage;
