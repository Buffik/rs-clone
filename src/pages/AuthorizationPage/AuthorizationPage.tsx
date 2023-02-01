import React, { useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import styles from './Authorization.module.scss';

function AuthorizationPage() {
  const [mailer, setMailer] = useState('');
  const [password, setPassword] = useState('');
  const [mailerError, setMailerError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onChangeMailer = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMailer(event.target.value);
    const validMailer = !!mailer.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}\b/);
    if (validMailer) setMailerError(true);
    else setMailerError(false);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value);
    const validPassword = !!password.match(/[0-9a-zA-Z!@#$%^&*]{4,}/);
    if (validPassword) setPasswordError(true);
    else setPasswordError(false);
  };

  const authorization = () => {
    const authorizationObj = {
      mail: mailer,
      pass: password,
    };
    console.log(`fetch autorizationObj ${authorizationObj.mail} ${authorizationObj.pass}`);
  };
  return (
    <div className={styles.authorization}>
      <Paper elevation={12}>
        <div className={styles.box}>
          <div>Авторизация</div>
          <TextField
            id="mail"
            label="почта"
            variant="outlined"
            size="medium"
            color={mailerError ? 'primary' : 'error'}
            onChange={(event) => onChangeMailer(event)}
          />
          <TextField
            id="password"
            label="пароль"
            variant="outlined"
            size="medium"
            color={passwordError ? 'primary' : 'error'}
            onChange={(event) => onChangePassword(event)}
          />
          <Button variant="contained" onClick={authorization} disabled={!(mailerError && passwordError)}>Войти</Button>
        </div>
      </Paper>
    </div>
  );
}

export default AuthorizationPage;
