/** @jsx jsx */
import { css } from '@emotion/core';

import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';
// import typography from '../../styles';
// import spacing from '../../styles/spacing';

const styles = {
  main: {
    gridColumn: '1 / span 3',
    backgroundColor: colors.mg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.unit,
  },
};

export default styles;
