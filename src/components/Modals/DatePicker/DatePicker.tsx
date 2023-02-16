/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { TodoFromClient } from '../../../types/types';
import {
  handleMinutesToHalfHour,
  validateStartEndTime,
} from '../../utils/validateTimeTodo';
import styles from './DatePicker.module.scss';

interface IDatePicker {
  setTimeValid: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoData: React.Dispatch<React.SetStateAction<TodoFromClient>>;
  propsStartTime: string;
  propsStartDate: string;
}

function DatePicker({
  setTimeValid,
  setTodoData,
  propsStartTime,
  propsStartDate,
}: IDatePicker) {
  const [startTime, setStartTime] = useState(propsStartTime);
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState(propsStartDate);
  const [canSaveData, setCanSaveData] = useState(false);

  useEffect(() => {
    const handleChangeTime = setTimeout(() => {
      if (startTime !== propsStartTime && startTime.split(':')[0]) {
        setStartTime(handleMinutesToHalfHour(startTime));
      }
    }, 800);

    return () => {
      clearTimeout(handleChangeTime);
    };
  }, [startTime]);

  useEffect(() => {
    const handleChangeTime = setTimeout(() => {
      if (endTime.split(':')[0]) {
        setEndTime(handleMinutesToHalfHour(endTime));
      }
    }, 800);

    return () => {
      clearTimeout(handleChangeTime);
    };
  }, [endTime]);

  useEffect(() => {
    const isValid = validateStartEndTime(startTime, endTime, date);
    setTimeValid(isValid);
    setCanSaveData(isValid);
  }, [startTime, endTime, date]);

  useEffect(() => {
    if (canSaveData) {
      const startDateData = [date, startTime].join('T');
      const endDateData = [date, endTime].join('T');
      setTodoData((prev) => ({
        ...prev,
        data: { ...prev.data, startTime: startDateData, endTime: endDateData },
      }));
    }
  }, [canSaveData, startTime, endTime, date]);

  return (
    <div className={styles.date}>
      <div className={styles.dateTimePicker}>
        <input
          value={startTime}
          onChange={(e) => setStartTime(e.currentTarget.value)}
          className={styles.dateTimePickerInput}
          type="time"
          step="1800"
        />
      </div>
      <div className={styles.dateTimePicker}>
        <input
          value={endTime}
          onChange={(e) => setEndTime(e.currentTarget.value)}
          className={styles.dateTimePickerInput}
          type="time"
          step="1800"
        />
      </div>
      <div className={styles.dateDatePicker}>
        <input
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
          className={styles.dateDatePickerInput}
          type="date"
        />
      </div>
    </div>
  );
}

export default DatePicker;
