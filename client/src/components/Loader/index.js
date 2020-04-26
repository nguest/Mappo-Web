/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { bool, oneOf } from 'prop-types';

import styles from './styles';

const Loader = ({
  isLoading = false,
  type = 'default',
}) => {
  if (isLoading) {
    const message = type === 'trackUpload'
      ? 'Uploading track and calculating OLC optimizations. This could take up to a minute'
      : 'Loading...';
    return <div css={styles.main}>{ message }</div>;
  }
  return null;
};

Loader.propTypes = {
  isLoading: bool,
  type: oneOf(['default', 'trackUpload']),
};

export default Loader;
