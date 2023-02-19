import React from 'react';
import {
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  Stack,
  Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ContactsIcon from '@mui/icons-material/Contacts';
import { PeopleAlt } from '@mui/icons-material';
import TaskIcon from '@mui/icons-material/Task';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector, useAppDispatch } from '../../hook';
import { changeLanguage } from '../../store/languageSlice';
import { logOut } from '../../store/authorizationSlice';
import styles from './Navigation.module.scss';
import { ProfileData, UserRoles } from '../../types/types';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

function Navigation() {
  // global state -----------------------------------------
  const dispatch = useAppDispatch();
  // language
  const languageState: string = useAppSelector((state) => state.language.language);
  const changeLanguageState = (str: string) => {
    dispatch(changeLanguage(str));
  };
  // --------------------------------------------------------------
  interface TextKey {
    calendar: string,
    clients: string,
    logout: string,
    tasks: string,
    contacts: string,
    sales: string,
    settings: string,
    users: string,
  }
  interface Text {
    [key: string]: TextKey
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
    },
  };
  const { isAuth } = useAppSelector((state) => state.authorization);
  const user: ProfileData = useAppSelector((state) => state.data.profile);
  const userLogout = async () => {
    dispatch(logOut());
  };
  // ------------------------------------------------------------------
  return (
    <Paper elevation={5} sx={{ height: '100%' }}>
      <nav className={styles.nav}>
        <div className={styles.logo}>CRM-Sales</div>
        {
          isAuth && user.role
          && (
          <Link className={styles.userPanel} to="/">
            <AccountCircleIcon fontSize="large" />
            <div className={styles.nameMail}>
              <div className={styles.name}>{isAuth && `${user?.data?.firstName} ${user?.data?.surname}`}</div>
              <div className={styles.mail}>{isAuth && user?.data?.mail}</div>
            </div>
          </Link>
          )
        }

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
          <Link className={styles.link} to="/contacts">
            <ContactsIcon fontSize="medium" />
            {text[languageState].contacts}
          </Link>
          <Link className={styles.link} to="/">
            <PriceCheckIcon fontSize="medium" />
            {text[languageState].sales}
          </Link>
          {(user?.role === UserRoles.Admin || user?.role === UserRoles.Manager)
            && (
              <Link className={styles.link} to="/users">
                <PeopleAlt fontSize="medium" />
                {text[languageState].users}
              </Link>
            )}
          <Accordion className={styles.accordion}>
            <AccordionSummary className={styles.accordionSummary} expandIcon={<ExpandMoreIcon />}>
              <div className={styles.link}>
                <SettingsApplicationsIcon fontSize="medium" />
                {text[languageState].settings}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Stack className={styles.stack} direction="row" spacing={1} alignItems="center">
                <Typography>en</Typography>
                <AntSwitch
                  checked={languageState === 'ru'}
                  onChange={() => {
                    if (languageState === 'en') changeLanguageState('ru');
                    else changeLanguageState('en');
                  }}
                  inputProps={{ 'aria-label': 'ant design' }}
                />
                <Typography>ru</Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
          {isAuth && (
            <Button
              variant="contained"
              onClick={userLogout}
            >
              {text[languageState].logout}
            </Button>
          )}
        </span>
      </nav>
    </Paper>
  );
}

export default Navigation;
