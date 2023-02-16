import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hook';
import { fetchUsers } from '../../store/authorizationSlice';
import { RootState } from '../../store/store';
import { FullUserData } from '../../types/types';

function TasksPage() {
  const { isAuth } = useSelector((state: RootState) => state.authorization);
  const { users, user } = useSelector((state: RootState) => state.authorization);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>{isAuth && `TasksPage for ${user.data.mail}, ${user.role}`}
      {users.map((userItem: FullUserData) => (
        // eslint-disable-next-line no-underscore-dangle
        <p key={userItem._id}>{userItem.data.mail}</p>
      ))}
    </div>
  );
}

export default TasksPage;
