import {createEffect} from 'effector';
import axios from 'axios';
import { errorHandling} from '../../events';
const editEffect = createEffect('edit task');

editEffect.use(dataToEdit => {
  return axios({
    ...axios.defaults,
    url: `/tasks/${dataToEdit.oldData.id}`,
    method: 'put',
    data: {
      title: dataToEdit.newData.length > 0 ? dataToEdit.newData[0].value : dataToEdit.oldData.title,
    },
  })
    .then(res => {
      errorHandling(false);
      dataToEdit.nav.navigation.navigate('Home');
    })
    .catch(err => errorHandling(true));
});


export default editEffect;
