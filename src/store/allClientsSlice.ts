/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ClientsService from '../services/ClientsService';
import { FullClientData } from '../types/types';

export const fetchAllClients = createAsyncThunk<
  FullClientData[],
  undefined,
  { rejectValue: string }
>('allClients/fetchAllClients', async (_, { rejectWithValue }) => {
  try {
    const response = await ClientsService.fetchClients();

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        return rejectWithValue('incorrect');
      }
    }
    return rejectWithValue('unexpected');
  }
});

const allClientsSlice = createSlice({
  name: 'allClients',
  initialState: {
    allClients: [] as FullClientData[],
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
