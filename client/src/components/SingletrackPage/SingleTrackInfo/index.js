/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Fragment, useState } from 'react';
import { object, func } from 'prop-types';
import Switch from '../../Switch';
import Button from '../../Button';
import {
  getEndTime,
  getStartTime,
  getTrackDuration,
  getMaxAltitude,
  getStartAltitude,
  getEndAltitude,
} from './helpers';
import styles from './styles';

const SingleTrackInfo = ({
  activeTrack,
  setMapType,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <section css={styles.container}>
      <div css={styles.header}>
        <h3 css={styles.h3}>Info</h3>
        <Button
          icon={isExpanded ? 'arrow-up' : 'arrow-down'}
          onClick={() => setIsExpanded((s) => !s)}
          title={isExpanded ? 'Close' : 'Open'}
          type="invisible"
        />
      </div>
      { isExpanded
        && (
          <Fragment>
            <table css={styles.table}>
              <tbody>
                <tr>
                  <td>Duration</td>
                  <td>
                    { getTrackDuration(activeTrack)}
                  </td>
                  <td>
                    hh:mm
                  </td>
                </tr>
                <tr>
                  <td>Length</td>
                  <td>
                    { activeTrack.Optimized.optimizedDist.toFixed(1) }
                  </td>
                  <td>
                    km
                  </td>
                </tr>
                <tr>
                  <td>Best Flight</td>
                  <td>
                    { activeTrack.Optimized.type }
                  </td>
                  <td />
                </tr>
                <tr>
                  <td>Score</td>
                  <td>
                    { activeTrack.Optimized.score.toFixed(1) }
                  </td>
                  <td>
                    OLC
                  </td>
                </tr>
                <tr>
                  <td>Start</td>
                  <td>
                    { getStartTime(activeTrack) }
                  </td>
                  <td>
                    UTC
                  </td>
                </tr>
                <tr>
                  <td>End</td>
                  <td>
                    { getEndTime(activeTrack) }
                  </td>
                  <td>
                    UTC
                  </td>
                </tr>
                <tr>
                  <td>Max Alt.</td>
                  <td>
                    { getMaxAltitude(activeTrack) }
                  </td>
                  <td>
                    m
                  </td>
                </tr>
                <tr>
                  <td>Start Alt.</td>
                  <td>
                    { getStartAltitude(activeTrack) }
                  </td>
                  <td>
                    m
                  </td>
                </tr>
                <tr>
                  <td>End Alt.</td>
                  <td>
                    { getEndAltitude(activeTrack) }
                  </td>
                  <td>
                    m
                  </td>
                </tr>
              </tbody>
            </table>
            <div css={styles.switch}>
              <Switch
                name="mapType"
                defaultOption={0}
                options={[{
                  displayText: '2D',
                  value: '2D',
                },
                {
                  displayText: '3D',
                  value: '3D',
                }]}
                callback={(type) => setMapType(type)}
              />
            </div>
            { activeTrack && !activeTrack.Optimized.points
              && <span>OLC optimizations have not completed. Check back in a few minutes</span> }
          </Fragment>
        )}
    </section>
  );
};

SingleTrackInfo.propTypes = {
  activeTrack: object,
  setMapType: func,
};

export default SingleTrackInfo;
