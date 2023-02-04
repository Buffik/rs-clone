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
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeUser } from '../../store/authorizationSlice';
import styles from './Authorization.module.scss';

function AuthorizationPage() {
  const [mailer, setMailer] = useState('');
  const [password, setPassword] = useState('');
  const [mailerError, setMailerError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // global state -----------------------------------------
  const dispatch = useAppDispatch();
  // user
  const userState: string = useAppSelector((state) => state.authorization.user);
  const changeUserState = (str: string) => {
    dispatch(changeUser(str));
  };
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

  const authorization = () => {
    const authorizationObj = {
      mail: mailer,
      pass: password,
    };
    console.log(`fetch {${authorizationObj.mail}, ${authorizationObj.pass}} if server return { authorization: true } changeUserState`);
    changeUserState(authorizationObj.mail);
    setMailer('');
    setPassword('');
  };
  return (
    <div className={styles.authorization}>
      <Paper elevation={12}>
        <div className={styles.box}>
          <div>{text[languageState].auth}</div>
          <div>{userState}</div>

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

        </div>
      </Paper>
    </div>
  );
}

export default AuthorizationPage;
