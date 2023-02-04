import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorizationSlice';
import languageReducer from './languageSlice';

const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    language: languageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
