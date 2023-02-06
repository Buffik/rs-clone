import React from 'react';
import { Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <Paper elevation={5} className={styles.footer}>
      <div className={styles.footerRow}>
        <a href="https://rs.school/js/" className={styles.link} target="_blank" rel="noreferrer">
          <div className={styles.rsslogo} />
        </a>
        CRM-Sales 2023
        <a href="https://github.com/olegpl1993" className={styles.link} target="_blank" rel="noreferrer">
          <GitHubIcon />
        </a>
        <a href="https://github.com/Buffik" className={styles.link} target="_blank" rel="noreferrer">
          <GitHubIcon />
        </a>
        <a href="https://github.com/dinara-n" className={styles.link} target="_blank" rel="noreferrer">
          <GitHubIcon />
        </a>
      </div>
    </Paper>
  );
}

export default Footer;
