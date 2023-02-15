/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService, { AuthResponse, IUser, LoginData } from '../services/AuthService';
import UsersService, { UserData } from '../services/UsersService';
import { API_URL } from '../api/api';

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  // eslint-disable-next-line no-unused-vars
  async (_, { rejectWithValue }) => {
    try {
      const response = await UsersService.fetchUsers();
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return [];
    }
  },
);

export const logIn = createAsyncThunk(
  'todos/logIn',
  // eslint-disable-next-line consistent-return
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(loginData);
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
};

const authorizationSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    user: emptyUser as IUser,
    isLoading: false,
    error: '',
    users: [] as UserData[],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      })

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
        state.users = [];
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

// export const { changeUser } = authorizationSlice.actions;

export default authorizationSlice.reducer;
