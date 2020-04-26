import APIClient from '../../../api';
import setItemsLoader from '../setItemsLoader';
import createNotification from '../createNotification';


export const getAllItemsErrored = (error) => ({
  type: 'GET_ALL_ITEMS_ERRORED',
  error,
});

export const getAllItemsSucceeded = (items) => ({
  type: 'GET_ALL_ITEMS_SUCCEEDED',
  items,
});

export const getAllItems = () => (dispatch) => {
  dispatch(setItemsLoader(true));
  const requestTime = new Date();
  APIClient().get('/api')
    .then((response) => {
      console.log({ response });
      const count = response.data.length;
      dispatch(getAllItemsSucceeded(response.data));
      return dispatch(createNotification({ noteType: 'OK', message: `Showing ${count} tracks in ${new Date() - requestTime}ms` }));
    })
    .catch((e) => {
      console.log({ e });
      dispatch(getAllItemsErrored({ error: e }));
      let message;
      switch (e.response.status) {
        case 504:
          message = 'Network error- could not communicate with server';
          break;
        default:
          message = 'There was an error loading tracks';
      }
      return dispatch(createNotification({ noteType: 'ERROR', message }));
    });
};
