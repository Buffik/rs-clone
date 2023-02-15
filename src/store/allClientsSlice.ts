/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Companies } from '../types/types';

const ALL_COMPANIES = 'http://localhost:5000/companies';

export const fetchAllClients = createAsyncThunk<Companies[], undefined>(
  'allClients/fetchAllClients',
  async () => {
    const response = await axios.get(ALL_COMPANIES);

    return response.data;
  },
);

const allClientsSlice = createSlice({
  name: 'allClients',
  initialState: {
    allClients: [] as Companies[],
    loading: false,
    error: null,
  },
  reducers: {
    getAllClients(state, action) {
      state.allClients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllClients.fulfilled, (state, action) => {
        state.allClients = action.payload;
        state.loading = false;
      });
  },
});

export const { getAllClients } = allClientsSlice.actions;

export default allClientsSlice.reducer;
