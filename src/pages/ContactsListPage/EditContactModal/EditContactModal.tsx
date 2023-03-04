import { TextField, Button, IconButton } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../../hook';
import ContactsService from '../../../services/ContactsService';
import { FullContactData, UpdateContactRequest } from '../../../types/types';
import styles from './EditContactModal.module.scss';

// --------------------------------------------------------------
interface TextKey {
  editContact: string;
  incorrect: string;
  name: string;
  surname: string;
  patronymic: string;
  сompany: string;
  email: string;
  phone: string;
  edit: string;
}
interface Text {
  [key: string]: TextKey;
}
const text: Text = {
  ru: {
    editContact: 'Редактировать контакт',
    incorrect: 'неправильный ввод',
    name: 'имя',
    surname: 'фамилия',
    patronymic: 'отчество',
    сompany: 'компания',
    email: 'почта',
    phone: 'телефон',
    edit: 'Изменить',
  },
  en: {
    editContact: 'Edit contact',
    incorrect: 'incorrect',
    name: 'name',
    surname: 'surname',
    patronymic: 'patronymic',
    сompany: 'company',
    email: 'email',
    phone: 'phone',
    edit: 'EDIT',
  },
};
// ------------------------------------------------------------------

interface Props {
  selectedContact: FullContactData;
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}

function EditContactModal(props: Props) {
  const { selectedContact, setOpenAdd } = props;
  const languageState: string = useAppSelector(
    (state) => state.data.language,
  );
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

  const editContact = () => {
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
    setOpenAdd(false);
  };

  const deleteContact = () => {
    // eslint-disable-next-line no-underscore-dangle
    ContactsService.deleteContact(selectedContact._id);
    setOpenAdd(false);
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalName}>{text[languageState].editContact}</div>
      <TextField
        autoComplete="off"
        sx={{ width: 220 }}
        error={nameError}
        id="name"
        label={text[languageState].name}
        variant="outlined"
        size="medium"
        value={name}
        onChange={(event) => onChangeName(event.target.value)}
        helperText={nameError ? text[languageState].incorrect : ' '}
      />
      <TextField
        autoComplete="off"
        sx={{ width: 220 }}
        error={surnameError}
        id="surname"
        label={text[languageState].surname}
        variant="outlined"
        size="medium"
        value={surname}
        onChange={(event) => onChangeSurname(event.target.value)}
        helperText={surnameError ? text[languageState].incorrect : ' '}
      />
      <TextField
        autoComplete="off"
        sx={{ width: 220 }}
        error={patronymicError}
        id="patronymic"
        label={text[languageState].patronymic}
        variant="outlined"
        size="medium"
        value={patronymic}
        onChange={(event) => onChangePatronymic(event.target.value)}
        helperText={patronymicError ? text[languageState].incorrect : ' '}
      />
      <TextField
        autoComplete="off"
        sx={{ width: 220 }}
        error={mailerError}
        id="mail"
        label={text[languageState].email}
        variant="outlined"
        size="medium"
        value={mailer}
        onChange={(event) => onChangeMailer(event.target.value)}
        helperText={mailerError ? text[languageState].incorrect : ' '}
      />
      <TextField
        autoComplete="off"
        sx={{ width: 220 }}
        error={phoneError}
        id="phone"
        label={text[languageState].phone}
        variant="outlined"
        size="medium"
        value={phone}
        onChange={(event) => onChangePhone(event.target.value)}
        helperText={phoneError ? text[languageState].incorrect : ' '}
      />
      <input
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        className={styles.dateInput}
        type="date"
      />
      <div className={styles.btnRow}>
        <Button
          variant="contained"
          className={styles.addBtn}
          onClick={editContact}
          disabled={(nameError || surnameError || patronymicError || mailerError || phoneError)
            || (name === '')}
        >
          {text[languageState].edit}
        </Button>
        <IconButton onClick={deleteContact}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default EditContactModal;
