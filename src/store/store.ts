import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorizationSlice';
import languageReducer from './languageSlice';
import currentDayTodosReducer from './currentDayTodosSlice';
import allClientsSlice from './allClientsSlice';

const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    language: languageReducer,
    allClients: allClientsSlice,
    currentDayTodos: currentDayTodosReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
