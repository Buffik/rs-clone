import React, { useState } from 'react';
import {
  Paper,
  IconButton,
  Modal,
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import Box from '@mui/material/Box';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useAppSelector } from '../../hook';
import LoadingSpinner from '../../components/UI/Spinner/LoadingSpinner';
import AddContactModal from './AddContactModal/AddContactModal';
import EditContactModal from './EditContactModal/EditContactModal';
import styles from './ContactsListPage.module.scss';
import { FullContactData } from '../../types/types';

// --------------------------------------------------------------
interface TextKey {
  name: string;
  сompany: string;
  email: string;
  phone: string;
}
interface Text {
  [key: string]: TextKey;
}
const text: Text = {
  ru: {
    name: 'Имя',
    сompany: 'Компания',
    email: 'Почта',
    phone: 'Телефон',
  },
  en: {
    name: 'Name',
    сompany: 'Company',
    email: 'Email',
    phone: 'Phone',
  },
};
// ------------------------------------------------------------------

function ContactsListPage() {
  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedContact, setSelectedContact] = useState<undefined | FullContactData>(undefined);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setSelectedContact(undefined);
  };
  const handleOpenEdit = (contact: FullContactData) => {
    setSelectedContact(contact);
    setOpenAdd(true);
  };

  const { contacts } = useAppSelector((state) => state.data);

  if (!contacts.length && contacts) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modalWrapper}
      >
        <Box>
          {selectedContact
            ? (
              <div>
                <EditContactModal setOpenAdd={setOpenAdd} selectedContact={selectedContact} />
              </div>
            )
            : <AddContactModal setOpenAdd={setOpenAdd} />}
        </Box>
      </Modal>

      <Paper elevation={4} className={styles.contactsListPage}>
        <div className={styles.topRow}>
          <div className={styles.topName}>{text[languageState].name}</div>
          <div className={styles.topCompanyName}>{text[languageState].сompany}</div>
          <div className={styles.topMail}>{text[languageState].email}</div>
          <div className={styles.topPhone}>{text[languageState].phone}</div>
          <div className={styles.topBtn}>
            <IconButton onClick={handleOpenAdd}>
              <ControlPointIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        {contacts && contacts.map((contact) => (
          <div key={Math.random()} className={styles.contactBox}>
            <div className={styles.divider} />
            <div className={styles.row}>
              {/* eslint-disable-next-line max-len */}
              <div className={styles.name}>{contact.firstName} {contact.surname} {contact.patronymic}</div>
              <div className={styles.companyName}>{contact.companyName}</div>
              <div className={styles.mail}>{contact.mail}</div>
              <div className={styles.phone}>{contact.phone}</div>
              <div className={styles.btn}>
                <IconButton onClick={() => { handleOpenEdit(contact); }}>
                  <ModeIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </Paper>
    </>
  );
}

export default ContactsListPage;
