import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.scss';

function PageNotFound() {
  return (
    <main className={styles.main}>
      <section className={styles.message}>
        <h1 className={styles.title}>Error 404: Page Not Found!</h1>
        <p className={styles.text}>This page does not seem to exist.</p>
        <Link className={styles.link} to="/">
          Back to main
        </Link>
      </section>
    </main>
  );
}

export default PageNotFound;
