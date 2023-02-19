import React from 'react';
import styles from './LoadingSpinner.module.scss';

function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <section className={styles.box}>
        <div className={styles.spinner} />
      </section>
    </div>
  );
}

export default LoadingSpinner;
