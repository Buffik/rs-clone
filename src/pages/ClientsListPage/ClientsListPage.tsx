// import React, { useEffect } from 'react';
import { useAppSelector } from '../../hook';
import { FullClientData } from '../../types/types';

function ClientsListPage() {
  const { isAuth } = useAppSelector((state) => state.authorization);
  const { clients } = useAppSelector((state) => state.data);

  return (
    <div>{isAuth && 'Clients'}
      {clients && clients.map((client: FullClientData) => (
        // eslint-disable-next-line no-underscore-dangle
        <p key={client._id}>{`Company name: ${client.data.companyName}`}</p>
      ))}
    </div>
  );
}

export default ClientsListPage;
