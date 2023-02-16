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
import axios, { AxiosError } from 'axios';
import { TodoFromClient, Todos } from '../types/types';

const CURRENT_DAY_TODOS =
  'http://localhost:5000/todos?range=day&date=2023-02-12';

export const fetchCurrentDayTodos = createAsyncThunk<
  Todos,
  undefined,
  { rejectValue: string }
>('todos/fetchCurrentDayTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(CURRENT_DAY_TODOS);
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

// export const addTodo = createAsyncThunk<
//   TodoFromClient,
//   undefined,
//   { rejectValue: string }
// >('todos/createTodo', async (data, { rejectValue }) => {
//   try {
//     const response = axios.post
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       if (error.response?.status === 400 || error.response?.status === 404) {
//         return rejectWithValue('incorrect');
//       }
//     }
//     return rejectWithValue('unexpected');
//   }
// });

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

const currentDayTodosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: {} as Todos,
    loading: false,
    error: '',
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
        state.error = '';
      })
      .addCase(fetchCurrentDayTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { getCurrentDayTodos } = currentDayTodosSlice.actions;

export default currentDayTodosSlice.reducer;
