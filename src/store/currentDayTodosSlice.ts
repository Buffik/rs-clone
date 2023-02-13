/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Todos } from '../types/types';

const CURRENT_DAY_TODOS =
  'http://localhost:5000/todos?range=day&date=2023-02-09';

export const fetchCurrentDayTodos = createAsyncThunk<Todos, undefined>(
  'todos/fetchCurrentDayTodos',
  async () => {
    const response = await axios.get(CURRENT_DAY_TODOS);

    const { data } = response;

    return data;
  },
);

const currentDayTodosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: {},
    loading: false,
    error: null,
  },
  reducers: {
    getCurrentDayTodos(state, action) {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentDayTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentDayTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export const { getCurrentDayTodos } = currentDayTodosSlice.actions;

export default currentDayTodosSlice.reducer;
