import baseService from '../baseApi';

export const BASE_URL = '/user';

function updateMoney(id: number, money: number): any {
  return baseService.put(`${BASE_URL}/money`, {
    id,
    money,
  });
}

export default {
  updateMoney,
};
