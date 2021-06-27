import { AxiosResponse } from 'axios';
import baseService from '../baseApi';
import { Room } from '../../types/room';

function getAll(): Promise<Room[]> {
  return baseService.get('/room');
}

function getOne(id: number): Promise<AxiosResponse<Room>> {
  return baseService.get(`/room/${id}`);
}

export default {
  getAll,
  getOne,
};
