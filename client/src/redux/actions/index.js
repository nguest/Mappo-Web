import {
  deleteItem,
  deleteItemErrored,
  deleteItemSucceeded,
} from './deleteItem';

import {
  getAllItems,
  getAllItemsErrored,
  getAllItemsSucceeded,
} from './getAllItems';

import {
  getItem,
  getItemErrored,
  getItemSucceeded,
} from './getItem';

import {
  uploadFile,
  uploadFileErrored,
  uploadFileSucceeded,
  setUploadLoader,
} from './uploadFile';

import createNotification from './createNotification';

import setItemsLoader from './setItemsLoader';

const actions = {
  createNotification,
  deleteItem,
  deleteItemErrored,
  deleteItemSucceeded,
  getAllItems,
  getAllItemsErrored,
  getAllItemsSucceeded,
  getItem,
  getItemErrored,
  getItemSucceeded,
  setItemsLoader,
  setUploadLoader,
  uploadFile,
  uploadFileErrored,
  uploadFileSucceeded,
};

export default actions;
