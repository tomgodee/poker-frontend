import axios from 'axios';

const baseService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 15000,
});

// baseService.defaults.headers.commom.Authorization = 'aaa';

export default baseService;
