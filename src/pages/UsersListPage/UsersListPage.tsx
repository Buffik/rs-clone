import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchUsers } from '../../store/usersSlice';
import { FullUserData } from '../../types/types';

function UsersListPage() {
  const { isAuth } = useAppSelector((state) => state.authorization);
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>{isAuth && 'Users'}
      {users.map((user: FullUserData) => (
        // eslint-disable-next-line no-underscore-dangle
        <p key={user._id}>{`${user.data.mail}, ${user.role}`}</p>
      ))}
    </div>
  );
}

export default UsersListPage;
