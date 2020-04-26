/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { array } from 'prop-types';

import styles from './styles';

const computeTrackData = (tracks) => {
  const count = tracks.length;
  return { count };
};

const HomeInfo = ({
  tracks,
}) => {
  const data = computeTrackData(tracks);
  return (
    <section style={styles.base}>
      { `${data.count} tracks` }
    </section>
  );
};

HomeInfo.propTypes = {
  tracks: array,
};

export default HomeInfo;
