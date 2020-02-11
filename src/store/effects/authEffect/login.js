import axios from 'axios';
import {createEffect} from 'effector';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL, setAxiosDefaults} from '../../../config';
import { errorHandling } from '../../events';

export const getData = createEffect('Fetch data');
export const loginUser = createEffect('Add new user');

loginUser.use(dataObj => {
  return axios({
    method: 'post',
    data: {
      email: dataObj.data[0].value,
      password: dataObj.data[1].value,
    },
    url: `${BASE_URL}/auth`,
  })
    .then(res => {
      if (res && res.data.token) {
        errorHandling(false);
        setAxiosDefaults(res.data.token);
        AsyncStorage.setItem('authToken', JSON.stringify(res.data.token));
        dataObj.nav.navigate('Home');
      }
    })
    .catch(err => errorHandling(true));
});

// loginUser.done.watch(({result}) => {
// });

// loginUser.fail.watch(({error, params}) => {
//   // console.error(error);
//   errorHandling(true);
// });
