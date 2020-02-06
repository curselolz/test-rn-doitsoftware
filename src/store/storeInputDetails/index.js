import {createStore} from 'effector';
import {inputChangedDetails} from '../events';

const storeInputDetails = createStore([]).on(inputChangedDetails, (oldState, newElement) => {
  const index = oldState.findIndex(({name}) => name === newElement.name);
  let newArr = [...oldState];
  if (index === -1) {
    newArr = [...newArr, newElement];
  } else {
    newArr[index] = newElement;
  }
  return newArr;
});

storeInputDetails.watch(console.log);

export default storeInputDetails;
