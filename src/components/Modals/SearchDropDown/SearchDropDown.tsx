/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hook';
import { TodoFromClient } from '../../../types/types';
import styles from './SearchDropDown.module.scss';

interface ITextData {
  company: string;
}

interface ILanguage {
  [key: string]: ITextData;
}

const dict: ILanguage = {
  ru: {
    company: 'Введите название компании',
  },
  en: {
    company: 'Inter company name',
  },
};

interface ISearchDropDown {
  setTodoData: React.Dispatch<React.SetStateAction<TodoFromClient>>;
}

function SearchDropDown({ setTodoData }: ISearchDropDown) {
  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );
  const companies = useAppSelector((state) => state.allClients.allClients);

  const [value, setValue] = useState('');
  const [isOnFocus, setIsOnFocus] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm: string) => {
    setValue(searchTerm);
  };

  return (
    <div
      className={styles.search}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsOnFocus(false);
      }}
    >
      <div className={styles.searchContainer}>
        <div className={styles.searchInner}>
          <TextField
            onFocus={() => setIsOnFocus(true)}
            placeholder={dict[languageState].company}
            label={dict[languageState].company}
            variant="outlined"
            type="text"
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={styles.searchDropdown}>
          {value
            ? isOnFocus &&
              companies
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const companyName = item.data.companyName.toLowerCase();
                  return searchTerm && companyName.startsWith(searchTerm);
                })
                .slice(0, 5)
                .map((item) => (
                  <button
                    type="button"
                    onClick={() => {
                      onSearch(item.data.companyName);
                      setIsOnFocus(false);
                      setTodoData((prev) => ({
                        ...prev,
                        company: item._id,
                        data: {
                          ...prev.data,
                        },
                      }));
                    }}
                    className={styles.searchDropdownRow}
                    key={item._id}
                  >
                    {item.data.companyName}
                  </button>
                ))
            : isOnFocus &&
              companies.slice(0, 5).map((item) => (
                <button
                  type="button"
                  onClick={() => {
                    onSearch(item.data.companyName);
                    setIsOnFocus(false);
                    setTodoData((prev) => ({
                      ...prev,
                      company: item._id,
                      data: {
                        ...prev.data,
                      },
                    }));
                  }}
                  className={styles.searchDropdownRow}
                  key={item._id}
                >
                  {item.data.companyName}
                </button>
              ))}
        </div>
      </div>
    </div>
  );
}

export default SearchDropDown;
