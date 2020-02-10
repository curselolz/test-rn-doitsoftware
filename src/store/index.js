import {createStore, combine} from 'effector';

import {orderBy} from 'lodash';
import {
  createTask,
  deleteTask,
  editTask,
  fillData,
  inputChanged,
  toggleSwitch,
  fillAuthToken,
  saveNavToStore,
  changeSort,
  changeSortOrder,
  openForEdit,
  finishRefresh,
  errorHandling,
  clearValue,
  waitingHandler,
  clickAddData,
} from './events';

const sortByName = (data, sortOrder) => orderBy(data, 'title', sortOrder);

const sortByPriority = (data, sortOrder) => {
  const numericStatuses = {High: 3, Medium: 2, Low: 1};
  const sortField = [el => numericStatuses[el.priority]];
  const sortedData = orderBy(data, sortField, sortOrder);
  return sortedData;
};

const sortByDate = (data, sortOrder) => orderBy(data, 'dueBy', sortOrder);

export const store = createStore([])
  .on(createTask, (oldState, payload) => [...oldState, payload])
  .on(deleteTask, (oldState, payload) => oldState.filter(el => el.id !== payload.id))
  .on(fillData, (oldState, payload) => [...payload])
  .on(editTask, (oldState, payload) => {
    const index = oldState.findIndex(elem => elem.id === payload.id);
    const newArr = [...oldState];
    newArr[index] = payload;
    return newArr;
  });

export const storeSortOrder = createStore('asc').on(
  changeSortOrder,
  (oldState, payload) => payload
);

export const storeSort = createStore('name').on(changeSort, (oldState, payload) => payload);

export const twoMergedStore = combine(
  store,
  storeSort,
  storeSortOrder,
  (dataStore, sortType, sortOrder) => {
    if (sortType === 'name') {
      return sortByName(dataStore, sortOrder);
    }
    if (sortType === 'priority') {
      return sortByPriority(dataStore, sortOrder);
    }
    return sortByDate(dataStore, sortOrder);
  }
);

export const storeToken = createStore({}).on(fillAuthToken, (oldState, payload) => payload);

export const storeInput = createStore([]).on(inputChanged, (oldState, newElement) => {
  const index = oldState.findIndex(({name}) => name === newElement.name);
  let newArr = [...oldState];
  if (index === -1) {
    newArr = [...newArr, newElement];
  } else {
    newArr[index] = newElement;
  }
  return newArr;
})
.on(clearValue, () => []);

export const storeCheckbox = createStore(false).on(toggleSwitch, (oldState, payload) => payload);

export const storeNavigation = createStore({}).on(saveNavToStore, (oldState, payload) => payload);

export const storeEdit = createStore(false).on(openForEdit, (oldState, payload) => payload);

export const storeRefresh = createStore(false).on(finishRefresh, (oldState, payload) => payload);

export const storeError = createStore(false).on(errorHandling, (oldState, payload) => payload);

export const storeWait = createStore(false).on(waitingHandler, (oldState, payload) => payload);

export const storeClicked = createStore(false).on(clickAddData, (oldState, payload) => payload);

// storeSort.watch(console.log);
// storeSortOrder.watch(console.log);
// twoMergedStore.watch(console.log);
// storeEdit.watch(console.log);
storeToken.watch(console.log);
