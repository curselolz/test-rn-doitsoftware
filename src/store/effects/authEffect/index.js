import axios from 'axios';
import {createEffect} from 'effector';
import AsyncStorage from '@react-native-community/async-storage';

import {BASE_URL, setAxiosDefaults} from '../../../config';
import { errorHandling } from '../../events';

export const getData = createEffect('Fetch data');
export const addNewUser = createEffect('Add new user');

addNewUser.use(dataWithNav => {
  return axios({
    method: 'post',
    data: {
      email: dataWithNav.data[0].value,
      password: dataWithNav.data[2].value,
    },
    url: `${BASE_URL}/users`,
  })
    .then(res => {
      if (res && res.data.token) {
        errorHandling(false);
        setAxiosDefaults(res.data.token);
        AsyncStorage.setItem('authToken', JSON.stringify(res.data.token));
        dataWithNav.nav.navigate('Home');
      }
    })
    .catch(err => errorHandling(true));
});

addNewUser.done.watch(({result}) => {
  // if (result && result.data.token) {
  //   setAxiosDefaults(result.data.token);
  //   AsyncStorage.setItem('authToken', JSON.stringify(result.data.token));
  // }
});

addNewUser.fail.watch(({error}) => {
  console.error(error);
  if (error) {
    errorHandling(false);
  }
});
