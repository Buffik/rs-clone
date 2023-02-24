/* eslint-disable operator-linebreak */
import React, { useRef, useEffect, useState } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import handleItemSize from '../utils/handleItemSize';
import styles from './DraggableItem.module.scss';
import Modal from '../Modals/Modal';
import TodoCreateModal from '../Modals/todoModal/TodoCreateModal';
import {
  ActionTypeAtModalWindow,
  AddTodoRequest,
  FullTodoData,
  TodoTypes,
} from '../../types/types';
import { calculateDataAfterDrag } from '../utils/handleTodosArea';
import { useAppDispatch } from '../../hook';
import { updateTodo } from '../../store/currentDayTodosSlice';

interface IDraggableItem {
  currentTodos: FullTodoData[];
  propsHeight: number;
  propsWidth: number;
  propsTop: number;
  propsLeft: number;
  todoId: string;
  startTime: string;
  endTime: string;
  startDate: string;
  PropsIsDone: boolean;
  todoType: string;
  title: string;
  text: string;
  companyId: string;
  fetchTodos: () => Promise<void>;
}

function DraggableItem({
  currentTodos,
  propsHeight,
  propsWidth,
  propsTop,
  propsLeft,
  todoId,
  startTime,
  endTime,
  startDate,
  PropsIsDone,
  todoType,
  title,
  text,
  companyId,
  fetchTodos,
}: IDraggableItem) {
  const dispatch = useAppDispatch();
  const HALF_HOUR_PER_DAY = 48;
  const HEIGHT_PER_HALF_HOUR = 44;
  const MAX_PARENT_HEIGHT = HALF_HOUR_PER_DAY * HEIGHT_PER_HALF_HOUR;
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [initialHeight] = useState(propsHeight);
  const [initialTop] = useState(propsTop);
  const MAX_ROW_HEIGHT = 44;
  const ref = useRef<HTMLDivElement>(null);
  const refTop = useRef<HTMLDivElement>(null);
  const refCenter = useRef<HTMLDivElement>(null);
  const refBottom = useRef<HTMLDivElement>(null);
  const refButton = useRef<HTMLButtonElement>(null);
  const refModalWindow = useRef<HTMLDivElement>(null);
  const calculatedHeight = useRef<number>(propsHeight);
  const calculatedY = useRef<number>(0);
  const [todoData, setTodoData] = useState<AddTodoRequest>({
    company: companyId || '',
    isDone: PropsIsDone || false,
    data: {
      type: (todoType as TodoTypes) || TodoTypes.Common,
      startTime: '',
      endTime: '',
      title: title || '',
      text: text || '',
    },
  });

  const isClicked = useRef<boolean>(false);
  const isClickedToResize = useRef<boolean>(false);
  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: propsTop,
  });

  // Drag native React

  const handleOnStartDrag = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (
      event.target !== refButton.current &&
      event.target !== refTop.current &&
      event.target !== refBottom.current &&
      event.target !== refModalWindow.current
    ) {
      isClicked.current = true;
    }
    coords.current.startX = event.clientX;
    coords.current.startY = event.clientY;

    if (ref.current) ref.current.style.zIndex = '10';
  };

  const handleOnEndDrag = async () => {
    if (ref.current) {
      isClicked.current = false;
      calculatedY.current = handleItemSize(
        calculatedHeight.current,
        MAX_ROW_HEIGHT,
      );
      const left = handleItemSize(ref.current.offsetLeft, MAX_ROW_HEIGHT);
      const top = handleItemSize(ref.current.offsetTop, MAX_ROW_HEIGHT);
      ref.current.style.top = `${top}px`;
      ref.current.style.left = `calc(${propsLeft}% + 45px)`;
      ref.current.style.bottom = '';
      coords.current.lastX = left;
      coords.current.lastY = top;
      ref.current.style.zIndex = '1';
      if (initialTop !== top) {
        const calculatedData = calculateDataAfterDrag(
          HEIGHT_PER_HALF_HOUR,
          companyId,
          PropsIsDone,
          todoType as TodoTypes,
          calculatedHeight.current,
          top,
          title,
          text,
          startDate,
        );
        await dispatch(updateTodo({ data: calculatedData, id: todoId }));
        await fetchTodos();
      }
    }
  };

  const handleOnMoveDrag = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!isClicked.current) return;
    if (ref.current) {
      const nextY =
        event.clientY - coords.current.startY + coords.current.lastY;

      if (nextY < 0) {
        ref.current.style.top = `${0}px`;
        return;
      }
      if (calculatedHeight.current + nextY > 2112) {
        ref.current.style.top = `${
          MAX_PARENT_HEIGHT - calculatedHeight.current
        }px`;
        handleOnEndDrag();
        return;
      }
      ref.current.style.top = `${nextY}px`;
      ref.current.style.left = `calc(${propsLeft}% + 45px)`;
    }
  };

  // Resize Native React

  // Top Resize

  const handleMouseMoveResizeTop = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (ref.current && isClickedToResize.current) {
      const top = handleItemSize(ref.current.offsetTop, MAX_ROW_HEIGHT);

      if (top <= 0) return;
      const dy = event.clientY - calculatedY.current;
      calculatedHeight.current -= dy;
      calculatedY.current = event.clientY;
      ref.current.style.height = `${calculatedHeight.current}px`;
    }
  };

  const handleMouseUpResizeTop = async () => {
    if (ref.current) {
      isClickedToResize.current = false;
      isClicked.current = false;
      const height = handleItemSize(calculatedHeight.current, MAX_ROW_HEIGHT);
      calculatedHeight.current = height;
      ref.current.style.height = `${height}px`;
      if (initialHeight !== height) {
        const top = handleItemSize(ref.current.offsetTop, MAX_ROW_HEIGHT);
        const calculatedData = calculateDataAfterDrag(
          HEIGHT_PER_HALF_HOUR,
          companyId,
          PropsIsDone,
          todoType as TodoTypes,
          calculatedHeight.current,
          top,
          title,
          text,
          startDate,
        );
        await dispatch(updateTodo({ data: calculatedData, id: todoId }));
        await fetchTodos();
      }
    }
  };

  const handleMouseDownResizeTop = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (ref.current && refTop.current) {
      if (event.target === refTop.current) {
        isClickedToResize.current = true;
        isClicked.current = false;
        calculatedY.current = event.clientY;
        const currentElementStyles = window.getComputedStyle(ref.current);
        ref.current.style.bottom = currentElementStyles.bottom;
        ref.current.style.top = '';
      }
    }
  };

  // Bottom resize

  const handleMouseMoveResizeBottom = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (ref.current && isClickedToResize.current) {
      const top = handleItemSize(ref.current.offsetTop, MAX_ROW_HEIGHT);
      if (top + calculatedHeight.current > MAX_PARENT_HEIGHT) return;
      const dy = event.clientY - calculatedY.current;
      calculatedY.current = event.clientY;
      calculatedHeight.current += dy;
      ref.current.style.height = `${calculatedHeight.current}px`;
    }
  };

  const handleMouseDownResizeBottom = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (ref.current && refBottom.current) {
      if (event.target === refBottom.current) {
        isClicked.current = false;
        isClickedToResize.current = true;
        calculatedY.current = event.clientY;
        const currentElementStyles = window.getComputedStyle(ref.current);
        ref.current.style.top = currentElementStyles.top;
        ref.current.style.bottom = '';
      }
    }
  };

  const todoDuration = `${startTime}-${endTime}`;

  useEffect(() => {
    const resizableElement = ref.current as HTMLDivElement;
    resizableElement.style.top = `${propsTop}px`;
    resizableElement.style.left = `calc(${propsLeft}% + 45px)`;
  }, [currentTodos]);

  return (
    <>
      {showCorrectModal && (
        <div ref={refModalWindow}>
          <Modal visible={showCorrectModal} setVisible={setShowCorrectModal}>
            <TodoCreateModal
              todoData={todoData}
              setTodoData={setTodoData}
              actionType={ActionTypeAtModalWindow.Update}
              propsStartTime={startTime}
              propsEndTime={endTime}
              propsStartDate={startDate}
              setShowModal={setShowCorrectModal}
              todoId={todoId}
              todoCompany={companyId}
              todoType={todoType as TodoTypes}
              todoTitle={title}
              todoText={text}
              fetchTodos={fetchTodos}
              todoIsDone={PropsIsDone}
            />
          </Modal>
        </div>
      )}
      <div
        role="presentation"
        onMouseDown={(event) => handleOnStartDrag(event)}
        onMouseMove={(event) => handleOnMoveDrag(event)}
        onMouseUp={() => handleOnEndDrag()}
        onMouseLeave={() => {
          if (isClicked.current) handleOnEndDrag();
        }}
        className={styles.itemResizable}
        ref={ref}
        style={{ width: `${propsWidth}%`, height: `${propsHeight}px` }}
      >
        <div
          className={styles.itemResizerTop}
          ref={refTop}
          role="presentation"
          onMouseDown={(event) => handleMouseDownResizeTop(event)}
          onMouseMove={(event) => handleMouseMoveResizeTop(event)}
          onMouseUp={() => handleMouseUpResizeTop()}
          onMouseLeave={() => {
            if (isClickedToResize.current) handleMouseUpResizeTop();
          }}
        />
        <div className={styles.itemDraggable} ref={refCenter}>
          <div className={styles.itemData}>
            <div className={styles.itemDataFirstLine}>
              <button
                ref={refButton}
                type="button"
                onClick={() => setShowCorrectModal(true)}
              >
                <ModeIcon className={styles.itemDataIcon} />
              </button>
              <span className={styles.itemDataDuration}>{todoDuration}</span>
            </div>
            <span className={styles.itemDataTitle}>{title}</span>
            <div className={styles.itemDataText}>{text}</div>
          </div>
        </div>
        <div
          className={styles.itemResizerBottom}
          ref={refBottom}
          role="presentation"
          onMouseDown={(event) => handleMouseDownResizeBottom(event)}
          onMouseMove={(event) => handleMouseMoveResizeBottom(event)}
          onMouseUp={() => handleMouseUpResizeTop()}
          onMouseLeave={() => {
            if (isClickedToResize.current) handleMouseUpResizeTop();
          }}
        />
      </div>
    </>
  );
}

export default DraggableItem;
