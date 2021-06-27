import baseService from '../baseApi';
import { LoginForm } from '../../types/user';

const BASE_URL = 'user';

function login(data: LoginForm): any {
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
