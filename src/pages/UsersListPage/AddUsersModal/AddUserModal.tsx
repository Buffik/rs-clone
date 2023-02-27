import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hook';
import UsersService from '../../../services/UsersService';
import { AddUserRequest, UserRoles } from '../../../types/types';
import styles from './AddUserModal.module.scss';

// --------------------------------------------------------------
interface TextKey {
  addEmployees: string;
  incorrect: string;
  name: string;
  surname: string;
  patronymic: string;
  role: string;
  email: string;
  phone: string;
  add: string;
  pass: string;
}
interface Text {
  [key: string]: TextKey;
}
const text: Text = {
  ru: {
    addEmployees: 'Добавить сотрудника',
    incorrect: 'неправильный ввод',
    name: 'имя',
    surname: 'фамилия',
    patronymic: 'отчество',
    role: 'роль',
    email: 'почта',
    phone: 'телефон',
    add: 'Добавить',
    pass: 'пароль',
  },
  en: {
    addEmployees: 'Add employees',
    incorrect: 'incorrect',
    name: 'name',
    surname: 'surname',
    patronymic: 'patronymic',
    role: 'role',
    email: 'email',
    phone: 'phone',
    add: 'ADD',
    pass: 'password',
  },
};
// ------------------------------------------------------------------

interface Props {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>,
}

function AddUserModal(props: Props) {
  const { setOpenAdd } = props;
  const languageState: string = useAppSelector(
    (state) => state.data.language,
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

  const [pass, setPass] = useState('');
  const [passError, setPassError] = useState(false);
  const onChangePass = (value: string) => {
    setPass(value);
    setPassError((!value.match(/^[a-zA-Z0-9]{7,15}$/)) && value !== '');
  };

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const onChangePhone = (value: string) => {
    setPhone(value);
    setPhoneError((!value.match(/^[+][0-9]{9,15}$/)) && value !== '');
  };

  const [date, setDate] = useState('');

  const [role, setRole] = useState<UserRoles>(UserRoles.Salesman);

  const addNewContact = () => {
    const data: AddUserRequest = {
      data: {
        firstName: name,
        patronymic,
        surname,
        birthday: date,
        mail: mailer,
        phone,
        password: pass,
      },
      role,
    };
    UsersService.addUser(data);
    setOpenAdd(false);
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalName}>{text[languageState].addEmployees}</div>
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
        error={passError}
        id="pass"
        label={text[languageState].pass}
        variant="outlined"
        size="medium"
        value={pass}
        onChange={(event) => onChangePass(event.target.value)}
        helperText={passError ? text[languageState].incorrect : ' '}
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">role</InputLabel>
        <Select
          sx={{ width: 220 }}
          id="demo-simple-select"
          value={role}
          label="role"
          onChange={(event) => setRole(event.target.value as UserRoles)}
        >
          <MenuItem value={UserRoles.Manager}>Manager</MenuItem>
          <MenuItem value={UserRoles.Salesman}>Salesman</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        className={styles.addBtn}
        onClick={addNewContact}
        disabled={(
          nameError || surnameError || patronymicError || mailerError || passError || phoneError
        )
          || (
            name === '' || surname === '' || mailer === '' || pass === '' || phone === '' || date === ''
          )}
      >
        {text[languageState].add}
      </Button>
    </div>
  );
}

export default AddUserModal;
