/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { array, func, object, bool } from 'prop-types';
import Map2D from '../Map2D';
import TracksList from '../TracksList';
import FileUploader from '../FileUploader';
import HomeInfo from '../HomeInfo';
import styles from './styles';

const Homepage = ({
  activeTrack,
  onRequestTrack,
  onDeleteTrack,
  onRequestTracks,
  tracks,
  onUploadFile,
  uploadLoader,
}) => {
  const uploadFile = (file) => {
    onUploadFile(file);
  };

  return (
    <main css={styles.main}>
      <Map2D activeTrack={activeTrack} />
      <TracksList
        activeTrack={activeTrack}
        onClickListItem={onRequestTrack}
        onDeleteTrack={onDeleteTrack}
        onRequestTracks={onRequestTracks}
        tracks={tracks}
        isLoading={uploadLoader}
      />
      <HomeInfo tracks={tracks} />
      <FileUploader onUploadFile={uploadFile} isLoading={uploadLoader} />
    </main>
  );
};

Homepage.propTypes = {
  activeTrack: object,
  onDeleteTrack: func,
  onRequestTracks: func,
  onRequestTrack: func,
  tracks: array,
  onUploadFile: func,
  uploadLoader: bool,
};

export default Homepage;
