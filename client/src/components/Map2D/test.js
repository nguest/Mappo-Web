import React from 'react';

import {
  getBoundingBox,
  getCoords,
  getStart,
} from './helpers';

describe('getBoundingBox', () => {
  it('returns the bounding box', () => {
    const track = {
      BoundingBox: {
        ne: {
          lat: 10,
          lon: 20,
        },
        sw: {
          lat: 30,
          lon: 40,
        },
      },
    };
    expect(getBoundingBox(track)).toEqual([[40, 30], [20, 10]]);
  });
});

describe('getStart', () => {
  it('returns first point', () => {
    const track = {
      Data: [{
        lat: 10,
        lon: 20,
      },
      {
        lat: 20,
        lon: 30,
      }],
    };
    expect(getStart(track)).toEqual([20, 10]);
  });
});

describe('getCoords', () => {
  it('returns first point', () => {
    const track = {
      Data: [{
        lat: 10,
        lon: 20,
      },
      {
        lat: 20,
        lon: 30,
      }],
    };
    expect(getCoords(track)).toEqual([[20, 10], [30, 20]]);
  });
});