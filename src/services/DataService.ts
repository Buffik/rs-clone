import { AxiosResponse } from 'axios';
import api from '../api/api';
import { DataResponse } from '../types/types';

export default class DataService {
  static async fetchData(): Promise<AxiosResponse<DataResponse>> {
    return api.get<DataResponse>('/all');
  }
}
