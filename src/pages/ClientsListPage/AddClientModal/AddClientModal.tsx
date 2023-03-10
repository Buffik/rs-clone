/* eslint-disable no-underscore-dangle */
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hook';
import ClientsService from '../../../services/ClientsService';
import {
  AddClientRequest,
  FullUserData,
  ProfileData,
  UserRoles,
} from '../../../types/types';
import styles from './AddClientModal.module.scss';

// --------------------------------------------------------------
interface TextKey {
  addClient: string;
  incorrect: string;
  сompany: string;
  email: string;
  phone: string;
  inn: string;
  address: string;
  add: string;
  employee: string;
}
interface Text {
  [key: string]: TextKey;
}
const text: Text = {
  ru: {
    addClient: 'Добавить клиента',
    incorrect: 'неправильный ввод',
    сompany: 'компания',
    email: 'почта',
    phone: 'телефон',
    inn: 'инн',
    address: 'адрес',
    add: 'Добавить',
    employee: 'Сотрудник',
  },
  en: {
    addClient: 'Add client',
    incorrect: 'incorrect',
    сompany: 'company',
    email: 'email',
    phone: 'phone',
    inn: 'inn',
    address: 'address',
    add: 'ADD',
    employee: 'Employee',
  },
};
// ------------------------------------------------------------------

interface Props {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddClientModal(props: Props) {
  const { setOpenAdd } = props;
  const userRole: ProfileData = useAppSelector((state) => state.data.profile);
  const currentEmployees: FullUserData[] = useAppSelector(
    (state) => state.data.users,
  );
  const languageState: string = useAppSelector((state) => state.data.language);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const onChangeName = (value: string) => {
    setName(value);
    setNameError(!value.match(/^[a-zA-Zа-яА-Я0-9\s]{2,30}?$/u) && value !== '');
  };

  const [mailer, setMailer] = useState('');
  const [mailerError, setMailerError] = useState(false);
  const onChangeMailer = (value: string) => {
    setMailer(value);
    setMailerError(
      !value.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/)
        && value !== '',
    );
  };

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const onChangePhone = (value: string) => {
    setPhone(value);
    setPhoneError(!value.match(/^[+][0-9]{9,15}$/) && value !== '');
  };

  const [inn, setInn] = useState<string | undefined>('');
  const [innError, setInnError] = useState(false);
  const onChangeInn = (value: string) => {
    setInn(value);
    setInnError(!value.match(/^[0-9]{10,12}$/) && value !== '');
  };

  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);
  const onChangeAddress = (value: string) => {
    setAddress(value);
    setAddressError(
      !value.match(/^[a-zA-Zа-яА-Я0-9\s,._-]{1,200}?$/u) && value !== '',
    );
  };

  const [employees, setEmployees] = useState<string[]>([]);
  const handleEmployeesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setEmployees(typeof value === 'string' ? value.split(',') : value);
  };
  const editClient = () => {
    if (
      userRole?.role === UserRoles.Admin
      || userRole?.role === UserRoles.Manager
    ) {
      const data: AddClientRequest = {
        users: employees,
        data: {
          companyName: name,
          address,
          inn: Number(inn),
        },
        contacts: {
          commonPhone: [phone],
          commonMail: mailer,
        },
      };
      // eslint-disable-next-line no-underscore-dangle
      ClientsService.addCompany(data);
      setOpenAdd(false);
    } else {
      const data: AddClientRequest = {
        data: {
          companyName: name,
          address,
          inn: Number(inn),
        },
        contacts: {
          commonPhone: [phone],
          commonMail: mailer,
        },
      };
      // eslint-disable-next-line no-underscore-dangle
      ClientsService.addCompany(data);
      setOpenAdd(false);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <div className={styles.modalClient}>
      <div className={styles.modalName}>{text[languageState].addClient}</div>
      <TextField
        autoComplete="off"
        sx={{ width: 220 }}
        error={nameError}
        id="name"
        label={text[languageState].сompany}
        variant="outlined"
        size="medium"
        value={name}
        onChange={(event) => onChangeName(event.target.value)}
        helperText={nameError ? text[languageState].incorrect : ' '}
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
      <TextField
        autoComplete="off"
        sx={{ width: 220 }}
        error={innError}
        id="inn"
        label={text[languageState].inn}
        variant="outlined"
        size="medium"
        value={inn}
        onChange={(event) => onChangeInn(event.target.value)}
        helperText={innError ? text[languageState].incorrect : ' '}
      />
      <TextField
        autoComplete="off"
        sx={{ width: 220 }}
        error={addressError}
        id="address"
        label={text[languageState].address}
        variant="outlined"
        size="medium"
        value={address}
        onChange={(event) => onChangeAddress(event.target.value)}
        helperText={addressError ? text[languageState].incorrect : ' '}
      />
      {(userRole?.role === UserRoles.Admin
        || userRole?.role === UserRoles.Manager) && (
        <FormControl sx={{ m: 1, width: 220 }}>
          <InputLabel id="multiple-name-label">
            {text[languageState].employee}
          </InputLabel>
          <Select
            labelId="multiple-name-label"
            id="multiple-name"
            multiple
            value={employees}
            onChange={(event) => handleEmployeesChange(event)}
            input={<OutlinedInput label={text[languageState].employee} />}
            MenuProps={MenuProps}
          >
            {currentEmployees.map((emp) => (
              <MenuItem
                key={emp._id}
                value={emp._id}
                // style={getStyles(name, personName, theme)}
              >
                {`${emp.data.surname} ${emp.data.firstName.slice(0, 1)}.`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Button
        variant="contained"
        className={styles.addBtn}
        onClick={editClient}
        disabled={
          nameError
          || mailerError
          || phoneError
          || innError
          || addressError
          || name === ''
          || phone === ''
          || inn === ''
        }
      >
        {text[languageState].add}
      </Button>
    </div>
  );
}

export default AddClientModal;
