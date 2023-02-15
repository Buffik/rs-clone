/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hook';
import SearchDropDown from '../SearchDropDown/SearchDropDown';
import styles from './TodoCreateModal.module.scss';

export interface ICreateModal {
  company: string;
  isDone: boolean;
  data: {
    type: string;
    startTime: string;
    endTime: string;
    title: string;
    text: string;
  };
}

interface ITextData {
  title: string;
  text: string;
  company: string;
  type: string;
  call: string;
  meet: string;
  calc: string;
  common: string;
}

interface ILanguage {
  [key: string]: ITextData;
}

const dict: ILanguage = {
  ru: {
    title: 'Введите заголовок',
    text: 'Описание',
    company: 'Выберите компанию',
    type: 'Тип события',
    call: 'Звонок',
    meet: 'Встреча',
    calc: 'Расчет',
    common: 'Задача',
  },
  en: {
    title: 'Title',
    text: 'Body',
    company: 'Company',
    type: 'Event type',
    call: 'Call',
    meet: 'Meet',
    calc: 'Calculation',
    common: 'Task',
  },
};

function todoCreateModal() {
  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );
  const companies = useAppSelector((state) => state.allClients.allClients);
  console.log(companies);

  const [todoData, setTodoData] = useState<ICreateModal>({
    company: '',
    isDone: false,
    data: {
      type: 'common',
      startTime: '',
      endTime: '',
      title: '',
      text: '',
    },
  });
  console.log(todoData);

  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        fullWidth
        id="outlined-controlled"
        label={dict[languageState].title}
        placeholder={dict[languageState].title}
        value={todoData.data.title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTodoData({
            ...todoData,
            data: { ...todoData.data, title: event.currentTarget.value },
          });
        }}
      />
      <TextField
        fullWidth
        id="outlined-controlled"
        label={dict[languageState].text}
        placeholder={dict[languageState].text}
        value={todoData.data.text}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTodoData({
            ...todoData,
            data: { ...todoData.data, text: event.currentTarget.value },
          });
        }}
      />
      <FormControl>
        <InputLabel id="todoTypeLabel">{dict[languageState].type}</InputLabel>
        <Select
          labelId="todoTypeLabel"
          id="todoType"
          value={todoData.data.type}
          label={dict[languageState].type}
          onChange={(e) =>
            setTodoData({
              ...todoData,
              data: { ...todoData.data, type: e.target.value },
            })
          }
        >
          <MenuItem value="call">{dict[languageState].call}</MenuItem>
          <MenuItem value="calc">{dict[languageState].calc}</MenuItem>
          <MenuItem value="meet">{dict[languageState].meet}</MenuItem>
          <MenuItem value="common">{dict[languageState].common}</MenuItem>
        </Select>
      </FormControl>
      <SearchDropDown todoData={todoData} setTodoData={setTodoData} />
    </Box>
  );
}

export default todoCreateModal;
