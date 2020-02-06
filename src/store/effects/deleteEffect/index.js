import {createEffect} from 'effector';
import axios from 'axios';

const deleteTaskEffect = createEffect('delete task');

deleteTaskEffect.use(id => {
  return axios({
    ...axios.defaults,
    url: `/tasks/${id}`,
    method: 'delete',
  });
});

export default deleteTaskEffect;
