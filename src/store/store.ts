import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorizationSlice';
import languageReducer from './languageSlice';
import currentDayTodosReducer from './currentDayTodosSlice';
import allClientsSlice from './allClientsSlice';
import usersReducer from './usersSlice';
import contactsReducer from './contactsSlice';
import dataReducer from './dataSlice';

const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    language: languageReducer,
    allClients: allClientsSlice,
    currentDayTodos: currentDayTodosReducer,
    users: usersReducer,
    contacts: contactsReducer,
    data: dataReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
