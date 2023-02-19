import { TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from './AddContactModal.module.scss';

function AddContactModal() {
  const [mailer, setMailer] = useState('');
  const [mailerError, setMailerError] = useState(false);
  const onChangeMailer = (value: string) => {
    setMailer(value);
    setMailerError((!value.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/)) && value !== '');
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalName}>Add contact</div>
      <TextField
        autoComplete="off"
        sx={{ width: '220px' }}
        error={mailerError}
        id="mail"
        label="mail"
        variant="outlined"
        size="medium"
        value={mailer}
        onChange={(event) => onChangeMailer(event.target.value)}
        helperText={mailerError ? 'incorrect' : ' '}
      />
    </div>
  );
}

export default AddContactModal;
