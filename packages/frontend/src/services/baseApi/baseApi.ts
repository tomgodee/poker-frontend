import axios from 'axios';

const baseService = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
});

// baseService.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

export default baseService;
