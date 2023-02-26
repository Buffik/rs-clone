import { TextField, Autocomplete, Button } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hook';
import ContactsService from '../../../services/ContactsService';
import { AddContactRequest } from '../../../types/types';
import styles from './AddContactModal.module.scss';

// --------------------------------------------------------------
interface TextKey {
  addContact: string;
  incorrect: string;
  name: string;
  surname: string;
  patronymic: string;
  сompany: string;
  email: string;
  phone: string;
  add: string;
}
interface Text {
  [key: string]: TextKey;
}
const text: Text = {
  ru: {
    addContact: 'Добавить контакт',
    incorrect: 'неправильный ввод',
    name: 'имя',
    surname: 'фамилия',
    patronymic: 'отчество',
    сompany: 'компания',
    email: 'почта',
    phone: 'телефон',
    add: 'Добавить',
  },
  en: {
    addContact: 'Add contact',
    incorrect: 'incorrect',
    name: 'name',
    surname: 'surname',
    patronymic: 'patronymic',
    сompany: 'company',
    email: 'email',
    phone: 'phone',
    add: 'ADD',
  },
};
// ------------------------------------------------------------------

interface Props {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>,
}

function AddContactModal(props: Props) {
  const { setOpenAdd } = props;
  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );
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

  const companies = useAppSelector((state) => state.data.clients);
  const companiesArr = companies.map((company) => ({
    label: company.data.companyName,
    // eslint-disable-next-line no-underscore-dangle
    id: company._id,
  }));
  const [companyID, setCompanyID] = useState<string>('');

  const addNewContact = () => {
    const data: AddContactRequest = {
      contact: {
        firstName: name,
        patronymic,
        surname,
        birthday: date,
        mail: mailer,
        phone: [phone],
      },
      companyId: companyID,
    };
    ContactsService.addContact(data);
    setOpenAdd(false);
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalName}>{text[languageState].addContact}</div>
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
      <Autocomplete
        disablePortal
        className={styles.companyInput}
        id="combo-box-demo"
        onChange={(e, value) => setCompanyID(value ? value.id : '')}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={companiesArr}
        sx={{ width: 220 }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label={text[languageState].сompany}
          />
        )}
      />
      <Button
        variant="contained"
        className={styles.addBtn}
        onClick={addNewContact}
        disabled={(nameError || surnameError || patronymicError || mailerError || phoneError)
          || (name === '' || companyID === '')}
      >
        {text[languageState].add}
      </Button>
    </div>
  );
}

export default AddContactModal;
