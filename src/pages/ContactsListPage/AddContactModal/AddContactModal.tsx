import { TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from './AddContactModal.module.scss';

function AddContactModal() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const onChangeName = (value: string) => {
    setName(value);
    setNameError((!value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u)) && value !== '');
  };

  const [surname, setSurname] = useState('');
  const [surnameError, setSurnameError] = useState(false);
  const onChangeSurname = (value: string) => {
    setSurname(value);
    setSurnameError((!value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u)) && value !== '');
  };

  const [patronymic, setPatronymic] = useState('');
  const [patronymicError, setPatronymicError] = useState(false);
  const onChangePatronymic = (value: string) => {
    setPatronymic(value);
    setPatronymicError((!value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u)) && value !== '');
  };

  const [mailer, setMailer] = useState('');
  const [mailerError, setMailerError] = useState(false);
  const onChangeMailer = (value: string) => {
    setMailer(value);
    setMailerError((!value.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/)) && value !== '');
  };

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const onChangePhone = (value: string) => {
    setPhone(value);
    setPhoneError((!value.match(/^[+][0-9]{9,15}$/)) && value !== '');
  };

  const [date, setDate] = useState('');

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalName}>Add contact</div>
      <TextField
        autoComplete="off"
        sx={{ width: '220px' }}
        error={nameError}
        id="name"
        label="name"
        variant="outlined"
        size="medium"
        value={name}
        onChange={(event) => onChangeName(event.target.value)}
        helperText={nameError ? 'incorrect' : ' '}
      />
      <TextField
        autoComplete="off"
        sx={{ width: '220px' }}
        error={surnameError}
        id="surname"
        label="surname"
        variant="outlined"
        size="medium"
        value={surname}
        onChange={(event) => onChangeSurname(event.target.value)}
        helperText={surnameError ? 'incorrect' : ' '}
      />
      <TextField
        autoComplete="off"
        sx={{ width: '220px' }}
        error={patronymicError}
        id="patronymic"
        label="patronymic"
        variant="outlined"
        size="medium"
        value={patronymic}
        onChange={(event) => onChangePatronymic(event.target.value)}
        helperText={patronymicError ? 'incorrect' : ' '}
      />
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
      <TextField
        autoComplete="off"
        sx={{ width: '220px' }}
        error={phoneError}
        id="phone"
        label="phone"
        variant="outlined"
        size="medium"
        value={phone}
        onChange={(event) => onChangePhone(event.target.value)}
        helperText={phoneError ? 'incorrect' : ' '}
      />
      <input
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        className={styles.dateInput}
        type="date"
      />
    </div>
  );
}

export default AddContactModal;
