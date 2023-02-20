/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, RefObject, useState } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import handleItemSize from '../utils/handleItemSize';
import styles from './DraggableItem.module.scss';
import Modal from '../Modals/Modal';
import TodoCreateModal from '../Modals/todoModal/TodoCreateModal';
import {
  ActionTypeAtModalWindow,
  AddTodoRequest,
  TodoTypes,
} from '../../types/types';
import { handleDragging } from '../utils/handleTodosArea';

interface IDraggableItem {
  wrapperRef: RefObject<HTMLDivElement>;
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
  wrapperRef,
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
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const MAX_ROW_HEIGHT = 44;
  const ref = useRef<HTMLDivElement>(null);
  const refTop = useRef<HTMLDivElement>(null);
  const refCenter = useRef<HTMLDivElement>(null);
  const refBottom = useRef<HTMLDivElement>(null);
  const refButton = useRef<HTMLButtonElement>(null);
  const refModalWindow = useRef<HTMLDivElement>(null);
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

  const todoDuration = `${startTime}-${endTime}`;

  useEffect(() => {
    const resizableElement = ref.current as HTMLDivElement;
    const topItem = refTop.current as HTMLDivElement;
    const centerItem = refCenter.current as HTMLDivElement;
    const bottomItem = refBottom.current as HTMLDivElement;
    const button = refButton.current as HTMLButtonElement;
    const modalWindow = refModalWindow.current as HTMLDivElement;

    resizableElement.style.top = `${propsTop}px`;
    resizableElement.style.left = `calc(${propsLeft}% + 45px)`; // принимать инфу из пропсов о начальном положении таска

    const parentArea = wrapperRef.current as HTMLDivElement;
    let height = propsHeight;
    let y = 0;

    // DragItem

    const onMouseDown = (e: MouseEvent) => {
      if (
        e.target !== button &&
        e.target !== topItem &&
        e.target !== bottomItem &&
        e.target !== modalWindow
      ) {
        isClicked.current = true;
      }
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
      resizableElement.style.zIndex = '10';
    };

    const onMouseUp = (e: MouseEvent) => {
      y = handleItemSize(height, MAX_ROW_HEIGHT);
      const left = handleItemSize(resizableElement.offsetLeft, MAX_ROW_HEIGHT);
      const top = handleItemSize(resizableElement.offsetTop, MAX_ROW_HEIGHT);
      isClicked.current = false;
      resizableElement.style.top = `${top}px`;
      resizableElement.style.left = `calc(${propsLeft}% + 45px)`;
      resizableElement.style.bottom = '';
      coords.current.lastX = left;
      coords.current.lastY = top;
      resizableElement.style.zIndex = '1';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      if (e.target !== topItem && e.target !== bottomItem) {
        const nextY = e.clientY - coords.current.startY + coords.current.lastY;
        if (height + nextY > 2090) {
          resizableElement.style.top = `${2112 - height}px`;
          return;
        }
        resizableElement.style.top = `${nextY}px`;
        resizableElement.style.left = `calc(${propsLeft}% + 45px)`;
      }
    };

    resizableElement.addEventListener('mousedown', onMouseDown);
    resizableElement.addEventListener('mouseup', onMouseUp);
    parentArea.addEventListener('mousemove', onMouseMove);
    parentArea.addEventListener('mouseleave', onMouseUp);

    // Top resize

    const onMouseMoveResizeTop = (event: MouseEvent) => {
      const dy = event.clientY - y;
      height -= dy;
      y = event.clientY;
      resizableElement.style.height = `${height}px`;
    };
    const onMouseUpResizeTop = () => {
      isClicked.current = false;
      height = handleItemSize(height, MAX_ROW_HEIGHT);
      resizableElement.style.height = `${height}px`;
      document.removeEventListener('mousemove', onMouseMoveResizeTop);
    };
    const onMouseDownResizeTop = (event: MouseEvent) => {
      if (event.target === topItem) {
        isClicked.current = false;
        y = event.clientY;
        const currentElementStyles = window.getComputedStyle(resizableElement);
        resizableElement.style.bottom = currentElementStyles.bottom;
        resizableElement.style.top = '';
        document.addEventListener('mousemove', onMouseMoveResizeTop);
        document.addEventListener('mouseup', onMouseUpResizeTop);
      }
    };

    // Bottom resize

    const onMouseMoveResizeBottom = (event: MouseEvent) => {
      const dy = event.clientY - y;
      y = event.clientY;
      height += dy;
      resizableElement.style.height = `${height}px`;
    };
    const onMouseUpResizeBottom = () => {
      isClicked.current = false;
      resizableElement.style.height = `${handleItemSize(
        height,
        MAX_ROW_HEIGHT,
      )}px`;
      document.removeEventListener('mousemove', onMouseMoveResizeBottom);
    };
    const onMouseDownResizeBottom = (event: MouseEvent) => {
      event.stopImmediatePropagation();
      isClicked.current = false;
      y = event.clientY;
      const currentElementStyles = window.getComputedStyle(resizableElement);
      resizableElement.style.top = currentElementStyles.top;
      resizableElement.style.bottom = '';
      document.addEventListener('mousemove', onMouseMoveResizeBottom);
      document.addEventListener('mouseup', onMouseUpResizeBottom);
    };

    topItem.addEventListener('mousedown', onMouseDownResizeTop);

    bottomItem.addEventListener('mousedown', onMouseDownResizeBottom);

    // eslint-disable-next-line consistent-return
    return () => {
      topItem.removeEventListener('mousedown', onMouseDownResizeTop);
      bottomItem.removeEventListener('mousedown', onMouseDownResizeBottom);
      resizableElement.removeEventListener('mousedown', onMouseDown);
      resizableElement.removeEventListener('mouseup', onMouseUp);
      parentArea.removeEventListener('mousemove', onMouseMove);
      parentArea.removeEventListener('mouseleave', onMouseUp);
    };
  }, []);

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
        className={styles.itemResizable}
        ref={ref}
        style={{ width: `${propsWidth}%`, height: `${propsHeight}px` }}
      >
        <div className={styles.itemResizerTop} ref={refTop} />
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
        <div className={styles.itemResizerBottom} ref={refBottom} />
      </div>
    </>
  );
}

export default DraggableItem;
