import React, { useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import styles from './Authorization.module.scss';

function AuthorizationPage() {
  const [mailer, setMailer] = useState('');
  const [password, setPassword] = useState('');

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
            onChange={(event) => { setMailer(event.target.value); }}
          />
          <TextField
            id="password"
            label="пароль"
            variant="outlined"
            size="medium"
            onChange={(event) => { setPassword(event.target.value); }}
          />
          <Button variant="contained" onClick={authorization}>Войти</Button>
        </div>
      </Paper>
    </div>
  );
}

export default AuthorizationPage;
