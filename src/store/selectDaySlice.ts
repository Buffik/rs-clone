import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const selectedDaySlice = createSlice({
  name: 'selectDay',
  initialState: {
    selectedDay: '',
  },
  reducers: {
    selectDay(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.selectedDay = action.payload;
    },
  },
});

export const { selectDay } = selectedDaySlice.actions;

export default selectedDaySlice.reducer;
