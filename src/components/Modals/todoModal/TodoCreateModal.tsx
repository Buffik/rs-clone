/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook';
import {
  addTodo,
  fetchCurrentDayTodos,
} from '../../../store/currentDayTodosSlice';
import {
  AddTodoRequest,
  TodoFromClient,
  TodoTypes,
} from '../../../types/types';
import DatePicker from '../DatePicker/DatePicker';
import SearchDropDown from '../SearchDropDown/SearchDropDown';
import styles from './TodoCreateModal.module.scss';

interface ITextData {
  title: string;
  text: string;
  company: string;
  type: string;
  call: string;
  meet: string;
  calc: string;
  common: string;
  create: string;
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
    create: 'Создать',
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
    create: 'Create',
  },
};

interface iTodoCreateModal {
  propsStartTime: string;
  propsStartDate: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function todoCreateModal({
  propsStartTime,
  propsStartDate,
  setShowModal,
}: iTodoCreateModal) {
  const dispatch = useAppDispatch();
  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );
  const [timeValid, setTimeValid] = useState(false);
  const [titleValid, setTitleValid] = useState(false);
  const [companyValid, setCompanyValid] = useState(false);
  const [allDataValid, setAllDataValid] = useState(false);
  const [todoData, setTodoData] = useState<AddTodoRequest>({
    company: '',
    isDone: false,
    data: {
      type: TodoTypes.Common,
      startTime: '',
      endTime: '',
      title: '',
      text: '',
    },
  });

  const handleCreateAction = async () => {
    setShowModal(false);
    await dispatch(addTodo(todoData));
    await dispatch(fetchCurrentDayTodos('2023-02-18'));
  };

  useEffect(() => {
    if (todoData.data.title) {
      setTitleValid(true);
    } else {
      setTitleValid(false);
    }
    if (todoData.company) {
      setCompanyValid(true);
    } else {
      setCompanyValid(false);
    }
    console.log(todoData);
  }, [todoData]);

  useEffect(() => {
    if (timeValid && titleValid && companyValid) {
      setAllDataValid(true);
    } else setAllDataValid(false);
  }, [timeValid, titleValid, companyValid]);

  return (
    <Box>
      <DatePicker
        setTimeValid={setTimeValid}
        setTodoData={setTodoData}
        propsStartTime={propsStartTime}
        propsStartDate={propsStartDate}
      />
      <TextField
        className={styles.textInput}
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
        className={styles.textInput}
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
      <div className={styles.dropDown}>
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
                data: { ...todoData.data, type: e.target.value as TodoTypes },
              })
            }
          >
            <MenuItem value={TodoTypes.Call}>
              {dict[languageState].call}
            </MenuItem>
            <MenuItem value={TodoTypes.Calc}>
              {dict[languageState].calc}
            </MenuItem>
            <MenuItem value={TodoTypes.Meet}>
              {dict[languageState].meet}
            </MenuItem>
            <MenuItem value={TodoTypes.Common}>
              {dict[languageState].common}
            </MenuItem>
          </Select>
        </FormControl>
        <SearchDropDown setTodoData={setTodoData} />
        <Button
          variant="outlined"
          className={styles.dropDownButton}
          disabled={!allDataValid}
          onClick={handleCreateAction}
        >
          {dict[languageState].create}
        </Button>
      </div>
    </Box>
  );
}

export default todoCreateModal;
