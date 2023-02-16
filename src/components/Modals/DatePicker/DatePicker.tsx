/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  handleMinutesToHalfHour,
  validateStartEndTime,
} from '../../utils/validateTimeTodo';
import { ICreateModal } from '../todoModal/TodoCreateModal';
import styles from './DatePicker.module.scss';

interface IDatePicker {
  setTimeValid: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoData: React.Dispatch<React.SetStateAction<ICreateModal>>;
}

function DatePicker({ setTimeValid, setTodoData }: IDatePicker) {
  const [startTime, setStartTime] = useState(''); // принимать начальное значение по клику на область времени
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState(''); // принимать начальное значение по клику на область времени
  const [canSaveData, setCanSaveData] = useState(false);
  console.log(date);
  console.log(canSaveData);

  useEffect(() => {
    const handleChangeTime = setTimeout(() => {
      if (startTime.split(':')[0]) {
        setStartTime(handleMinutesToHalfHour(startTime));
      }
    }, 800);

    return () => {
      clearTimeout(handleChangeTime);
    };
  }, [startTime]);

  useEffect(() => {
    const handleChangeTime = setTimeout(() => {
      if (startTime.split(':')[0]) {
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
      <input
        value={startTime}
        onChange={(e) => setStartTime(e.currentTarget.value)}
        className={styles.dateTimePicker}
        type="time"
        step="1800"
      />
      <input
        value={endTime}
        onChange={(e) => setEndTime(e.currentTarget.value)}
        className={styles.dateTimePicker}
        type="time"
        step="1800"
      />
      <input
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        className={styles.dateDatePicker}
        type="date"
      />
    </div>
  );
}

export default DatePicker;
