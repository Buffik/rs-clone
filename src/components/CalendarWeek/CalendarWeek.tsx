/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import {
  getWeek,
  resToDayTask,
  resTaskData,
  isTaskMissed,
} from './calendarWeekHelper';
import styles from './CalendarWeek.module.scss';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  ActionTypeAtModalWindow,
  AddTodoRequest,
  FullTodoData,
  TodosByDayResponse,
  TodoTypes,
} from '../../types/types';
import Modal from '../Modals/Modal';
import TodoCreateModal from '../Modals/todoModal/TodoCreateModal';
import useFetching from '../../hooks/useFetching';
import TodosService from '../../services/TodosService';
import LoadingSpinner from '../UI/Spinner/LoadingSpinner';
import { selectDay } from '../../store/selectDaySlice';

// --------------------------------------------------------------
interface TextKey {
  weekDayNames: string[];
  monthNames: string[];
  complete: string;
  missed: string;
  future: string;
  noTasks: string;
  linkTask: string;
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
    missed: 'Просрочено',
    future: 'В процессе',
    noTasks: 'Нет заданий',
    linkTask: 'К задачам',
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
    missed: 'Missed',
    future: 'In progress',
    noTasks: 'No tasks',
    linkTask: 'To tasks',
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
  const dispatch = useAppDispatch();
  const changeSelectedDayState = (str: string) => {
    dispatch(selectDay(str));
  };
  const [modal, setModal] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [todoData, setTodoData] = useState<AddTodoRequest>({
    company: '',
    isDone: false,
    data: {
      type: TodoTypes.Common,
      startTime: '',
      endTime: '',
      title: '',
      text: '',
    },
  });
  const [fetchTodo, isFetchingTodo] = useFetching(async (id) => {
    if (id) {
      const response = await TodosService.fetchTodo(id);
      const { data } = response;
      setTodoData({
        ...todoData,
        company: data.company,
        isDone: data.isDone,
        data: {
          ...todoData.data,
          type: data.data.type,
          startTime: data.data.startTime,
          endTime: data.data.endTime,
          title: data.data.title,
          text: data.data.text,
        },
      });
    }
  });
  // eslint-disable-next-line operator-linebreak
  const { todayTask, setTodayTask, completeTodayTask, setCompleteTodayTask } =
    props;
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const normalizedDateString = (date: Date) => {
    const [day, month, year] = date.toLocaleDateString('ru-RU').split('.');
    return `${year}-${month}-${day}`;
  };

  const [tasksData, setTasksData] = useState<TodosByDayResponse>(
    {} as TodosByDayResponse,
  );
  const languageState: string = useAppSelector((state) => state.data.language);

  useEffect(() => {
    setShouldUpdate(false);
  }, [tasksData]);

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

  useEffect(() => {
    if (shouldUpdate) {
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
    }
  }, [shouldUpdate]);

  const handleChange = async () => {
    setShouldUpdate(true);
  };

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
  useEffect(() => {
    if (isFetchingTodo) {
      document.body.style.overflow = 'hidden';
    }
  }, [isFetchingTodo]);

  return (
    <>
      {modal && (
        <Modal visible={modal} setVisible={setModal}>
          <TodoCreateModal
            todoId={todoId}
            todoData={todoData}
            setTodoData={setTodoData}
            actionType={ActionTypeAtModalWindow.Update}
            propsStartTime={
              todoData.data.startTime
                ? todoData.data.startTime.split('T')[1]
                : ''
            }
            propsEndTime={
              todoData.data.endTime ? todoData.data.endTime.split('T')[1] : ''
            }
            todoCompany={todoData.company}
            fetchTodos={handleChange}
            propsStartDate={
              todoData.data.startTime
                ? todoData.data.startTime.split('T')[0]
                : ''
            }
            setShowModal={setModal}
          />
        </Modal>
      )}
      <div className={styles.calendarWeek}>
        <div className={styles.completedRow}>
          <div
            className={styles.completedBar}
            style={{
              width: `${
                todayTask ? (completeTodayTask * 100) / todayTask : 0
              }%`,
            }}
          />
        </div>
        <div className={styles.lineWrapper}>
          <div className={styles.selectedDay}>
            {text[languageState].monthNames[selectDate.getMonth()]}{' '}
            {selectDate.getDate()}, {selectDate.getFullYear()}
          </div>
          <Link
            className={styles.link}
            onClick={() =>
              changeSelectedDayState(normalizedDateString(selectDate))
            }
            to="/tasks"
          >
            {text[languageState].linkTask}
          </Link>
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
          {isFetchingTodo && (
            <div className={styles.loadingWrapper}>
              <LoadingSpinner />
            </div>
          )}
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
                      <div className={styles.taskTextRowLabels}>
                        <div
                          className={
                            task.isDone ? styles.taskStatus : styles.displayNone
                          }
                        >
                          {text[languageState].complete}
                        </div>
                        {!task.isDone && isTaskMissed(item.start) && (
                          <div className={styles.missed}>
                            {text[languageState].missed}
                          </div>
                        )}
                        {!task.isDone && !isTaskMissed(item.start) && (
                          <div className={styles.future}>
                            {text[languageState].future}
                          </div>
                        )}
                        <button
                          type="button"
                          className={styles.itemDataButton}
                          onClick={async () => {
                            await setTodoId(item._id);
                            await fetchTodo(item._id);
                            setModal(true);
                          }}
                        >
                          <ModeIcon className={styles.itemDataIcon} />
                        </button>
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
    </>
  );
}

export default CallendarWeek;
