import React, { useEffect, useState } from 'react';
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
import styles from './UsersListPage.module.scss';
import { FullUserData } from '../../types/types';
import AddUserModal from './AddUsersModal/AddUserModal';
import LoadingSpinner from '../../components/UI/Spinner/LoadingSpinner';

// --------------------------------------------------------------
interface TextKey {
  name: string;
  role: string;
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
    role: 'Роль',
    email: 'Почта',
    phone: 'Телефон',
    search: 'Поиск',
  },
  en: {
    name: 'Name',
    role: 'Role',
    email: 'Email',
    phone: 'Phone',
    search: 'Search',
  },
};
// ------------------------------------------------------------------

function UsersListPage() {
  const { users } = useAppSelector((state) => state.data);
  console.log(users);
  const [renderUsers, setRenderUsers] = useState<FullUserData[]>(users);

  useEffect(() => {
    setRenderUsers(users);
  }, [users]);

  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );

  const [openAdd, setOpenAdd] = useState(false);
  const [selectedContact, setSelectedContact] = useState<undefined | FullUserData>(undefined);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setSelectedContact(undefined);
  };
  const handleOpenEdit = (contact: FullUserData) => {
    setSelectedContact(contact);
    setOpenAdd(true);
  };

  const inputSearch = (searchText: string) => {
    const searchName = users.filter(
      (el) => el.data.firstName?.toLowerCase().includes(searchText.toLowerCase()),
    );
    const searchPatronymic = users.filter(
      (el) => el.data.patronymic?.toLowerCase().includes(searchText.toLowerCase()),
    );
    const searchSurname = users.filter(
      (el) => el.data.surname?.toLowerCase().includes(searchText.toLowerCase()),
    );
    const searchMail = users.filter(
      (el) => el.data.mail?.toLowerCase().includes(searchText.toLowerCase()),
    );
    const tempState = Array.from(new Set(
      [...searchName, ...searchPatronymic, ...searchSurname, ...searchMail],
    ));
    setRenderUsers(tempState);
  };

  if (!users.length && users) {
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
                open edit modal
              </div>
            )
            : <AddUserModal setOpenAdd={setOpenAdd} />}
        </Box>
      </Modal>

      <Paper elevation={4} className={styles.usersListPage}>
        <div className={styles.search}>
          <div className={styles.searchRow}>
            <SearchIcon className={styles.searchIcon} />
            <input className={styles.searchInput} onInput={(event) => { inputSearch(event.currentTarget.value); }} placeholder={text[languageState].search} type="search" />
          </div>
        </div>
        <div className={styles.topRow}>
          <div className={styles.topName}>{text[languageState].name}</div>
          <div className={styles.topRole}>{text[languageState].role}</div>
          <div className={styles.topMail}>{text[languageState].email}</div>
          <div className={styles.topPhone}>{text[languageState].phone}</div>
          <div className={styles.topBtn}>
            <IconButton onClick={handleOpenAdd}>
              <ControlPointIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        {renderUsers && renderUsers.map((user) => (
          <div key={Math.random()} className={styles.userBox}>
            <div className={styles.divider} />
            <div className={styles.row}>
              {/* eslint-disable-next-line max-len */}
              <div className={styles.name}>{user.data.firstName} {user.data.surname} {user.data.patronymic}</div>
              <div className={styles.role}>{user.role}</div>
              <div className={styles.mail}>{user.data.mail}</div>
              <div className={styles.phone}>{user.data.phone}</div>
              <div className={styles.btn}>
                <IconButton onClick={() => { handleOpenEdit(user); }}>
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

export default UsersListPage;
