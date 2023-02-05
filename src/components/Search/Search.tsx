import React from 'react';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Search.module.scss';

function Search() {
  return (
    <Paper className={styles.search} elevation={12}>
      <div className={styles.searchRow}>
        <SearchIcon className={styles.searchIcon} />
        <input className={styles.searchInput} placeholder="Search" type="search" />
      </div>
    </Paper>
  );
}

export default Search;
