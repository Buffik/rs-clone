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
  updateTodo,
} from '../../../store/currentDayTodosSlice';
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
  const [todoData, setTodoData] = useState<AddTodoRequest>({
    company: todoCompany || '',
    isDone: todoIsDone || false,
    data: {
      type: todoType || TodoTypes.Common,
      startTime: '',
      endTime: '',
      title: todoTitle || '',
      text: todoText || '',
    },
  });

  const handleCreateAction = async () => {
    setShowModal(false);
    if (todoId) {
      await dispatch(updateTodo({ data: todoData, id: todoId }));
      await fetchTodos();
    } else {
      await dispatch(addTodo(todoData));
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
          <FormControl>
            <InputLabel id="todoIsDoneLabel">
              {dict[languageState].isDone}
            </InputLabel>
            <Select
              labelId="todoIsDoneLabel"
              id="todoIsDone"
              value={todoData.isDone}
              label={dict[languageState].isDone}
              onChange={(e) =>
                setTodoData({
                  ...todoData,
                  isDone: e.target.value === 'true',
                  data: { ...todoData.data },
                })
              }
            >
              <MenuItem value="true">{dict[languageState].done}</MenuItem>
              <MenuItem value="false">{dict[languageState].notDone}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <SearchDropDown setTodoData={setTodoData} company={todoCompany || ''} />
        <Button
          variant="outlined"
          className={styles.dropDownButton}
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
