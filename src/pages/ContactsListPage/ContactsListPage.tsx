import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hook';
import { RootState } from '../../store/store';
import { FullContactData } from '../../types/types';
import { fetchContacts } from '../../store/contactsSlice';

function ContactsListPage() {
  const { isAuth } = useSelector((state: RootState) => state.authorization);
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  return (
    <div>{isAuth && 'Contacts'}
      {contacts.map((contact: FullContactData) => (
        // eslint-disable-next-line no-underscore-dangle
        <p key={contact._id}>{`${contact.surname} from ${contact.companyName}`}</p>
      ))}
    </div>
  );
}

export default ContactsListPage;
