import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Modal,
  Paper,
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import ModeIcon from '@mui/icons-material/Mode';
import { useAppSelector } from '../../hook';
import { FullClientData } from '../../types/types';
import styles from './ClientsListPage.module.scss';
import EditClientModal from './EditClientModal/EditClientModal';
import AddClientModal from './AddClientModal/AddClientModal';

// --------------------------------------------------------------
interface TextKey {
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
    сompany: 'Компания',
    email: 'Почта',
    phone: 'Телефон',
    search: 'Поиск',
  },
  en: {
    сompany: 'Company',
    email: 'Email',
    phone: 'Phone',
    search: 'Search',
  },
};
// ------------------------------------------------------------------

function ClientsListPage() {
  const { clients } = useAppSelector((state) => state.data);
  const [renderClients, setRenderClients] = useState<FullClientData[]>(clients);

  const languageState: string = useAppSelector(
    (state) => state.language.language,
  );

  const [openAdd, setOpenAdd] = useState(false);
  const [selectedClient, setSelectedClient] = useState<undefined | FullClientData>(undefined);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setSelectedClient(undefined);
  };
  const handleOpenEdit = (contact: FullClientData) => {
    setSelectedClient(contact);
    setOpenAdd(true);
  };

  const inputSearch = (searchText: string) => {
    console.log(searchText);
    // console.log(clients);
    const searchArr = clients.filter(
      (el) => el.data.companyName.toLowerCase().includes(searchText.toLowerCase()),
    );
    setRenderClients(searchArr);
    console.log(renderClients);
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
          {selectedClient
            ? (
              <div>
                <EditClientModal setOpenAdd={setOpenAdd} selectedClient={selectedClient} />
              </div>
            )
            : <AddClientModal setOpenAdd={setOpenAdd} />}
        </Box>
      </Modal>

      <Paper elevation={4} className={styles.clientListPage}>
        <div className={styles.search}>
          <div className={styles.searchRow}>
            <SearchIcon className={styles.searchIcon} />
            <input className={styles.searchInput} onInput={(event) => { inputSearch(event.currentTarget.value); }} placeholder={text[languageState].search} type="search" />
          </div>
        </div>
        <div className={styles.topRow}>
          <div className={styles.topCompanyName}>{text[languageState].сompany}</div>
          <div className={styles.topMail}>{text[languageState].email}</div>
          <div className={styles.topPhone}>{text[languageState].phone}</div>
          <div className={styles.topBtn}>
            <IconButton onClick={handleOpenAdd}>
              <ControlPointIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        {renderClients && renderClients.map((client: FullClientData) => (
          <div key={Math.random()} className={styles.contactBox}>
            <div className={styles.divider} />
            <div className={styles.row}>
              {/* eslint-disable-next-line max-len */}
              <div className={styles.companyName}>{client.data.companyName}</div>
              <div className={styles.mail}>{client.contacts?.commonMail}</div>
              <div className={styles.phone}>{client.contacts?.commonPhone}</div>
              <div className={styles.btn}>
                <IconButton onClick={() => { handleOpenEdit(client); }}>
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

export default ClientsListPage;
