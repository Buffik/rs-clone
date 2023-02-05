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
import { useAppSelector } from '../../hook';
import styles from './Navigation.module.scss';

function Navigation() {
  // global state -----------------------------------------
  // language
  const languageState: string = useAppSelector((state) => state.language.language);
  // --------------------------------------------------------------
  interface TextKey {
    calendar: string,
    clients: string,
    tasks: string,
    contacts: string,
    sales: string,
    settings: string,
  }
  interface Text {
    [key: string]: TextKey
  }
  const text: Text = {
    ru: {
      calendar: 'Календарь',
      clients: 'Клиенты',
      tasks: 'Задачи',
      contacts: 'Контакты',
      sales: 'Продажи',
      settings: 'Настройки',
    },
    en: {
      calendar: 'Calendar',
      clients: 'Clients',
      tasks: 'Tasks',
      contacts: 'Contacts',
      sales: 'Sales',
      settings: 'Settings',
    },
  };
  // ------------------------------------------------------------------
  return (
    <Paper elevation={12} sx={{ height: '100%' }}>
      <nav className={styles.nav}>
        <div className={styles.logo}>CRM-Sales</div>
        <Link className={styles.userPanel} to="/">
          <AccountCircleIcon fontSize="large" />
          <div className={styles.nameMail}>
            <div className={styles.name}>Name LastName</div>
            <div className={styles.mail}>mail@mail.com</div>
          </div>
        </Link>

        <span className={styles.linksWrapper}>
          <Link className={styles.link} to="/calendar">
            <CalendarMonthIcon fontSize="medium" />
            {text[languageState].calendar}
          </Link>
          <Link className={styles.link} to="/clients">
            <BusinessCenterIcon fontSize="medium" />
            {text[languageState].clients}
          </Link>
          <Link className={styles.link} to="/tasks">
            <TaskIcon fontSize="medium" />
            {text[languageState].tasks}
          </Link>
          <Link className={styles.link} to="/">
            <ContactsIcon fontSize="medium" />
            {text[languageState].contacts}
          </Link>
          <Link className={styles.link} to="/">
            <PriceCheckIcon fontSize="medium" />
            {text[languageState].sales}
          </Link>
          <Link className={styles.link} to="/">
            <SettingsApplicationsIcon fontSize="medium" />
            {text[languageState].settings}
          </Link>
        </span>
      </nav>
    </Paper>
  );
}

export default Navigation;
