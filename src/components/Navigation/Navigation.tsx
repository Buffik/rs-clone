import React from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ContactsIcon from '@mui/icons-material/Contacts';
import TaskIcon from '@mui/icons-material/Task';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import styles from './Navigation.module.scss';

function Navigation() {
  return (
    <Paper elevation={12} sx={{ height: '100%' }}>
      <nav className={styles.nav}>
        <div className={styles.logo}>CRM-Sales</div>
        <div className={styles.userPanel}>
          <AccountCircleIcon fontSize="large" />
          <div className={styles.nameMail}>
            <div className={styles.name}>Имя Фамилия</div>
            <div className={styles.mail}>mail@mail.com</div>
          </div>
        </div>

        <span className={styles.linksWrapper}>
          <Link className={styles.link} to="/">
            Authorization
          </Link>
          <Link className={styles.link} to="/calendar">
            <CalendarMonthIcon fontSize="medium" />
            Calendar
          </Link>
          <Link className={styles.link} to="/clients">
            <BusinessCenterIcon fontSize="medium" />
            Clients
          </Link>
          <Link className={styles.link} to="/tasks">
            <TaskIcon fontSize="medium" />
            Tasks
          </Link>
          <Link className={styles.link} to="/">
            <ContactsIcon fontSize="medium" />
            Contacts
          </Link>
          <Link className={styles.link} to="/">
            <PriceCheckIcon fontSize="medium" />
            Sales
          </Link>
          <Link className={styles.link} to="/">
            <SettingsApplicationsIcon fontSize="medium" />
            Settings
          </Link>
        </span>
      </nav>
    </Paper>
  );
}

export default Navigation;
