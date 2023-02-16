/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ContactsService from '../services/ContactsService';
import {
  FullContactData,
} from '../types/types';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  // eslint-disable-next-line no-unused-vars
  async (_, { rejectWithValue }) => {
    try {
      const response = await ContactsService.fetchContacts();
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return [];
    }
  },
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    isLoading: false,
    error: '',
    contacts: [] as FullContactData[],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      });
  },
});

export default contactsSlice.reducer;
