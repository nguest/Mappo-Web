/** @jsx jsx */
import { css } from '@emotion/core';

import colors from '../../styles/colors';
import typography from '../../styles';
import spacing from '../../styles/spacing';

const styles = {
  main: (width) => ({
    padding: `0 ${spacing.gridGap}px ${spacing.unit * 3}px 0`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto 30px 0',
    gridGap: spacing.unit,
    position: 'relative',
    '.cesium-viewer-bottom': {
      display: 'none',
    },
    '.cesium-viewer-toolbar': {
      visibility: 'hidden',
    },
  }),
  switch: {
    position: 'absolute',
    top: spacing.unit,
    right: spacing.unit * 6,
  },
};

export default styles;
