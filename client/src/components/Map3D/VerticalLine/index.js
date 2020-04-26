import React from 'react';
import { number, object, string } from 'prop-types';
import { Entity, PolylineGraphics, LabelGraphics } from 'resium';
import { Cartesian2, Cartesian3, ShadowMode, Color, Cartographic } from 'cesium';

const positions = (point2D, endAltitude) => {
  if (point2D instanceof Cartographic) {
    return [
      Cartesian3.fromRadians(point2D.longitude, point2D.latitude, 0),
      Cartesian3.fromRadians(point2D.longitude, point2D.latitude, endAltitude),
    ];
  }
  return [
    Cartesian3.fromDegrees(point2D.longitude, point2D.latitude, 0),
    Cartesian3.fromDegrees(point2D.longitude, point2D.latitude, endAltitude),
  ];
};

const VerticalLine = ({
  endAltitude,
  labelText,
  point2D,
}) => (
  <Entity position={positions(point2D, endAltitude)[1]}>
    <PolylineGraphics
      positions={positions(point2D, endAltitude)}
      width={2}
      shadows={ShadowMode.ENABLED}
      material={new Color(0, 0, 0, 0.8)}
    />
    <LabelGraphics
      pixelOffset={new Cartesian2(0, -10)}
      text={labelText}
      font="16px 'Be Vietnam'"
      backgroundColor={new Color(0, 0, 0, 0.5)}
      showBackground
    />
  </Entity>
);

VerticalLine.propTypes = {
  endAltitude: number,
  labelText: string,
  point2D: object,
};

export default VerticalLine;
