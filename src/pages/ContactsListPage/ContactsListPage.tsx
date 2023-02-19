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
import styles from './ContactsListPage.module.scss';

function ContactsListPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setEdit(false);
    setOpenAdd(false);
  };
  const handleOpenEdit = () => {
    setEdit(true);
    setOpenAdd(true);
  };

  const { contacts } = useAppSelector((state) => state.data);
  console.log(contacts);

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
          {edit ? <div>edit contacts</div> : <AddContactModal />}
        </Box>
      </Modal>

      <Paper elevation={4} className={styles.contactsListPage}>
        <div className={styles.topRow}>
          <div className={styles.topName}>Name</div>
          <div className={styles.topCompanyName}>Company name</div>
          <div className={styles.topMail}>Email</div>
          <div className={styles.topPhone}>Phone</div>
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
                <IconButton onClick={handleOpenEdit}>
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
