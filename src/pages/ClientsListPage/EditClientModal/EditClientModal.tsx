import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hook';
import { FullClientData } from '../../../types/types';
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
  selectedClient: FullClientData;
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>
}

function EditContactModal(props: Props) {
  const { selectedClient, setOpenAdd } = props;
  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );
  const [name, setName] = useState(selectedClient.data.companyName);
  const [nameError, setNameError] = useState(false);
  const onChangeName = (value: string) => {
    setName(value);
    setNameError((!value.match(/^[a-zA-Zа-яА-Я]{2,20}?$/u)) && value !== '');
  };

  const editContact = () => {
    console.log('EditContact');
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
      <Button
        variant="contained"
        className={styles.addBtn}
        onClick={editContact}
        disabled={(nameError)
          || (name === '')}
      >
        {text[languageState].edit}
      </Button>
    </div>
  );
}

export default EditContactModal;
