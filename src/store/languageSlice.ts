import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: 'ru',
  },
  reducers: {
    changeLanguage(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
