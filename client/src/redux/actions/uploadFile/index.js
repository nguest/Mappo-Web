import APIClient from '../../../api';
import createNotification from '../createNotification';

export const uploadFileErrored = (error) => ({
  type: 'UPLOAD_FILE_ERRORED',
  error,
});

export const uploadFileSucceeded = (item) => ({
  type: 'UPLOAD_FILE_SUCCEEDED',
  item,
});

export const setUploadLoader = (loadingState) => ({
  type: 'SET_UPLOAD_LOADER',
  loadingState,
});

export const uploadFile = (file) => (dispatch) => {
  dispatch(setUploadLoader(true));
  const formData = new FormData();
  formData.append('file', file);
  APIClient().post(
    '/api/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
    .then((response) => {
      console.log(response);
      dispatch(setUploadLoader(false));
      dispatch(uploadFileSucceeded(response.data));
      return dispatch(createNotification({ noteType: 'OK', message: 'File uploaded successfully' }));
    })
    .catch((e) => {
      console.log(e);
      dispatch(setUploadLoader(false));
      dispatch(uploadFileErrored({ error: e }));
      const message = (e.response && e.response.status === 422)
        ? 'Could not upload file: only valid IGC files are permitted'
        : 'There was an error uploading your track';
      return dispatch(createNotification({ noteType: 'ERROR', message }));
    });
};
