import axios from 'axios';

const baseService = axios.create({
  baseURL: 'http://localhost:2000/',
  timeout: 5000,
});

// baseService.defaults.headers.commom.Authorization = 'aaa';

export default baseService;
