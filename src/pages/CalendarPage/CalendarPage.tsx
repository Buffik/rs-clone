import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './CalendarPage.module.scss';

function CalendarPage() {
  const [show, showAge] = useState('month');
  const showChange = (event: SelectChangeEvent) => showAge(event.target.value);

  return (
    <Paper elevation={5} className={styles.calendar}>
      <div className={styles.setBox}>
        <div className={styles.yearMonthRow}>
          <div className={styles.year}>2023</div>
          <div className={styles.month}>Февраль</div>
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
      <div className={styles.calendarBox}>Блок календаря</div>
    </Paper>
  );
}

export default CalendarPage;
