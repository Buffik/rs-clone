/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { getWeek, resToDayTask, resTaskData } from './calendarWeekHelper';
import styles from './CalendarWeek.module.scss';
import { useAppSelector } from '../../hook';
import { FullTodoData, TodosByDayResponse } from '../../types/types';

// --------------------------------------------------------------
interface TextKey {
  weekDayNames: string[];
  monthNames: string[];
  complete: string;
  noTasks: string;
}
interface Text {
  [key: string]: TextKey;
}
const text: Text = {
  ru: {
    weekDayNames: [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ],
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    complete: 'Выполенено',
    noTasks: 'Нет заданий',
  },
  en: {
    weekDayNames: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    complete: 'Completed',
    noTasks: 'No tasks',
  },
};
// ------------------------------------------------------------------

interface Props {
  todayTask: number;
  setTodayTask: React.Dispatch<React.SetStateAction<number>>;
  completeTodayTask: number;
  setCompleteTodayTask: React.Dispatch<React.SetStateAction<number>>;
}

function CallendarWeek(props: Props) {
  // eslint-disable-next-line operator-linebreak
  const { todayTask, setTodayTask, completeTodayTask, setCompleteTodayTask } =
    props;
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [tasksData, setTasksData] = useState<TodosByDayResponse>(
    {} as TodosByDayResponse,
  );
  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );

  useEffect(() => {
    resToDayTask(
      setTasksData,
      selectDate.getFullYear(),
      selectDate.getMonth() + 1,
      selectDate.getDate(),
    );
    resTaskData(
      setTodayTask,
      setCompleteTodayTask,
      selectDate.getFullYear(),
      selectDate.getMonth() + 1,
      selectDate.getDate() - 1,
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
  console.log(tasksData);

  return (
    <div className={styles.calendarWeek}>
      <div className={styles.completedRow}>
        <div
          className={styles.completedBar}
          style={{
            width: `${todayTask ? (completeTodayTask * 100) / todayTask : 0}%`,
          }}
        />
      </div>
      <div className={styles.selectedDay}>
        {/* eslint-disable-next-line max-len */}
        {text[languageState].monthNames[selectDate.getMonth()]}{' '}
        {selectDate.getDate()}, {selectDate.getFullYear()}
      </div>
      <div className={styles.selectDayRow}>
        <button
          type="button"
          className={styles.selectWeekBtn}
          onClick={clickPreWeek}
        >
          {'<'}
        </button>
        <div className={styles.selectDayRow}>
          {text[languageState].weekDayNames.map((day, index) => (
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
          ))}
        </div>
        <button
          type="button"
          className={styles.selectWeekBtn}
          onClick={clickNextWeek}
        >
          {'>'}
        </button>
      </div>
      <div className={styles.divider} />
      <div className={styles.taskList}>
        {tasksData.todos && tasksData.todos.length > 0 ? (
          tasksData.todosPlacement.map((array) =>
            array.map((item) => {
              const task = tasksData.todos.find(
                // eslint-disable-next-line no-underscore-dangle
                (todo) => item._id === todo._id,
              ) as FullTodoData;
              return (
                <Paper
                  elevation={4}
                  className={styles.taskCard}
                  key={task._id}
                  id={task._id}
                >
                  <div className={styles.taskNameTypeRow}>
                    <div className={styles.taskName}>{task.data.title}</div>
                    <div className={styles.taskType}>{task.data.type}</div>
                  </div>
                  <div className={styles.dateRow}>
                    {task.data.startTime.slice(-5)} -{' '}
                    {task.data.endTime.slice(-5)}
                  </div>
                  <div className={styles.taskTextRow}>
                    <div className={styles.taskText}>{task.data.text}</div>
                    <div
                      className={
                        task.isDone ? styles.taskStatus : styles.dispayNone
                      }
                    >
                      {text[languageState].complete}
                    </div>
                  </div>
                </Paper>
              );
            }),
          )
        ) : (
          <div className={styles.noTasks}>{text[languageState].noTasks}</div>
        )}
      </div>
    </div>
  );
}

export default CallendarWeek;
