import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hook';
import { logIn } from '../../store/authorizationSlice';
import styles from './Authorization.module.scss';
import { RootState } from '../../store/store';
import TasksPage from '../TasksPage/TasksPage';

function AuthorizationPage() {
  const [mailer, setMailer] = useState('');
  const [password, setPassword] = useState('');
  const [mailerError, setMailerError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // global state -----------------------------------------
  const dispatch = useAppDispatch();
  // user

  // language
  const languageState: string = useAppSelector((state) => state.language.language);
  // --------------------------------------------------------------
  interface TextKey {
    auth: string,
    mail: string,
    pass: string,
    enter: string,
    incorrect: string
  }
  interface Text {
    [key: string]: TextKey
  }
  const text: Text = {
    ru: {
      auth: 'Авторизация',
      mail: 'почта',
      pass: 'пароль',
      enter: 'Войти',
      incorrect: 'Некорректный ввод',
    },
    en: {
      auth: 'Authorization',
      mail: 'mail',
      pass: 'password',
      enter: 'Log In',
      incorrect: 'Incorrect entry',
    },
  };
  // ------------------------------------------------------------------

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onChangeMailer = (value: string) => {
    setMailer(value);
    setMailerError((!value.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/)) && value !== '');
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
    setPasswordError(!value.match(/[0-9a-zA-Z!@#$%^&*]{5,}/) && value !== '');
  };

  const authorization = async () => {
    const authorizationObj = {
      mail: mailer,
      password,
    };
    dispatch(logIn(authorizationObj));
    setMailer('');
    setPassword('');
  };

  const { isAuth, error, isLoading } = useSelector((state: RootState) => state.authorization);

  if (isAuth) {
    return <TasksPage />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.authorization}>
      {!isLoading
      && (
      <Paper elevation={12}>
        <div className={styles.box}>
          <div>{text[languageState].auth}</div>
          {/* <div>{isAuth && userState.data.mail}</div> */}

          <TextField
            autoComplete="off"
            sx={{ width: '220px' }}
            error={mailerError}
            id="mail"
            label={text[languageState].mail}
            variant="outlined"
            size="medium"
            value={mailer}
            onChange={(event) => onChangeMailer(event.target.value)}
            helperText={mailerError ? text[languageState].incorrect : ' '}
          />

          <FormControl sx={{ width: '220px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" error={passwordError}>{text[languageState].pass}</InputLabel>
            <OutlinedInput
              value={password}
              autoComplete="off"
              id="password"
              label={text[languageState].pass}
              type={showPassword ? 'text' : 'password'}
              error={passwordError}
              onChange={(event) => onChangePassword(event.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
            />
            <FormHelperText id="password" error={passwordError}>{passwordError ? text[languageState].incorrect : ' '}</FormHelperText>
          </FormControl>

          <Button
            variant="contained"
            onClick={authorization}
            disabled={(mailerError || passwordError) || (mailer === '' || password === '')}
          >
            {text[languageState].enter}
          </Button>
          { error && <p>A error occurred: {error}. Please try again.</p> }

        </div>
      </Paper>
      )}
    </div>
  );
}

export default AuthorizationPage;
