import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hook';
import { fetchUsers } from '../../store/usersSlice';
import { RootState } from '../../store/store';
import { FullUserData } from '../../types/types';

function UsersListPage() {
  const { isAuth } = useSelector((state: RootState) => state.authorization);
  const { users } = useSelector((state: RootState) => state.users);
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
