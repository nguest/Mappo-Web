import APIClient from '../../../api';
import createNotification from '../createNotification';

export const getItemErrored = (error) => ({
  type: 'GET_ITEM_ERRORED',
  error,
});

export const getItemSucceeded = (item) => ({
  type: 'GET_ITEM_SUCCEEDED',
  item,
});

export const getItem = (id) => (dispatch) => {
  const params = { 'fields[item]': 'Data' };
  const requestTime = new Date();
  APIClient().get(`api/${id}`, { params })
    .then((response) => {
      console.log({ response });
      dispatch(getItemSucceeded(response.data));
      return dispatch(createNotification({ noteType: 'OK', message: `Track loaded successfully in ${new Date() - requestTime}ms` }));
    })
    .catch((e) => {
      console.log(e);
      dispatch(getItemErrored({ error: e }));
      return dispatch(createNotification({ noteType: 'ERROR', message: 'Could not load file' }));
    });
};
