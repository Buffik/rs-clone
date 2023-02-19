import React from 'react';
import {
  Paper,
  IconButton,
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useAppSelector } from '../../hook';
import LoadingSpinner from '../../components/UI/Spinner/LoadingSpinner';
import styles from './ContactsListPage.module.scss';

const addContact = () => {
  console.log('new Contact');
};

const editContact = () => {
  console.log('edit contact');
};

function ContactsListPage() {
  const { contacts } = useAppSelector((state) => state.data);
  console.log(contacts);

  if (!contacts.length && contacts) {
    return <LoadingSpinner />;
  }

  return (
    <Paper elevation={4} className={styles.contactsListPage}>
      <div className={styles.topRow}>
        <div className={styles.topName}>Name</div>
        <div className={styles.topCompanyName}>Company name</div>
        <div className={styles.topMail}>Email</div>
        <div className={styles.topPhone}>Phone</div>
        <div className={styles.topBtn}>
          <IconButton onClick={addContact}>
            <ControlPointIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div className={styles.divider} />
      {contacts && contacts.map((contact) => (
        // eslint-disable-next-line no-underscore-dangle
        <div key={contact._id} className={styles.row}>
          {/* eslint-disable-next-line max-len */}
          <div className={styles.name}>{contact.firstName} {contact.surname} {contact.patronymic}</div>
          <div className={styles.companyName}>{contact.companyName}</div>
          <div className={styles.mail}>{contact.mail}</div>
          <div className={styles.phone}>{contact.phone}</div>
          <div className={styles.btn}>
            <IconButton onClick={editContact}>
              <ModeIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </Paper>
  );
}

export default ContactsListPage;
