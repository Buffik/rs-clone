import React from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

function Navigation() {
  return (
    <Paper elevation={12} sx={{ height: '100%' }}>
      <nav className={styles.nav}>
        <div className={styles.logo}>RS-Clone</div>
        <div className={styles.userPanel}>
          <div className={styles.avatar} />
          <div className={styles.nameMail}>
            <div className={styles.name}>Имя Фамилия</div>
            <div className={styles.mail}>mail@mail.com</div>
          </div>
        </div>

        <span className={styles.linksWrapper}>
          <Link className={styles.link} to="/">
            <div className={styles.linkIcon} />
            Home
          </Link>
          <Link className={styles.link} to="/clients">
            <div className={styles.linkIcon} />
            Clients
          </Link>
          <Link className={styles.link} to="/authorization">
            <div className={styles.linkIcon} />
            Authorization
          </Link>
        </span>
      </nav>
    </Paper>
  );
}

export default Navigation;
