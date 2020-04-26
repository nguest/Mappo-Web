/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { object } from 'prop-types';

import styles from './styles';

const StatusBar = ({
  point,
}) => (
  <section css={styles.main}>
    { !point && <div>Click 3D!</div> }
    <div>{ point && `${point.alt}m ASL` }</div>
    <div>{ point && point.ts }</div>
  </section>
);

StatusBar.propTypes = {
  point: object,
};

export default StatusBar;
