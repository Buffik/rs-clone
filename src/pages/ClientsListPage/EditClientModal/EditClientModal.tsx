import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hook';
import ClientsService from '../../../services/ClientsService';
import { FullClientData, UpdateClientRequest } from '../../../types/types';
import styles from './EditContactModal.module.scss';

// --------------------------------------------------------------
interface TextKey {
  editClient: string;
  incorrect: string;
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
    editClient: 'Редактировать клиента',
    incorrect: 'неправильный ввод',
    сompany: 'компания',
    email: 'почта',
    phone: 'телефон',
    edit: 'Изменить',
  },
  en: {
    editClient: 'Edit client',
    incorrect: 'incorrect',
    сompany: 'company',
    email: 'email',
    phone: 'phone',
    edit: 'EDIT',
  },
};
// ------------------------------------------------------------------

interface Props {
  selectedClient: FullClientData;
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}

function EditClientModal(props: Props) {
  const { selectedClient, setOpenAdd } = props;
  console.log(selectedClient);

  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );

  const [name, setName] = useState(selectedClient.data.companyName);
  const [nameError, setNameError] = useState(false);
  const onChangeName = (value: string) => {
    setName(value);
    setNameError((!value.match(/^[a-zA-Zа-яА-Я0-9\s]{2,30}?$/u)) && value !== '');
  };

  const [mailer, setMailer] = useState(selectedClient.contacts?.commonMail);
  const [mailerError, setMailerError] = useState(false);
  const onChangeMailer = (value: string) => {
    setMailer(value);
    setMailerError((!value.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/)) && value !== '');
  };

  const [phone, setPhone] = useState(selectedClient.contacts?.commonPhone ? selectedClient.contacts?.commonPhone[0] : '');
  const [phoneError, setPhoneError] = useState(false);
  const onChangePhone = (value: string) => {
    setPhone(value);
    setPhoneError((!value.match(/^[+][0-9]{9,15}$/)) && value !== '');
  };

  const editClient = () => {
    const data: UpdateClientRequest = {
      data: {
        companyName: name,
      },
      contacts: {
        commonPhone: [phone],
        commonMail: mailer,
      },
    };
    // eslint-disable-next-line no-underscore-dangle
    ClientsService.updateClient(data, selectedClient._id);
    setOpenAdd(false);
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
      <Button
        variant="contained"
        className={styles.addBtn}
        onClick={editClient}
        disabled={(nameError || mailerError || phoneError)
          || (name === '' || phone === '')}
      >
        {text[languageState].edit}
      </Button>
    </div>
  );
}

export default EditClientModal;
