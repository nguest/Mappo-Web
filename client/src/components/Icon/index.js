/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';
import { number, string } from 'prop-types';

import styles from './styles';

const Icon = ({
  name,
  size = 24,
}) => (
  <i className={`icon ion-md-${name}`} css={styles.main(size)} />
);

Icon.propTypes = {
  name: string,
  size: number,
};

export default Icon;
