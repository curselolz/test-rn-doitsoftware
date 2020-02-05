import { createStore } from 'effector';
import { createStoreConsumer } from 'effector-react'

import {
  createTask,
  deleteTask,
  editTask,
  fillData,
  inputChanged,
  toggleSwitch,
} from './events';

export const store = createStore([])
  .on(createTask, (oldState, payload) => [...oldState, payload])
  .on(deleteTask, (oldState, payload) => oldState.filter(el => el.id !== payload.id))
  .on(editTask, (oldState, payload) => oldState.find(el => el.id === payload.id))
  .on(fillData, (oldState, payload) => [...oldState, payload]);

export const storeInput = createStore([])
  .on(inputChanged, (oldState, newElement) => {
    let index = oldState.findIndex(({ name }) => name === newElement.name);
    let newArr = [...oldState];
    if (index === -1) {
      newArr = [...newArr, newElement]
    } else {
      newArr[index] = newElement;
    }
    return newArr;
  })

export const storeCheckbox = createStore(0)
  .on(toggleSwitch, (oldState, payload) => payload)
// export const storeCheckboxConsumer = createStoreConsumer(storeCheckbox);


  store.watch(console.log);
  storeInput.watch(console.log);

