import { AxiosResponse } from 'axios';
import api from '../api/api';
import {
  AddTodoRequest,
  AddTodoResponse,
  FullTodoData,
  ShortTodoData,
  TodosByDayResponse,
  TodosCount,
  UpdateTodoResponse,
} from '../types/types';

export default class TodosService {
  static async addTodo(
    data: AddTodoRequest,
  ): Promise<AxiosResponse<AddTodoResponse>> {
    return api.post<AddTodoResponse>('/todos', data);
  }

  static async updateTodo(
    data: AddTodoRequest,
    id: string,
  ): Promise<AxiosResponse<UpdateTodoResponse>> {
    return api.patch<UpdateTodoResponse>(`/todos/${id}`, data);
  }

  static async fetchTodo(id: string): Promise<AxiosResponse<ShortTodoData>> {
    return api.get<ShortTodoData>(`/todos/${id}`);
  }

  static async fetchTodos(): Promise<AxiosResponse<FullTodoData[]>> {
    return api.get<FullTodoData[]>('/todos');
  }

  static async fetchTodosByDay(
    date: string,
    user = '',
  ): Promise<AxiosResponse<TodosByDayResponse>> {
    return api.get<TodosByDayResponse>(`/todos?range=day&date=${date}&user=${user}`);
  }

  static async fetchTodosByMonth(
    date: string,
    user = '',
  ): Promise<AxiosResponse<TodosCount[]>> {
    return api.get<TodosCount[]>(`/todos?range=month&date=${date}&user=${user}`);
  }
}
