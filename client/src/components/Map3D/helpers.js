import { Cartesian3, Rectangle } from 'cesium';

export const getBoundingBox3D = (track) => {
  const { sw, ne } = track.BoundingBox;
  return Rectangle.fromDegrees(ne.lon, ne.lat, sw.lon, sw.lat);
};

export const destForLookat = ({ track, altitude }) => {
  const boundingRect = getBoundingBox3D(track);
  const center = Rectangle.center(boundingRect);
  return Cartesian3.fromRadians(center.longitude, center.latitude - 0.0015, altitude);
};

export const centerBoundingBox = (track) => {
  const boundingRect = getBoundingBox3D(track);
  return Rectangle.center(boundingRect);
};
