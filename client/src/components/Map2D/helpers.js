export const getCoords = (data) => (data ? data.map((p) => ([p.lon, p.lat])) : []);

export const getStart = (track) => ([track.Data[0].lon, track.Data[0].lat]);

export const getBoundingBox = (track) => {
  const { sw, ne } = track.BoundingBox;
  return [[sw.lon, sw.lat], [ne.lon, ne.lat]];
};

export const getGridCross = (p) => {
  const l = 1;
  return {
    a: [[p[0] - l, p[1]], [p[0] + l, p[1]]],
    b: [[p[0], p[1] - l], [p[0], p[1] + l]],
  };
};
