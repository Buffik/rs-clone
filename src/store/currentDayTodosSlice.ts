/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import TodosService from '../services/TodosService';
import {
  AddTodoRequest,
  AddTodoResponse,
  TodosByDayResponse,
} from '../types/types';

export const fetchCurrentDayTodos = createAsyncThunk<
  TodosByDayResponse,
  string,
  { rejectValue: string }
>('todos/fetchCurrentDayTodos', async (date, { rejectWithValue }) => {
  try {
    const response = await TodosService.fetchTodosByDay(date);
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

export const addTodo = createAsyncThunk(
  'todos/createTodo',
  async (data: AddTodoRequest, { rejectWithValue }) => {
    try {
      const response = await TodosService.addTodo(data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 404) {
          return rejectWithValue('incorrect');
        }
      }
      return rejectWithValue('unexpected');
    }
  },
);

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

const currentDayTodosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: {} as TodosByDayResponse,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentDayTodos.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchCurrentDayTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addTodo.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default currentDayTodosSlice.reducer;
