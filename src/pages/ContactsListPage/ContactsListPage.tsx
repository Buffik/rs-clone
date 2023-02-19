import React, { useState } from 'react';
import {
  Paper,
  IconButton,
  Modal,
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useAppSelector } from '../../hook';
import LoadingSpinner from '../../components/UI/Spinner/LoadingSpinner';
import styles from './ContactsListPage.module.scss';

function ContactsListPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

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
        <div className={styles.modalContent}>
          add contacts
        </div>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modalWrapper}
      >
        <div className={styles.modalContent}>
          edit contacts
        </div>
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
          <div className={styles.contactBox}>
            <div className={styles.divider} />
            { /* eslint-disable-next-line no-underscore-dangle */}
            <div key={contact._id} className={styles.row}>
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
