import axios from 'axios';
import {createEffect} from 'effector';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL, setAxiosDefaults} from '../../../config';

export const getData = createEffect('Fetch data');
export const loginUser = createEffect('Add new user');

loginUser.use(data => {
  return axios({
    ...axios.defaults,
    method: 'post',
    data: {
      email: data[0].value,
      password: data[1].value,
    },
    url: `${BASE_URL}/auth`,
  });
});

loginUser.done.watch(({result}) => {
  if (result && result.data.token) {
    setAxiosDefaults(result.data.token);
    AsyncStorage.setItem('authToken', JSON.stringify(result.data.token));
  }
});

loginUser.fail.watch(({error, params}) => {
  console.error(error); // rejected value
  console.log('//////');
});
