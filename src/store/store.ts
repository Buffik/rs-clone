import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorizationSlice';

const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
