import React, { useState } from 'react';
import {
  Paper,
  IconButton,
  Modal,
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import Box from '@mui/material/Box';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '../../hook';
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
  search: string,
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
    search: 'Поиск',
  },
  en: {
    name: 'Name',
    сompany: 'Company',
    email: 'Email',
    phone: 'Phone',
    search: 'Search',
  },
};
// ------------------------------------------------------------------

function ContactsListPage() {
  const { contacts } = useAppSelector((state) => state.data);
  const [renderContacts, setRenderContacts] = useState<FullContactData[]>(contacts);

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

  const inputSearch = (searchText: string) => {
    const searchName = contacts.filter(
      (el) => el.firstName?.toLowerCase().includes(searchText.toLowerCase()),
    );
    const searchPatronymic = contacts.filter(
      (el) => el.patronymic?.toLowerCase().includes(searchText.toLowerCase()),
    );
    const searchSurname = contacts.filter(
      (el) => el.surname?.toLowerCase().includes(searchText.toLowerCase()),
    );
    const searchMail = contacts.filter(
      (el) => el.mail?.toLowerCase().includes(searchText.toLowerCase()),
    );
    const searchCompanyName = contacts.filter(
      (el) => el.companyName?.toLowerCase().includes(searchText.toLowerCase()),
    );
    const tempState = Array.from(new Set(
      [...searchName, ...searchPatronymic, ...searchSurname, ...searchMail, ...searchCompanyName],
    ));
    setRenderContacts(tempState);
  };

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
        <div className={styles.search}>
          <div className={styles.searchRow}>
            <SearchIcon className={styles.searchIcon} />
            <input className={styles.searchInput} onInput={(event) => { inputSearch(event.currentTarget.value); }} placeholder={text[languageState].search} type="search" />
          </div>
        </div>
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
        {renderContacts && renderContacts.map((contact) => (
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
