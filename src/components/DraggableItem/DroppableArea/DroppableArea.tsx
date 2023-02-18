/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { fetchCurrentDayTodos } from '../../../store/currentDayTodosSlice';
import {
  ActionTypeAtModalWindow,
  FullTodoData,
  Todo,
  TodosPlacement,
} from '../../../types/types';
import Modal from '../../Modals/Modal';
import TodoCreateModal from '../../Modals/todoModal/TodoCreateModal';
import LoadingSpinner from '../../UI/Spinner/LoadingSpinner';
import {
  calculateItemHeight,
  calculateItemWidth,
  calculateTop,
  calculateLeft,
  calculateTopByTime,
} from '../../utils/handleTodosArea';
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
  const HEIGHT_PER_HALF_HOUR = 44;
  const MAX_TODO_WIDTH = 80;
  const MIN_TIME_TODO_LENGTH = 30;
  const dispatch = useAppDispatch();
  const [render, setRender] = useState<TodosPlacement[][]>([]);
  const todosPlacement = useAppSelector(
    (state) => state.currentDayTodos.todos.todosPlacement,
  );
  const todos = useAppSelector((state) => state.currentDayTodos.todos);
  const todosStatus = useAppSelector((state) => state.currentDayTodos.loading);
  const todosError = useAppSelector((state) => state.currentDayTodos.error);
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState('00:00');
  const [startDate, setStartDate] = useState(''); // принимать из пропсов
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchCurrentDayTodos('2023-02-18'));
  }, [dispatch]);

  useEffect(() => {
    if (todosPlacement) setRender(todosPlacement);
  }, [todosPlacement]);

  if (todosStatus) {
    return <LoadingSpinner />;
  }

  if (todosError) {
    return <h1>{todosError}</h1>;
  }

  return (
    <div className={styles.itemWrapper} ref={wrapperRef}>
      {areaData.map((area) => (
        <div
          role="presentation"
          onClick={() => {
            setShowModal(true);
            setStartTime(area.time);
          }}
          key={area.time}
          data-time={area.time}
          className={styles.itemArea}
        >
          <span className={styles.itemAreaTime}>{area.time}</span>
        </div>
      ))}
      {render
        .map((array) =>
          array.map((todo, index) => {
            const data = todos.todos.find(
              (item) => item._id === todo._id,
            ) as FullTodoData;
            const height = calculateItemHeight(
              todo.start,
              todo.end,
              HEIGHT_PER_HALF_HOUR,
            );
            const width = calculateItemWidth(array.length, MAX_TODO_WIDTH);
            const top = calculateTopByTime(
              data.data.startTime,
              MIN_TIME_TODO_LENGTH,
              HEIGHT_PER_HALF_HOUR,
            );
            const left = calculateLeft(width, index);
            return (
              <DraggableItem
                key={todo._id}
                wrapperRef={wrapperRef}
                propsHeight={height}
                propsWidth={width}
                propsTop={top}
                propsLeft={left}
                todoId={todo._id}
                startTime={data.data.startTime.split('T')[1]}
                endTime={data.data.endTime.split('T')[1]}
                startDate={data.data.endTime.split('T')[0]}
                PropsIsDone={data.isDone}
                todoType={data.data.type}
                title={data.data.title}
                text={data.data.text ? data.data.text : ''}
                companyName={data.company.data.companyName}
                companyId={data.company._id}
              />
            );
          }),
        )
        .flat()}
      {showModal && (
        <Modal visible={showModal} setVisible={setShowModal}>
          <TodoCreateModal
            actionType={ActionTypeAtModalWindow.Create}
            propsStartTime={startTime}
            propsStartDate={startDate}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
}
