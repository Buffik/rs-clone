import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorizationSlice';
import languageReducer from './languageSlice';
import currentDayTodosReducer from './currentDayTodosSlice';
import dataReducer from './dataSlice';

const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    language: languageReducer,
    currentDayTodos: currentDayTodosReducer,
    data: dataReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
