// import React, { useEffect } from 'react';
import { useAppSelector } from '../../hook';
import { FullContactData } from '../../types/types';

function ContactsListPage() {
  const { isAuth } = useAppSelector((state) => state.authorization);
  const { contacts } = useAppSelector((state) => state.data);

  return (
    <div>{isAuth && 'Contacts'}
      {contacts && contacts.map((contact: FullContactData) => (
        // eslint-disable-next-line no-underscore-dangle
        <p key={contact._id}>{`${contact.surname} from ${contact.companyName}`}</p>
      ))}
    </div>
  );
}

export default ContactsListPage;
