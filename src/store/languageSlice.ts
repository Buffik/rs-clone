import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Languages } from '../types/types';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: Languages.En,
  },
  reducers: {
    changeLanguage(state, action: PayloadAction<Languages>) {
      // eslint-disable-next-line no-param-reassign
      state.language = action.payload;
    },
  },
});

// export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
