import {createEvent} from 'effector';

//  Create event to change store
export const createTask = createEvent('createTask');
export const deleteTask = createEvent('deleteTask');
export const editTask = createEvent('editTask');
export const fillData = createEvent('fillData');
export const fillAuthToken = createEvent('fill auth token');
export const currentEditElement = createEvent('current edit element');

export const changeSort = createEvent('change sort');
export const changeSortOrder = createEvent('change sort order');

export const toggleSwitch = createEvent('Toggle switch');

export const inputChanged = createEvent('Input changed');
export const inputChangedDetails = createEvent('Input changed');
export const inputChangedPass = createEvent('Input changed pass');

export const saveNavToStore = createEvent('Save nav');

export const openForEdit = createEvent('Open edit');

export const finishRefresh = createEvent('Finish refresh');
