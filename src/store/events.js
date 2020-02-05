import { createEvent, createEffect } from 'effector';

//Create event to change store
export const createTask = createEvent('createTask');
export const deleteTask = createEvent('deleteTask');
export const editTask = createEvent('editTask');
export const fillData = createEvent('fillData');


export const toggleSwitch = createEvent('Toggle switch');

export const inputChanged = createEvent('Input changed');
export const inputChangedPass = createEvent('Input changed pass');