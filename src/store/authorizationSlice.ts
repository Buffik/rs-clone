/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import AuthService from '../services/AuthService';
import { API_URL } from '../api/api';
import {
  ProfileData,
  AuthResponse,
  LoginRequest,
} from '../types/types';

export const logIn = createAsyncThunk(
  'todos/logIn',
  async (loginData: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(loginData);
      localStorage.setItem('token', response.data.accessToken);
      const { data } = response;
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 404) {
          return rejectWithValue('incorrect');
        }
      }
      return rejectWithValue('unexpected');
    }
  },
);

export const logOut = createAsyncThunk(
  'todos/logOut',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const checkAuth = createAsyncThunk(
  'todos/checkAuth',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      const { data } = response;
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

const emptyUser = {
  _id: '',
  role: '',
  data: {
    mail: '',
    firstName: '',
    patronymic: '',
    surname: '',
    birthday: '',
    phone: '',
  },
  settings: {
    language: '',
  },
};

const authorizationSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    user: emptyUser as ProfileData,
    isLoading: false,
    error: '',
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder

      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuth = true;
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      })

      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.error = '';
        state.user = emptyUser;
        state.isAuth = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      })

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuth = true;
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      });
  },
});

export default authorizationSlice.reducer;
