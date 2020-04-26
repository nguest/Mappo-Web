/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import styles from '../styles';

const LoaderListItem = () => (
  <tr css={styles.row(false)}>
    <td css={styles.cell}>
      Loading
    </td>
  </tr>
);

export default LoaderListItem;
