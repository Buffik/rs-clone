/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, RefObject } from 'react';
import handleItemSize from '../utils/handleItemSize';
import handleTodoTimeDuration from '../utils/handleTodoTimeDuration';
import styles from './DraggableItem.module.scss';

interface IDraggableItem {
  wrapperRef: RefObject<HTMLDivElement>;
  propsHeight: number;
  propsWidth: number;
  propsTop: number;
  propsLeft: number;
  startTime: number;
  endTime: number;
  isDone: boolean;
  todoType: string;
  title: string;
  text: string;
  companyName: string;
  companyId: string;
}

function DraggableItem({
  wrapperRef,
  propsHeight,
  propsWidth,
  propsTop,
  propsLeft,
  startTime,
  endTime,
  isDone,
  todoType,
  title,
  text,
  companyName,
  companyId,
}: IDraggableItem) {
  const MAX_ROW_HEIGHT = 44;
  const ref = useRef<HTMLDivElement>(null);
  const refTop = useRef<HTMLDivElement>(null);
  const refCenter = useRef<HTMLDivElement>(null);
  const refBottom = useRef<HTMLDivElement>(null);

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

  const todoDuration = handleTodoTimeDuration(startTime, endTime);

  useEffect(() => {
    const resizableElement = ref.current as HTMLDivElement;
    const topItem = refTop.current as HTMLDivElement;
    const centerItem = refCenter.current as HTMLDivElement;
    const bottomItem = refBottom.current as HTMLDivElement;

    resizableElement.style.top = `${propsTop}px`;
    resizableElement.style.left = `calc(${propsLeft}% + 45px)`; // принимать инфу из пропсов о начальном положении таска

    const parentArea = wrapperRef.current as HTMLDivElement;
    let height = propsHeight;
    let y = 0;

    // DragItem

    const onMouseDown = (e: MouseEvent) => {
      console.log(e.target);

      if (e.target !== topItem && e.target !== bottomItem) {
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
    <div
      className={styles.itemResizable}
      ref={ref}
      style={{ width: `${propsWidth}%`, height: `${propsHeight}px` }}
    >
      <div className={styles.itemResizerTop} ref={refTop} />
      <div className={styles.itemDraggable} ref={refCenter}>
        <div className={styles.itemData}>
          <span className={styles.itemDataDuration}>{todoDuration}</span>
          <span className={styles.itemDataTitle}>{title}</span>
          <div className={styles.itemDataText}>{text}</div>
        </div>
      </div>
      <div className={styles.itemResizerBottom} ref={refBottom} />
    </div>
  );
}

export default DraggableItem;
