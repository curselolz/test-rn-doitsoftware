import {createEffect} from 'effector';
import axios from 'axios';

const addTaskEffect = createEffect('add task');

addTaskEffect.use(dataToAdd => {
  return axios({
    ...axios.defaults,
    url: '/tasks',
    method: 'post',
    data: {
      title: dataToAdd[0].value,
      dueBy: Math.round(
        new Date(`August ${Math.floor(Math.random() * Math.floor(30))}, 2020 03:24:00`).getTime() /
          1000
      ),
      priority: dataToAdd[1].value,
      description: dataToAdd[2].value,
    },
  });
});

addTaskEffect.done.watch(({ result }) => {
  console.log(result);
});

addTaskEffect.fail.watch(({ error, params }) => {
  console.error(error);
});

export default addTaskEffect;
