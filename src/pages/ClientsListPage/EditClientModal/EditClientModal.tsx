/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { useAppSelector } from '../../../hook';
import ClientsService from '../../../services/ClientsService';
import {
  FullClientData,
  FullUserData,
  ProfileData,
  UpdateClientRequest,
  UserRoles,
} from '../../../types/types';
import styles from './EditContactModal.module.scss';

// --------------------------------------------------------------
interface TextKey {
  editClient: string;
  incorrect: string;
  сompany: string;
  email: string;
  phone: string;
  inn: string;
  address: string;
  edit: string;
  employee: string;
}
interface Text {
  [key: string]: TextKey;
}
const text: Text = {
  ru: {
    editClient: 'Редактировать клиента',
    incorrect: 'неправильный ввод',
    сompany: 'компания',
    email: 'почта',
    phone: 'телефон',
    inn: 'инн',
    address: 'адрес',
    edit: 'Изменить',
    employee: 'Сотрудник',
  },
  en: {
    editClient: 'Edit client',
    incorrect: 'incorrect',
    сompany: 'company',
    email: 'email',
    phone: 'phone',
    inn: 'inn',
    address: 'address',
    edit: 'EDIT',
    employee: 'Employee',
  },
};
// ------------------------------------------------------------------

interface Props {
  shouldFetchDeletedClients: boolean;
  selectedClient: FullClientData;
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditClientModal(props: Props) {
  const { shouldFetchDeletedClients, selectedClient, setOpenAdd } = props;
  const userRole: ProfileData = useAppSelector((state) => state.data.profile);
  const languageState: string = useAppSelector((state) => state.data.language);
  const currentEmployees: FullUserData[] = useAppSelector(
    (state) => state.data.users,
  );

  const [name, setName] = useState(selectedClient.data.companyName);
  const [nameError, setNameError] = useState(false);
  const onChangeName = (value: string) => {
    setName(value);
    setNameError(!value.match(/^[a-zA-Zа-яА-Я0-9\s]{2,30}?$/u) && value !== '');
  };

  const [mailer, setMailer] = useState(selectedClient.contacts?.commonMail);
  const [mailerError, setMailerError] = useState(false);
  const onChangeMailer = (value: string) => {
    setMailer(value);
    setMailerError(
      !value.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/) &&
        value !== '',
    );
  };

  const [phone, setPhone] = useState(
    selectedClient.contacts?.commonPhone
      ? selectedClient.contacts?.commonPhone[0]
      : '',
  );
  const [phoneError, setPhoneError] = useState(false);
  const onChangePhone = (value: string) => {
    setPhone(value);
    setPhoneError(!value.match(/^[+][0-9]{9,15}$/) && value !== '');
  };

  const [inn, setInn] = useState<string>(String(selectedClient.data?.inn));
  const [innError, setInnError] = useState(false);
  const onChangeInn = (value: string) => {
    setInn(value);
    setInnError(!value.match(/^[0-9]{10,12}$/) && value !== '');
  };

  const [address, setAddress] = useState(selectedClient.data?.address);
  const [addressError, setAddressError] = useState(false);
  const onChangeAddress = (value: string) => {
    setAddress(value);
    setAddressError(
      !value.match(/^[a-zA-Zа-яА-Я0-9\s,._-]{1,200}?$/u) && value !== '',
    );
  };

  const [employees, setEmployees] = useState(
    selectedClient.users.map((user) => user._id),
  );
  const handleEmployeesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setEmployees(typeof value === 'string' ? value.split(',') : value);
  };

  const editClient = () => {
    if (
      userRole?.role === UserRoles.Admin ||
      userRole?.role === UserRoles.Manager
    ) {
      const data: UpdateClientRequest = {
        users: employees,
        data: {
          companyName: name,
          inn: Number(inn),
          address,
        },
        contacts: {
          commonPhone: [phone],
          commonMail: mailer,
        },
      };
      // eslint-disable-next-line no-underscore-dangle
      ClientsService.updateClient(data, selectedClient._id);
      setOpenAdd(false);
    } else {
      const data: UpdateClientRequest = {
        data: {
          companyName: name,
          inn: Number(inn),
          address,
        },
        contacts: {
          commonPhone: [phone],
          commonMail: mailer,
        },
      };
      // eslint-disable-next-line no-underscore-dangle
      ClientsService.updateClient(data, selectedClient._id);
      setOpenAdd(false);
    }
  };

  const deleteClient = () => {
    // eslint-disable-next-line no-underscore-dangle
    ClientsService.deleteClient(selectedClient._id);
    setOpenAdd(false);
  };

  const restoreClient = () => {
    // eslint-disable-next-line no-underscore-dangle
    ClientsService.undeleteClient(selectedClient._id);
    setOpenAdd(false);
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
      <div className={styles.modalName}>{text[languageState].editClient}</div>
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
      {(userRole?.role === UserRoles.Admin ||
        userRole?.role === UserRoles.Manager) && (
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
      <div className={styles.btnRow}>
        <Button
          variant="contained"
          className={styles.addBtn}
          onClick={editClient}
          disabled={
            nameError ||
            mailerError ||
            phoneError ||
            innError ||
            addressError ||
            name === '' ||
            phone === '' ||
            inn === ''
          }
        >
          {text[languageState].edit}
        </Button>
        {(userRole?.role === UserRoles.Admin ||
          userRole?.role === UserRoles.Manager) &&
          (shouldFetchDeletedClients ? (
            <IconButton onClick={restoreClient}>
              <SettingsBackupRestoreIcon />
            </IconButton>
          ) : (
            <IconButton onClick={deleteClient}>
              <DeleteIcon />
            </IconButton>
          ))}
      </div>
    </div>
  );
}

export default EditClientModal;
