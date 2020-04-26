/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState, useRef } from 'react';
import { object, oneOf } from 'prop-types';
import ReactMapboxGl, { Layer, Feature, ScaleControl } from 'react-mapbox-gl';
import TrackLayer from './TrackLayer';
import colors from '../../styles/colors';
import {
  getBoundingBox,
  getGridCross,
} from './helpers';
import styles from './styles';
import spacing from '../../styles/spacing';

const mapboxApiKey = process.env.MAPBOX_API_KEY;

const Map = ReactMapboxGl({
  accessToken: mapboxApiKey,
  attributionControl: false,
});

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round',
};

const gridPaint = {
  'line-color': colors.darkOverlay,
  'line-width': 1,
};

const circlePaint = {
  'circle-radius': 15,
  'circle-color': '#ffffff',
  'circle-opacity': 1.0,
  'circle-stroke-width': 0,
  'circle-blur': 0.8,
};

const mapStyles = {
  street: 'mapbox://styles/mapbox/streets-v9',
  dark: 'mapbox://styles/mapbox/dark-v10',
  bubbles: 'mapbox://styles/guestnicholas/ck0eptk7b1ydm1cqkunyyy3uf',
  caliTerrain: 'mapbox://styles/guestnicholas/ck0zsvf840bpg1cnyoofhhfee',
};

const { unit } = spacing;
const paddingTight = { top: unit * 4, bottom: unit * 4, left: unit * 4, right: unit * 4 };
const paddingLoose = { top: unit * 10, bottom: unit * 10, left: unit * 10, right: unit * 10 };

const defaultCenter = [-122, 44];

const MapView = ({ activePoint, activeTrack, cropActive = 'loose' }) => {
  const didMountRef = useRef(false);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  useEffect(() => {
    if (!didMountRef.current) {
      if (navigator.geolocation && !activeTrack) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentPosition([position.coords.longitude, position.coords.latitude]);
        });
      }
      didMountRef.current = true;
    }
  }, [activeTrack]);

  return (
    <div css={styles.base}>
      <Map
        center={currentPosition}
        containerStyle={styles.base}
        // onStyleLoad={() => console.log('styleLoad')}
        fitBounds={activeTrack && activeTrack.BoundingBox && getBoundingBox(activeTrack)}
        fitBoundsOptions={activeTrack
          && activeTrack.BoundingBox
          && { padding: cropActive === 'tight' ? paddingTight : paddingLoose }}
        style={mapStyles.caliTerrain}
      >
        <ScaleControl
          maxWidth={80}
          measurement="km"
          style={styles.scaleControl}
        />
        <Layer type="line" id="gridLineA" layout={lineLayout} paint={gridPaint}>
          <Feature coordinates={getGridCross(currentPosition).a} />
        </Layer>
        <Layer type="line" id="gridLineB" layout={lineLayout} paint={gridPaint}>
          <Feature coordinates={getGridCross(currentPosition).b} />
        </Layer>
        <Layer type="circle" id="currentPos" paint={circlePaint}>
          <Feature coordinates={currentPosition} />
        </Layer>
        <TrackLayer activeTrack={activeTrack} activePoint={activePoint} />
      </Map>
    </div>
  );
};

MapView.propTypes = {
  activePoint: object,
  activeTrack: object,
  cropActive: oneOf(['tight', 'loose']),
};

export default MapView;
