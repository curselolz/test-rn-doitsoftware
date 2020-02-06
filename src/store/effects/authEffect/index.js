import axios from 'axios';
import {createEffect} from 'effector';
import AsyncStorage from '@react-native-community/async-storage';

import {BASE_URL, setAxiosDefaults} from '../../../config';

export const getData = createEffect('Fetch data');
export const addNewUser = createEffect('Add new user');

addNewUser.use(data => {
  // return axios(url + '/users', { email: data[0].value, password: data[2].value })
  return axios({
    method: 'post',
    data: {
      email: data[0].value,
      password: data[2].value,
    },
    url: `${BASE_URL}/users`,
  });
});

addNewUser.done.watch(({result}) => {
  if (result && result.data.token) {
    setAxiosDefaults(result.data.token);
    AsyncStorage.setItem('authToken', JSON.stringify(result.data.token));
  }
});

addNewUser.fail.watch(({error}) => {
  console.error(error);
});
