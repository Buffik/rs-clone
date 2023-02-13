/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { fetchCurrentDayTodos } from '../../../store/currentDayTodosSlice';
import DraggableItem from '../DraggableItem';
import styles from './DroppableArea.module.scss';

type TAreaData = { time: string };
const areaData: TAreaData[] = [
  { time: '00:00' },
  { time: '00:30' },
  { time: '01:00' },
  { time: '01:30' },
  { time: '02:00' },
  { time: '02:30' },
  { time: '03:00' },
  { time: '03:30' },
  { time: '04:00' },
  { time: '04:30' },
  { time: '05:00' },
  { time: '05:30' },
  { time: '06:00' },
  { time: '06:30' },
  { time: '07:00' },
  { time: '07:30' },
  { time: '08:00' },
  { time: '08:30' },
  { time: '09:00' },
  { time: '09:30' },
  { time: '10:00' },
  { time: '10:30' },
  { time: '11:00' },
  { time: '11:30' },
  { time: '12:00' },
  { time: '12:30' },
  { time: '13:00' },
  { time: '13:30' },
  { time: '14:00' },
  { time: '14:30' },
  { time: '15:00' },
  { time: '15:30' },
  { time: '16:00' },
  { time: '16:30' },
  { time: '17:00' },
  { time: '17:30' },
  { time: '18:00' },
  { time: '18:30' },
  { time: '19:00' },
  { time: '19:30' },
  { time: '20:00' },
  { time: '20:30' },
  { time: '21:00' },
  { time: '21:30' },
  { time: '22:00' },
  { time: '22:30' },
  { time: '23:00' },
  { time: '23:30' },
];

export default function DroppableArea() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.currentDayTodos.todos);
  const todosStatus = useAppSelector((state) => state.currentDayTodos.loading);
  const todosError = useAppSelector((state) => state.currentDayTodos.error);
  console.log(todos);

  const MOCK_DATA_TO_RENDER_TODOS = ['someTodo'];

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchCurrentDayTodos());
  }, [dispatch]);
  return (
    <div className={styles.itemWrapper} ref={wrapperRef}>
      <div>
        {areaData.map((area) => (
          <div
            key={area.time}
            data-time={area.time}
            className={styles.itemArea}
          >
            <span className={styles.itemAreaTime}>{area.time}</span>
          </div>
        ))}
      </div>
      {MOCK_DATA_TO_RENDER_TODOS.map((todo) => (
        <DraggableItem key={todo} wrapperRef={wrapperRef} />
      ))}
    </div>
  );
}
