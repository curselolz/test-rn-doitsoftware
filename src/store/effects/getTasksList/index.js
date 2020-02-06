import {createEffect} from 'effector';
import axios from 'axios';
import {finishRefresh, fillData} from '../../events';

const getTasksList = createEffect('get lists');

getTasksList.use(() => {
  return axios({
    ...axios.defaults,
    method: 'get',
    url: '/tasks?sort=title%20asc',
  });
});

getTasksList.done.watch(({result}) => {
  fillData(result && result.data.tasks);
  finishRefresh();
});

getTasksList.fail.watch(({error, params}) => {
  console.error(params);
  console.error(error);
});

export default getTasksList;
