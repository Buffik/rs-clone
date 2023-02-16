/* eslint-disable no-param-reassign */
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UsersService from '../services/UsersService';
import {
  FullUserData,
} from '../types/types';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
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

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    error: '',
    users: [] as FullUserData[],
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

      .addMatcher(isError, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      });
  },
});

export default usersSlice.reducer;
