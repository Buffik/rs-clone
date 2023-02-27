/* eslint-disable operator-linebreak */
import React from 'react';
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  // Button,
  Stack,
} from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ContactsIcon from '@mui/icons-material/Contacts';
import LogoutIcon from '@mui/icons-material/Logout';
import { PeopleAlt } from '@mui/icons-material';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector, useAppDispatch } from '../../hook';
import { logOut } from '../../store/authorizationSlice';
import styles from './Navigation.module.scss';
import { ProfileData, UserRoles } from '../../types/types';
import {
  clearData,
} from '../../store/dataSlice';
import LanguageSlider from '../LanguageSlider/LanguageSlider';

function Navigation() {
  // global state -----------------------------------------
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authorization);
  // language
  const languageState: string = useAppSelector((state) => state.data.language);
  // --------------------------------------------------------------
  interface TextKey {
    calendar: string;
    clients: string;
    logout: string;
    tasks: string;
    contacts: string;
    sales: string;
    settings: string;
    users: string;
    admin: string;
    manager: string;
    salesman: string;
  }
  interface Text {
    [key: string]: TextKey;
  }
  const text: Text = {
    ru: {
      calendar: 'Календарь',
      clients: 'Клиенты',
      logout: 'Выйти',
      tasks: 'Задачи',
      contacts: 'Контакты',
      sales: 'Продажи',
      settings: 'Настройки',
      users: 'Сотрудники',
      admin: 'админ',
      manager: 'менеджер',
      salesman: 'продавец',
    },
    en: {
      calendar: 'Calendar',
      clients: 'Clients',
      logout: 'Log Out',
      tasks: 'Tasks',
      contacts: 'Contacts',
      sales: 'Sales',
      settings: 'Settings',
      users: 'Employees',
      admin: 'admin',
      manager: 'manager',
      salesman: 'salesman',
    },
  };
  const navigate = useNavigate();
  const changePage = (path: string) => {
    navigate(path);
  };
  const user: ProfileData = useAppSelector((state) => state.data.profile);
  const userLogout = async () => {
    try {
      await dispatch(logOut());
    } catch (err) {
      console.log(err);
    }
    console.log(`isAuth: ${isAuth}`);
    dispatch(clearData());
    console.log(`isAuth: ${isAuth}`);
    changePage('/');
  };
  // ------------------------------------------------------------------
  return (
    <Paper elevation={5} sx={{ height: '100%' }}>
      <nav className={styles.nav}>
        <div className={styles.userContainer}>
          <div className={styles.logo}>CRM-Sales</div>
          <IconButton onClick={userLogout} title={text[languageState].logout}>
            <LogoutIcon />
          </IconButton>
        </div>
        {isAuth && user.data && (
          <Link className={styles.userPanel} to="/">
            <AccountCircleIcon fontSize="large" />
            <div className={styles.nameMail}>
              <div className={styles.name}>
                {isAuth && `${user?.data?.surname} ${user?.data?.firstName.slice(0, 1)} `}
              </div>
              <div className={styles.mail}>{isAuth && text[languageState][user?.role]}</div>
            </div>
          </Link>
        )}

        <span className={styles.linksWrapper}>
          <NavLink className={({ isActive }) => (isActive ? styles.linkActive : styles.link)} to="/calendar">
            <CalendarMonthIcon fontSize="medium" />
            {text[languageState].calendar}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.linkActive : styles.link)} to="/tasks">
            <TaskIcon fontSize="medium" />
            {text[languageState].tasks}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.linkActive : styles.link)} to="/clients">
            <BusinessCenterIcon fontSize="medium" />
            {text[languageState].clients}
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles.linkActive : styles.link)} to="/contacts">
            <ContactsIcon fontSize="medium" />
            {text[languageState].contacts}
          </NavLink>
          {(user?.role === UserRoles.Admin ||
            user?.role === UserRoles.Manager) && (
            <NavLink className={({ isActive }) => (isActive ? styles.linkActive : styles.link)} to="/users">
              <PeopleAlt fontSize="medium" />
              {text[languageState].users}
            </NavLink>
          )}
          <Accordion className={styles.accordion}>
            <AccordionSummary
              className={styles.accordionSummary}
              expandIcon={<ExpandMoreIcon />}
            >
              <div className={styles.link}>
                <SettingsIcon fontSize="medium" />
                {text[languageState].settings}
              </div>
            </AccordionSummary>
            <AccordionDetails className={styles.details}>
              <Stack
                className={styles.stack}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <LanguageSlider />
              </Stack>
            </AccordionDetails>
          </Accordion>
        </span>
      </nav>
    </Paper>
  );
}

export default Navigation;
