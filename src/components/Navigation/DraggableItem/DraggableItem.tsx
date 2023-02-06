import React, { useRef, useEffect } from 'react';
import styles from './DraggableItem.module.scss';

function DraggableItem() {
  const ref = useRef<HTMLDivElement>(null);
  const refTop = useRef<HTMLDivElement>(null);
  const refBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizableElement = ref.current as HTMLDivElement;
    const elementStyles = window.getComputedStyle(resizableElement);
    let height = parseInt(elementStyles.height, 10);
    let y = 0;

    resizableElement.style.top = '50px';
    resizableElement.style.left = '50px';

    // Top resize

    const onMouseMoveResizeTop = (event: { clientY: number }) => {
      const dy = event.clientY - y;
      y = event.clientY;
      height -= dy;
      resizableElement.style.height = `${height}px`;
    };
    const onMouseUpResizeTop = () => {
      if (height < 100) height = 100;
      document.removeEventListener('mousemove', onMouseMoveResizeTop);
    };
    const onMouseDownResizeTop = (event: { clientY: number }) => {
      y = event.clientY;
      const currentElementStyles = window.getComputedStyle(resizableElement);
      resizableElement.style.bottom = currentElementStyles.bottom;
      resizableElement.style.top = '';
      document.addEventListener('mousemove', onMouseMoveResizeTop);
      document.addEventListener('mouseup', onMouseUpResizeTop);
    };

    // Bottom resize

    const onMouseMoveResizeBottom = (event: { clientY: number }) => {
      const dy = event.clientY - y;
      y = event.clientY;
      height += dy;
      resizableElement.style.height = `${height}px`;
    };
    const onMouseUpResizeBottom = () => {
      if (height < 100) height = 45;
      document.removeEventListener('mousemove', onMouseMoveResizeBottom);
    };
    const onMouseDownResizeBottom = (event: { clientY: number }) => {
      y = event.clientY;
      const currentElementStyles = window.getComputedStyle(resizableElement);
      resizableElement.style.top = currentElementStyles.top;
      resizableElement.style.bottom = '';
      document.addEventListener('mousemove', onMouseMoveResizeBottom);
      document.addEventListener('mouseup', onMouseUpResizeBottom);
    };

    const resizerTop = refTop.current as HTMLDivElement;
    resizerTop.addEventListener('mousedown', onMouseDownResizeTop);

    const resizerBottom = refBottom.current as HTMLDivElement;
    resizerBottom.addEventListener('mousedown', onMouseDownResizeBottom);

    return () => {
      resizerTop.removeEventListener('mousedown', onMouseDownResizeTop);
      resizerBottom.removeEventListener('mousedown', onMouseDownResizeBottom);
    };
  }, []);
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemResizable} ref={ref}>
        <div className={styles.itemResizerTop} ref={refTop} />
        <div className={styles.itemResizerBottom} ref={refBottom} />
      </div>
    </div>
  );
}

export default DraggableItem;
