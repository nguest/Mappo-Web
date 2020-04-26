import React from 'react';
import { object } from 'prop-types';
import { CameraFlyTo, Globe, Scene, Viewer, Entity, PolylineGraphics, PointGraphics } from 'resium';
import { Cartesian3, createWorldTerrain, Ion, Math, ShadowMode, Color, Material, Clock, ClockViewModel, JulianDate } from 'cesium';
import { getStart } from '../Map2D/helpers';
import { getBoundingBox3D, destForLookat, centerBoundingBox } from './helpers';

import 'cesium/Widgets/widgets.css'; /* eslint-disable-line */
import styles from './styles';
import VerticalLine from './VerticalLine';


Ion.defaultAccessToken = process.env.CESIUM_ACCESS_TOKEN;
const terrainProvider = createWorldTerrain({
//   requestWaterMask: true, // required for water effects
  requestVertexNormals: true, // required for terrain lighting);
});

const pointGraphics = { pixelSize: 10 };
const centerPointGraphics = { pixelSize: 30, color: Color.ORANGE };


// const lineMaterial = new Material({
//   fabric: {
//     type: 'Color',
//     uniforms: {
//       color: new Color(1.0, 0.0, 0.0, 1.0),
//     },
//   },
//   shadows: ShadowMode.ENABLED,
// });

const date = new Date('July 22, 2019 12:00:00 UTC');
const julianDate = JulianDate.fromDate(date);
const clock = new Clock({
  startTime: julianDate,
  currentTime: julianDate,
  // clockRange : Cesium.ClockRange.LOOP_STOP,
  // clockStep : Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER
});
const clockViewModel = new ClockViewModel(clock);


const Map3D = ({
  activeTrack,
}) => {
  console.log({ 'terrainProvider.ready': terrainProvider.ready });
console.log({ cart2: Cartesian3.fromDegrees(...getStart(activeTrack), 30000) });

  const positions = activeTrack.Data.map((p) => (Cartesian3.fromDegrees(p.lon, p.lat, p.alt)));
  const { Data } = activeTrack;
  return (
    <Viewer
      animation={false}
      timeline={false}
      style={styles.viewer}
      terrainShadows={ShadowMode.ENABLED}
      terrainProvider={terrainProvider}
      shadows={true}
      clockViewModel={clockViewModel}
    >
      <Scene />
      <Globe />
      <CameraFlyTo
        destination={destForLookat({ track: activeTrack, altitude: 20000 })}
        orientation={{
          heading: 0,
          pitch: -Math.PI_OVER_THREE,
          roll: 0,
        }}
      />
      <Entity
        position={Cartesian3.fromDegrees(...getStart(activeTrack), Data[0].alt)}
        point={pointGraphics}
      />
      <Entity
        position={destForLookat({ track: activeTrack, altitude: 0 })}
        point={centerPointGraphics}
      />
      <Entity>
        <PolylineGraphics
          depthFailMaterial={Color.AZURE}
          positions={positions}
          width={2}
          shadows={ShadowMode.ENABLED}
          material={Color.RED}
        />
      </Entity>
      {/* <VerticalLine
        point2D={centerBoundingBox(activeTrack)}
        endAltitude={30000}
      /> */}
      <VerticalLine
        point2D={{ longitude: Data[0].lon, latitude: Data[0].lat }}
        endAltitude={5000}
        labelText="START"
      />
      <VerticalLine
        point2D={{ longitude: Data[Data.length - 1].lon, latitude: Data[Data.length - 1].lat }}
        endAltitude={5000}
        labelText="END"
      />

    </Viewer>
  );
};

Map3D.propTypes = {
  activeTrack: object,
};

export default Map3D;
