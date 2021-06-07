import baseService from '../baseApi';
import { LoginFormInputs } from '../../pages/Login/types';

const BASE_URL = 'user';

function login(data: LoginFormInputs): any {
  return baseService.post(`/${BASE_URL}/login`, data);
}

function verify(token: string): any {
  return baseService.get(`/${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default {
  login,
  verify,
};
