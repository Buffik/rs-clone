import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import ContactsService from '../../../services/ContactsService';
import { FullContactData, UpdateContactRequest } from '../../../types/types';
import styles from './EditContactModal.module.scss';

interface Props {
  selectedContact: FullContactData;
}

function AddContactModal(props: Props) {
  const { selectedContact } = props;
  const [name, setName] = useState(selectedContact.firstName);
  const [nameError, setNameError] = useState(false);
  const onChangeName = (value: string) => {
    setName(value);
    setNameError((!value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u)) && value !== '');
  };

  const [surname, setSurname] = useState(selectedContact.surname);
  const [surnameError, setSurnameError] = useState(false);
  const onChangeSurname = (value: string) => {
    setSurname(value);
    setSurnameError((!value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u)) && value !== '');
  };

  const [patronymic, setPatronymic] = useState(selectedContact.patronymic);
  const [patronymicError, setPatronymicError] = useState(false);
  const onChangePatronymic = (value: string) => {
    setPatronymic(value);
    setPatronymicError((!value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u)) && value !== '');
  };

  const [mailer, setMailer] = useState(selectedContact.mail);
  const [mailerError, setMailerError] = useState(false);
  const onChangeMailer = (value: string) => {
    setMailer(value);
    setMailerError((!value.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/)) && value !== '');
  };

  const [phone, setPhone] = useState(selectedContact.phone ? selectedContact.phone[0] : '');
  const [phoneError, setPhoneError] = useState(false);
  const onChangePhone = (value: string) => {
    setPhone(value);
    setPhoneError((!value.match(/^[+][0-9]{9,15}$/)) && value !== '');
  };

  const [date, setDate] = useState(selectedContact.birthday);

  const addNewContact = () => {
    const data: UpdateContactRequest = {
      firstName: name,
      patronymic,
      surname,
      birthday: date,
      mail: mailer,
      phone: [phone],
    };
    // eslint-disable-next-line no-underscore-dangle
    ContactsService.updateContact(data, selectedContact._id);
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalName}>Edit contact</div>
      <TextField
        autoComplete="off"
        sx={{ width: 220 }}
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
        sx={{ width: 220 }}
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
        sx={{ width: 220 }}
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
        sx={{ width: 220 }}
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
        sx={{ width: 220 }}
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
      <Button
        variant="contained"
        className={styles.addBtn}
        onClick={addNewContact}
        disabled={(nameError || surnameError || patronymicError || mailerError || phoneError)
          || (name === '')}
      >
        EDIT
      </Button>
    </div>
  );
}

export default AddContactModal;
