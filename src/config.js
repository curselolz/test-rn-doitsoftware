import axios from 'axios';

export const BASE_URL = 'https://testapi.doitserver.in.ua/api';

export const setAxiosDefaults = token => {
  axios.defaults = {
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'http://localhost:8081',
      'Content-Type': 'application/json',
      Authorization: token !== null && token !== undefined && `Bearer ${token}`,
    },
  };
};
