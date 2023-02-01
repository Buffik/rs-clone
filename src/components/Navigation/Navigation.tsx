import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

function Navigation() {
  return (
    <nav className={styles.nav}>
      <h3>RS-Clone</h3>

      <span className={styles.linksWrapper}>
        <Link className={styles.nav} to="/">
          Home
        </Link>
        <Link className={styles.nav} to="/clients">
          Clients
        </Link>
        <Link className={styles.nav} to="/authorization">
          Authorization
        </Link>
      </span>
    </nav>
  );
}

export default Navigation;
