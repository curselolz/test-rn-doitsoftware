import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export const BASE_URL = 'https://testapi.doitserver.in.ua/api';

const checkAsyncStorageToken = () => {
  AsyncStorage.getItem('authToken')
    .then(value => {
      if (value !== null) {
        setAxiosDefaults(value);
      }
    })
    .catch(err => console.log(err));
};

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
