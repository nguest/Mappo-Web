/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { bool, func, object } from 'prop-types';
import { format, isValid } from 'date-fns';
import Link from '../../../router/Link';
import Button from '../../Button';

import styles from '../styles';

const ListItem = ({
  isActive,
  onClick,
  onDeleteTrack,
  track,
}) => {
  const { ID } = track;
  return (
    <tr
      css={styles.row(isActive)}
      onClick={() => onClick(ID)}
    >
      {/* <td css={styles.cell}>
        { track.ID }
      </td> */}
      <td css={styles.cell}>
        { (isValid(new Date(track.Date)) && format(new Date(track.Date), 'dd MMM yyyy')) || track.Date }
      </td>
      <td css={styles.cell}>
        { track.Location }
      </td>
      <td css={styles.cell}>
        { track.Optimized && track.Optimized.optimizedDist.toFixed(1) }
      </td>
      <td css={styles.cell}>
        { track.StartEndDistance.toFixed(1) }
      </td>
      <td css={styles.cell}>
        <Link
          to={`/single/${track.ID}`}
          isButton
          icon="map"
          title="View Track"
        />
      </td>
      <td css={styles.cell}>
        <Button
          icon="trash"
          onClick={() => onDeleteTrack(ID)}
          title="Delete Track"
        />
      </td>
    </tr>
  );
};

ListItem.propTypes = {
  isActive: bool,
  onClick: func,
  onDeleteTrack: func,
  track: object,
};

export default ListItem;
