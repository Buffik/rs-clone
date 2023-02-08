import React, { useRef } from 'react';
import DraggableItem from '../DraggableItem';
import styles from './DroppableArea.module.scss';

interface IAreaData {
  [key: string]: string;
}

export default function DroppableArea() {
  const MOCK_DATA_TO_RENDER_TODOS = ['someTodo'];
  const areaData: IAreaData = {
    22: '00:00',
    66: '00:30',
    110: '01:00',
    154: '01:30',
    198: '02:00',
    242: '02:30',
    286: '03:00',
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  const areaDataKeys = Object.keys(areaData);
  return (
    <div className={styles.itemWrapper} ref={wrapperRef}>
      <div>
        {areaDataKeys.map((itemKey) => (
          <div
            key={itemKey}
            data-position={itemKey}
            data-time={areaData[itemKey]}
            style={{
              width: '100%',
              height: '44px',
              backgroundColor: 'grey',
              border: 'solid 2px teal',
              boxSizing: 'border-box',
            }}
          />
        ))}
      </div>
      {MOCK_DATA_TO_RENDER_TODOS.map((todo) => (
        <DraggableItem key={todo} wrapperRef={wrapperRef} />
      ))}
    </div>
  );
}
