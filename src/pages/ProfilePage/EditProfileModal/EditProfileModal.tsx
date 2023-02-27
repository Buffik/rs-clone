/* eslint-disable operator-linebreak */
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
import {
  UpdateUserRequest,
  UserRoles,
  ProfileData,
} from '../../../types/types';
import styles from './EditProfileModal.module.scss';

// --------------------------------------------------------------
interface TextKey {
  editProfile: string;
  incorrect: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  edit: string;
  pass: string;
}
interface Text {
  [key: string]: TextKey;
}
const text: Text = {
  ru: {
    editProfile: 'Редактировать профиль',
    incorrect: 'неправильный ввод',
    name: 'имя',
    surname: 'фамилия',
    patronymic: 'отчество',
    email: 'почта',
    phone: 'телефон',
    edit: 'Изменить',
    pass: 'пароль',
  },
  en: {
    editProfile: 'Edit profile',
    incorrect: 'incorrect',
    name: 'name',
    surname: 'surname',
    patronymic: 'patronymic',
    email: 'email',
    phone: 'phone',
    edit: 'EDIT',
    pass: 'password',
  },
};
// ------------------------------------------------------------------

interface Props {
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
  profile: ProfileData;
}

function EditProfileModal(props: Props) {
  const { setOpenProfile, profile } = props;

  // const profileData = useAppSelector((state) => state.data.profile);
  // const [profile, setProfile] = useState<ProfileData>(profileData);

  const languageState: string = useAppSelector((state) => state.data.language);
  const [name, setName] = useState(profile.data.firstName);
  const [nameError, setNameError] = useState(false);
  const onChangeName = (value: string) => {
    setName(value);
    setNameError(!value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u) && value !== '');
  };

  const [surname, setSurname] = useState(profile.data.surname);
  const [surnameError, setSurnameError] = useState(false);
  const onChangeSurname = (value: string) => {
    setSurname(value);
    setSurnameError(!value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u) && value !== '');
  };

  const [patronymic, setPatronymic] = useState(profile.data.patronymic);
  const [patronymicError, setPatronymicError] = useState(false);
  const onChangePatronymic = (value: string) => {
    setPatronymic(value);
    setPatronymicError(
      !value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u) && value !== '',
    );
  };

  const [mailer, setMailer] = useState(profile.data.mail);
  const [mailerError, setMailerError] = useState(false);
  const onChangeMailer = (value: string) => {
    setMailer(value);
    setMailerError(
      !value.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/) &&
        value !== '',
    );
  };

  const [pass, setPass] = useState('');
  const [passError, setPassError] = useState(false);
  const onChangePass = (value: string) => {
    setPass(value);
    setPassError(!value.match(/^[a-zA-Z0-9]{7,15}$/) && value !== '');
  };

  const [phone, setPhone] = useState(profile.data.phone);
  const [phoneError, setPhoneError] = useState(false);
  const onChangePhone = (value: string) => {
    setPhone(value);
    setPhoneError(!value.match(/^[+][0-9]{9,15}$/) && value !== '');
  };

  const [date, setDate] = useState(profile.data.birthday);

  const [role, setRole] = useState<UserRoles>(profile.role);

  // useEffect(() => {
  //   setProfile(profile);
  //   // setName(profile.data.firstName);
  //   // setSurname(profile.data.surname);
  //   // setPatronymic(profile.data.patronymic);
  //   // setMailer(profile.data.mail);
  //   // setPhone(profile.data.phone);
  //   // setDate(profile.data.birthday);
  //   // setRole(profile.role);
  // }, [profileData]);
  // useEffect(() => {
  //   setName(profile.data.firstName);
  //   setSurname(profile.data.surname);
  //   setPatronymic(profile.data.patronymic);
  //   setMailer(profile.data.mail);
  //   setPhone(profile.data.phone);
  //   setDate(profile.data.birthday);
  //   setRole(profile.role);
  // }, [profile]);

  const editProfile = () => {
    let data: UpdateUserRequest = {};
    if (role === UserRoles.Admin || role === UserRoles.Manager) {
      data = {
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
    } else {
      data = {
        data: {
          mail: mailer,
          phone,
          password: pass,
        },
      };
    }
    UsersService.updateProfile(data);
    setOpenProfile(false);
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalName}>
        {text[languageState].editProfile}
      </div>
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
        disabled={role !== UserRoles.Admin && role !== UserRoles.Manager}
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
        disabled={role !== UserRoles.Admin && role !== UserRoles.Manager}
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
        disabled={role !== UserRoles.Admin && role !== UserRoles.Manager}
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
        disabled={role !== UserRoles.Admin && role !== UserRoles.Manager}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">role</InputLabel>
        <Select
          sx={{ width: 220 }}
          id="demo-simple-select"
          value={role}
          label="role"
          onChange={(event) => setRole(event.target.value as UserRoles)}
          disabled={role !== UserRoles.Admin && role !== UserRoles.Manager}
        >
          <MenuItem value={UserRoles.Manager}>Manager</MenuItem>
          <MenuItem value={UserRoles.Salesman}>Salesman</MenuItem>
        </Select>
      </FormControl>
      <div className={styles.btnRow}>
        <Button
          variant="contained"
          className={styles.addBtn}
          onClick={editProfile}
          disabled={
            nameError ||
            surnameError ||
            patronymicError ||
            mailerError ||
            phoneError ||
            name === ''
          }
        >
          {text[languageState].edit}
        </Button>
      </div>
    </div>
  );
}

export default EditProfileModal;
