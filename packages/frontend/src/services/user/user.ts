import { AxiosResponse } from 'axios';
import baseService from '../baseApi';
import { ACCESS_TOKEN } from '../../config/localStorage';
import type { Profile as ProfileInterface } from '../../types/user';

export const BASE_URL = '/user';

function updateMoney(id: number, money: number): any {
  return baseService.put(`${BASE_URL}/money`, {
    id,
    money,
  });
}

const getOne = (id: number): Promise<AxiosResponse<ProfileInterface>> => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return baseService.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  updateMoney,
  getOne,
};
