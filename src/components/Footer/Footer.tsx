import React from 'react';
import { Paper } from '@mui/material';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <Paper elevation={5} className={styles.footer}>
      <div className={styles.footerRow}>
        CRM-Sales 2023
      </div>
    </Paper>
  );
}

export default Footer;
