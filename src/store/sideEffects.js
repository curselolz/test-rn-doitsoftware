import axios from 'axios';
// import { getData, addNewUser } from './events';
import { createEffect } from 'effector';

export const getData = createEffect('Fetch data');
export const addNewUser = createEffect('Add new user');
import { url } from '../config';

addNewUser.use((data) => axios({
  method: 'post',
  url: url + '/users',
  data: {
    email: data[0].value,
    password: data[2].value
  }
  })
);

addNewUser.done.watch(({ result, params }) => {
  console.log(params) // {id: 1}
  console.log(result) // resolved value
  console.log('......')
})

addNewUser.fail.watch(({ error, params }) => {
  console.error(params) // {id: 1}
  console.error(error) // rejected value
  console.log('//////')
})

export const fetchUser = createEffect('fetch user')
// Use async function
fetchUser.use(params => {
  return fetch(`http://example.com/user/`)
})

// .done event is called on resolve
fetchUser.done.watch(({ result, params }) => {
  console.log(params) // {id: 1}
  console.log(result) // resolved value
})

// .fail event is called on reject (or throw)
fetchUser.fail.watch(({ error, params }) => {
  console.error(params) // {id: 1}
  console.error(error) // rejected value
})
