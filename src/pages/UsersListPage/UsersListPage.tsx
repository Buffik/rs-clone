import React from 'react';
import { useAppSelector } from '../../hook';
import { FullUserData } from '../../types/types';

function UsersListPage() {
  const { isAuth } = useAppSelector((state) => state.authorization);
  const { users } = useAppSelector((state) => state.data);

  return (
    <div>{isAuth && 'Users'}
      {users && users.map((user: FullUserData) => (
        // eslint-disable-next-line no-underscore-dangle
        <p key={user._id}>{`${user.data.mail}, ${user.role}`}</p>
      ))}
    </div>
  );
}

export default UsersListPage;
