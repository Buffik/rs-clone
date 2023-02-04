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
  const [showPassword, setShowPassword] = React.useState(false);

  // global state for user -----------------------------------------
  const dispatch = useAppDispatch();
  const userState: string = useAppSelector((state) => state.authorization.user);
  const changeUserState = (str: string) => {
    dispatch(changeUser(str));
  };
  // --------------------------------------------------------------

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
          <div>Авторизация</div>
          <div>{userState}</div>

          <TextField
            autoComplete="off"
            sx={{ width: '220px' }}
            error={mailerError}
            id="mail"
            label="почта"
            variant="outlined"
            size="medium"
            value={mailer}
            onChange={(event) => onChangeMailer(event.target.value)}
            helperText={mailerError ? 'Incorrect entry.' : ''}
          />

          <FormControl sx={{ width: '220px' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" error={passwordError}>пароль</InputLabel>
            <OutlinedInput
              value={password}
              autoComplete="off"
              id="password"
              label="пароль"
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
            <FormHelperText id="password" error={passwordError}>{passwordError ? 'Incorrect entry.' : ''}</FormHelperText>
          </FormControl>

          <Button
            variant="contained"
            onClick={authorization}
            disabled={(mailerError || passwordError) || (mailer === '' || password === '')}
          >
            Войти
          </Button>

        </div>
      </Paper>
    </div>
  );
}

export default AuthorizationPage;
