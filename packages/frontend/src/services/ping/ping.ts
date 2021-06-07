import baseService from '../baseApi';

function ping(): any {
  return baseService.get('/ping');
}

export default {
  ping,
};
