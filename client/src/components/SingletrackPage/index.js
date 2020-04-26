/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useRef, useState } from 'react';
import { func, object, string } from 'prop-types';
import ResizeDetector from 'react-resize-detector';
import Map2D from '../Map2D';
import Map3D from '../Map3D';
import SingleTrackInfo from './SingleTrackInfo';
import StatusBar from './StatusBar';
import Linegraph from '../Linegraph';
import Loader from '../Loader';
import styles from './styles';
import spacing from '../../styles/spacing';
import { getMaxAltitude } from './SingleTrackInfo/helpers'

const POINT_REDUCE_FACTOR = 10;

const SingletrackPage = ({
  activeTrack,
  onRequestTrack,
  params,
}) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      if (!activeTrack || (activeTrack && activeTrack.id !== params)) {
        onRequestTrack(params);
      }
      didMountRef.current = true;
    }
    return () => { };
  }, [activeTrack, params]);

  const [activeIdx, setActiveIdx] = useState(null);
  const [width, setWidth] = useState(0);
  const [mapType, setMapType] = useState('2D');

  const onResize = (w) => setWidth(w - spacing.unit * 4);

  if (activeTrack) {
    const reducedData = activeTrack.Data.reduce((agg, curr, idx) => {
      if (idx % POINT_REDUCE_FACTOR === 0) {
        return [...agg, curr];
      }
      return agg;
    }, []);

    return (
      <main css={styles.main(width)}>
        { mapType === '2D'
          && (
          <Map2D
            activePoint={activeTrack.Data[activeIdx]}
            activeTrack={activeTrack}
            cropActive="tight"
          />
          )}
        { mapType === '3D'
          && (
          <Map3D
            activePoint={activeTrack.Data[activeIdx]}
            activeTrack={activeTrack}
            width={width}
          />
          )}
        <SingleTrackInfo activeTrack={activeTrack} setMapType={setMapType} />
        <StatusBar point={activeTrack.Data[activeIdx]} activeTrack={activeTrack} />
        <Linegraph
          getActiveIdx={(idx) => setActiveIdx(idx * POINT_REDUCE_FACTOR)}
          maxAltitude={getMaxAltitude(activeTrack)}
          timeSeriesData={reducedData}
          width={width}
        />
        <ResizeDetector
          handleWidth
          handleHeight
          onResize={onResize}
        />
      </main>
    );
  }
  return <Loader isLoading={true} />;
};

SingletrackPage.propTypes = {
  activeTrack: object,
  onRequestTrack: func,
  params: string,

};

export default SingletrackPage;
