/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Fragment } from 'react';
import { object } from 'prop-types';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import colors from '../../../styles/colors';
import {
  getCoords,
} from '../helpers';

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round',
};

const routePaint = {
  'line-color': colors.hilite,
  'line-width': 4,
};

const optimizedPaint = {
  'line-color': colors.purple,
  'line-width': 2,
};

const circlePaint = {
  'circle-radius': 15,
  'circle-color': '#ffffff',
  'circle-opacity': 1.0,
  'circle-stroke-width': 0,
  'circle-blur': 0.8,
};

const startPaint = {
  'circle-radius': 10,
  'circle-color': '#1688b1',
  'circle-stroke-width': 1,
  'circle-stroke-color': '#ffffff',
};

const endPaint = {
  ...startPaint,
  'circle-color': '#ff0000',
};

const numberLabel = (number) => ({
  'text-field': number.toString(), // ['get', 'description'],
  'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
  'text-radial-offset': 0.5,
  'text-justify': 'auto',
  // 'icon-image': ['concat', ['get', 'icon'], '-15']  
  'icon-image': 'circle-11',
});

const numberPaint = {
  'text-color': '#202',
  'text-halo-color': '#fff',
  'text-halo-width': 2,
  'icon-color': '#000',
};


const TrackLayer = ({ activePoint, activeTrack }) => {
  if (!activeTrack) return null;


  const points = getCoords(activeTrack.Data);
  const optimizedPoints = activeTrack.Optimized && getCoords(activeTrack.Optimized.points);

  return (
    <Fragment>
      <Layer type="line" layout={lineLayout} paint={routePaint}>
        <Feature coordinates={points} />
      </Layer>
      <Layer type="circle" id="startCircle" paint={startPaint}>
        <Feature coordinates={points[0]} />
      </Layer>
      <Layer type="circle" id="endCircle" paint={endPaint}>
        <Feature coordinates={points[points.length - 1]} />
      </Layer>
      { optimizedPoints && (
        <Fragment>
          <Layer type="line" layout={lineLayout} paint={optimizedPaint}>
            <Feature coordinates={optimizedPoints} />
          </Layer>
          { optimizedPoints.map((point, idx) => (
            <Layer
              key={point}
              type="symbol"
              layout={numberLabel(idx + 1)}
              paint={numberPaint}
            >
              <Feature coordinates={point} />
            </Layer>
          ))}
        </Fragment>
      )}
      {
        activePoint && (
          <Layer type="circle" id="start" paint={circlePaint}>
            <Feature coordinates={[activePoint.lon, activePoint.lat]} />
          </Layer>
        )}
    </Fragment>
  );
};

TrackLayer.propTypes = {
  activePoint: object,
  activeTrack: object,
};

export default TrackLayer;
