/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { addTodo, updateTodo } from '../../../store/currentDayTodosSlice';
import {
  ActionTypeAtModalWindow,
  AddTodoRequest,
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
  update: string;
  isDone: string;
  done: string;
  notDone: string;
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
    update: 'Обновить',
    isDone: 'Статус',
    done: 'Выполнено',
    notDone: 'В процессе',
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
    update: 'Update',
    isDone: 'Status',
    done: 'Done',
    notDone: 'In progress',
  },
};

interface iTodoCreateModal {
  todoData: AddTodoRequest;
  setTodoData: React.Dispatch<React.SetStateAction<AddTodoRequest>>;
  actionType: ActionTypeAtModalWindow;
  propsStartTime: string;
  fetchTodos: () => Promise<void>;
  propsEndTime?: string;
  propsStartDate: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  todoId?: string;
  todoCompany?: string;
  todoIsDone?: boolean;
  todoType?: TodoTypes;
  todoTitle?: string;
  todoText?: string;
}

function todoCreateModal({
  todoData,
  setTodoData,
  actionType,
  propsStartTime,
  propsEndTime,
  propsStartDate,
  setShowModal,
  todoId,
  todoCompany,
  todoIsDone,
  todoType,
  todoTitle,
  todoText,
  fetchTodos,
}: iTodoCreateModal) {
  const dispatch = useAppDispatch();
  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );
  const [timeValid, setTimeValid] = useState(false);
  const [titleValid, setTitleValid] = useState(false);
  const [companyValid, setCompanyValid] = useState(false);
  const [allDataValid, setAllDataValid] = useState(false);

  const handleCreateAction = async () => {
    document.body.style.overflow = 'scroll';
    setShowModal(false);
    if (todoId) {
      await dispatch(updateTodo({ data: todoData, id: todoId }));
      await fetchTodos();
    } else {
      await dispatch(addTodo(todoData));
      setTodoData({
        ...todoData,
        company: '',
        data: { ...todoData.data, title: '', text: '' },
      });
      await fetchTodos();
    }
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
        propsEndTime={propsEndTime || ''}
        propsStartDate={propsStartDate}
      />
      <TextField
        className={styles.textInput}
        fullWidth
        required
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
        <div className={styles.dropDownStatus}>
          <FormControl className={styles.dropDownStatusWrapper}>
            <InputLabel id="todoTypeLabel">
              {dict[languageState].type}
            </InputLabel>
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
          <FormControlLabel
            control={
              <Checkbox
                checked={todoData.isDone}
                onChange={() => {
                  setTodoData({
                    ...todoData,
                    isDone: !todoData.isDone,
                    data: { ...todoData.data },
                  });
                }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={dict[languageState].isDone}
          />
        </div>
        <SearchDropDown setTodoData={setTodoData} company={todoCompany || ''} />
        <Button
          variant="outlined"
          className={
            allDataValid ? styles.dropDownButton : styles.dropDownButtonInvalid
          }
          disabled={!allDataValid}
          onClick={handleCreateAction}
        >
          {dict[languageState][actionType]}
        </Button>
      </div>
    </Box>
  );
}

export default todoCreateModal;
