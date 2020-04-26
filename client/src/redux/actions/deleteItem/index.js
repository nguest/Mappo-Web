import APIClient from '../../../api';
import setItemsLoader from '../setItemsLoader';
import createNotification from '../createNotification';

export const deleteItemSucceeded = (id) => ({
  type: 'DELETE_ITEM_SUCCEEDED',
  id,
});

export const deleteItemErrored = (error) => ({
  type: 'DELETE_ITEM_ERRORED',
  error,
});

export const deleteItem = (id) => (dispatch) => {
  dispatch(setItemsLoader(true));
  const requestTime = new Date();
  APIClient().delete(`api/${id}`)
    .then((response) => {
      if (response.status === 200) {
        console.log({ response }); // no response data is correct
        dispatch(deleteItemSucceeded(id));
        return dispatch(createNotification({ noteType: 'OK', message: `Track deleted successfully in ${new Date() - requestTime}ms` }));
      }
      dispatch(deleteItemErrored({ error: response }));
      return dispatch(createNotification({ noteType: 'ERROR', message: 'Could not delete track' }));
    })
    .catch((e) => {
      console.log(e);
      dispatch(deleteItemErrored({ error: e }));
      return dispatch(createNotification({ noteType: 'ERROR', message: 'Could not delete track' }));
    });
};
