import { AxiosResponse } from 'axios';
import baseService from '../baseApi';
import { Room } from '../../types/room';

export const BASE_URL = '/room';

function getAll(): Promise<AxiosResponse<Room[]>> {
  return baseService.get(`${BASE_URL}`);
}

function getOne(id: number): Promise<AxiosResponse<Room>> {
  return baseService.get(`${BASE_URL}/${id}`);
}

export default {
  getAll,
  getOne,
};
