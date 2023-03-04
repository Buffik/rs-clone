import React from 'react';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '../../hook';
import styles from './Search.module.scss';

function Search() {
  // global state -----------------------------------------
  // language
  const languageState: string = useAppSelector((state) => state.data.language);
  // --------------------------------------------------------------
  interface TextKey {
    search: string,
  }
  interface Text {
    [key: string]: TextKey
  }
  const text: Text = {
    ru: {
      search: 'Поиск',
    },
    en: {
      search: 'Search',
    },
  };
  // ------------------------------------------------------------------
  return (
    <Paper className={styles.search} elevation={5}>
      <div className={styles.searchRow}>
        <SearchIcon className={styles.searchIcon} />
        <input className={styles.searchInput} placeholder={text[languageState].search} type="search" />
      </div>
    </Paper>
  );
}

export default Search;
