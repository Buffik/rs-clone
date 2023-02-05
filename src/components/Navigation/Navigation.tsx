import React from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Navigation.module.scss';

function Navigation() {
  return (
    <Paper elevation={12} sx={{ height: '100%' }}>
      <nav className={styles.nav}>
        <div className={styles.logo}>RS-Clone</div>
        <div className={styles.userPanel}>
          {/* <div className={styles.avatar}> */}
          <AccountCircleIcon />
          {/* </div> */}
          <div className={styles.nameMail}>
            <div className={styles.name}>Имя Фамилия</div>
            <div className={styles.mail}>mail@mail.com</div>
          </div>
        </div>

        <span className={styles.linksWrapper}>
          <Link className={styles.link} to="/">
            <div className={styles.linkIcon} />
            Authorization
          </Link>
          <Link className={styles.link} to="/calendar">
            <div className={styles.linkIcon} />
            Calendar
          </Link>
          <Link className={styles.link} to="/clients">
            <div className={styles.linkIcon} />
            Clients
          </Link>
          <Link className={styles.link} to="/tasks">
            <div className={styles.linkIcon} />
            Tasks
          </Link>
          <Link className={styles.link} to="/">
            <div className={styles.linkIcon} />
            Contacts
          </Link>
          <Link className={styles.link} to="/">
            <div className={styles.linkIcon} />
            Sales
          </Link>
        </span>
      </nav>
    </Paper>
  );
}

export default Navigation;
