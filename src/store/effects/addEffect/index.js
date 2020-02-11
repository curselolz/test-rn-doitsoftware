import {createEffect} from 'effector';
import axios from 'axios';
import {errorHandling, waitingHandler} from '../../events';

const addTaskEffect = createEffect('add task');

addTaskEffect.use(dataToAdd => {
  console.log(dataToAdd)
  return axios({
    ...axios.defaults,
    url: '/tasks',
    method: 'post',
    data: {
      title: dataToAdd.data[0].value,
      dueBy: Math.round(
        new Date(`August ${Math.floor(Math.random() * Math.floor(30))}, 2020 03:24:00`).getTime() /
          1000
      ),
      priority: dataToAdd.data[1].value,
      description: dataToAdd.data[2].value,
    },
  })
    .then(res => {
      if (res) {
        errorHandling(false);
        dataToAdd.nav.navigation.navigate('Home');
      }
    })
    .catch(err => errorHandling(true));
});

addTaskEffect.pending.watch(pending => {
  console.log(pending, 'PENDING');
  waitingHandler(pending);
});

addTaskEffect.done.watch(({result}) => {
  waitingHandler(false);

});



addTaskEffect.fail.watch(({error, params}) => {
  waitingHandler(false);
});

export default addTaskEffect;
