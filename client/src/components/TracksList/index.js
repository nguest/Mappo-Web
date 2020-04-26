/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useRef } from 'react';
import { array, bool, func, object } from 'prop-types';
import ListItem from './ListItem';
import LoaderListItem from './LoaderListItem';

import styles from './styles';


const tableHeaders = [
  'Date',
  'Location',
  'XC Distance',
  'Total Distance',
  'View',
  'Del',
];

const TracksList = ({
  activeTrack,
  isLoading,
  onClickListItem,
  onRequestTracks,
  onDeleteTrack,
  tracks = [],
}) => {
  const didMountRef = useRef(false);

  if (!didMountRef.current) {
    onRequestTracks();
    didMountRef.current = true;
  }

  return (
    <div css={styles.container}>
      <table css={styles.table}>
        <thead>
          <tr css={styles.headerRow}>
            { tableHeaders.map((header) => <td css={styles.cell} key={header}>{ header }</td>)}
          </tr>
        </thead>
        <tbody css={styles.tBody}>
          { isLoading && <LoaderListItem /> }
          { tracks
            .sort((a, b) => parseInt(b.ID, 10) - parseInt(a.ID, 10))
            .map((track) => {
              const { ID } = track;

              return (
                <ListItem
                  isActive={ID === (activeTrack && activeTrack.ID)}
                  key={ID}
                  onClick={onClickListItem}
                  onDeleteTrack={onDeleteTrack}
                  track={track}
                />
              );
            })}
        </tbody>
      </table>
    </div>

  );
};

TracksList.propTypes = {
  activeTrack: object,
  isLoading: bool,
  onClickListItem: func,
  onDeleteTrack: func,
  onRequestTracks: func,
  tracks: array,
};

export default TracksList;
