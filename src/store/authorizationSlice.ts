import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
  },
  reducers: {
    changeUser(state, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
  },
});

export const { changeUser } = authorizationSlice.actions;

export default authorizationSlice.reducer;
