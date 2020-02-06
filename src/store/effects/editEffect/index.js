import {createEffect} from 'effector';
import axios from 'axios';

const editEffect = createEffect('edit task');

editEffect.use(dataToEdit => {
  return axios({
    ...axios.defaults,
    url: `/tasks/${dataToEdit.oldData.id}`,
    method: 'put',
    data: {
      title: dataToEdit.newData.length > 0 ? dataToEdit.newData[0].value : dataToEdit.oldData.title,
    },
  });
});

editEffect.done.watch(({ result }) => {
  console.log(result);
});

editEffect.fail.watch(({ error, params }) => {
  console.error(error); // rejected value
  console.log('//////');
});

export default editEffect;
