import React from 'react';
import { array, func, object, bool } from 'prop-types';
import { connect } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import actions from '../../redux/actions';

const App = ({
  activeTrack,
  deleteItem,
  error,
  getAllItems,
  getItemDetails,
  notifications,
  tracks,
  uploadFile,
  uploadLoader,
}) => (
  <MainContainer
    activeTrack={activeTrack}
    error={error}
    notifications={notifications}
    onRequestTrack={getItemDetails}
    onDeleteTrack={deleteItem}
    onRequestTracks={getAllItems}
    tracks={tracks}
    onUploadFile={uploadFile}
    uploadLoader={uploadLoader}
  />
);

const mapStateToProps = (state) => ({
  activeTrack: state.activeTrack || null,
  notifications: state.notifications,
  tracks: state.tracks || [],
  error: state.lastError || null,
  uploadLoader: state.uploadLoader,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(actions.deleteItem(id)),
  getAllItems: () => dispatch(actions.getAllItems()),
  getItemDetails: (id) => dispatch(actions.getItem(id)),
  uploadFile: (file) => {
    dispatch(actions.uploadFile(file));
    dispatch(actions.setUploadLoader(true));
  },
});

App.propTypes = {
  activeTrack: object,
  deleteItem: func,
  error: object,
  getAllItems: func,
  getItemDetails: func,
  notifications: array,
  tracks: array,
  uploadFile: func,
  uploadLoader: bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
