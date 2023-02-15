import React from 'react';
import styles from './modal.module.scss';

interface IModal {
  children: React.ReactNode
  visible: boolean
  setVisible: (bool:boolean) => void
}

function Modal({ children, visible, setVisible }: IModal) {
  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }
  return (
    <div
      role="presentation"
      className={rootClasses.join(' ')}
      onClick={() => setVisible(false)}
      onKeyUp={(e) => {
        if (e.key === 'Escape') {
          setVisible(false);
        }
      }}
    >
      <div
        role="presentation"
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
