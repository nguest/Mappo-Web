/** @jsx jsx */
import { jsx, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { array, func, object } from 'prop-types';
import Toast from '../Toast';
import Header from '../Header';
import styles from './styles';
import Homepage from '../Homepage';
import Route from '../../router/Route';
import SingletrackPage from '../SingletrackPage';
import Sidebar from '../Sidebar';


const MainContainer = (props) => {
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    setNotification(props.notifications[0]);
  }, [props.notifications.length]);

  console.log({ tracks: props.tracks });
  
  const firstTrackId = props.tracks.length && props.tracks[0].ID;
  console.log({ 444: firstTrackId });
  

  return (
    <div css={styles.app}>
      <Global styles={styles.global} />
      <Header />
      <Sidebar firstTrackId={firstTrackId} />
      <Route component={<Homepage {...props} />} path="/" exact />
      <Route component={<SingletrackPage {...props} />} path="/single" />
      { notification
        && <Toast {...notification} /> }
    </div>
  );
};

MainContainer.propTypes = {
  activeTrack: object,
  onDeleteTrack: func,
  error: object,
  notifications: array,
  onRequestTracks: func,
  onClickListItem: func,
  tracks: array,
  onUploadFile: func,
};

export default MainContainer;
