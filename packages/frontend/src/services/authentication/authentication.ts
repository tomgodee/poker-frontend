import baseService from '../baseApi';
import { LoginFormInputs } from '../../pages/Login/types';

const BASE_URL = 'user';

function login(data: LoginFormInputs): any {
  return baseService.post(`/${BASE_URL}/login`, data);
}

export default {
  login,
};
