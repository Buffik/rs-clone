import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { FullContactData } from '../../types/types';
import { fetchContacts } from '../../store/contactsSlice';

function ContactsListPage() {
  const { isAuth } = useAppSelector((state) => state.authorization);
  const { contacts } = useAppSelector((state) => state.contacts);
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
