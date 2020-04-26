/** @jsx jsx */

import colors from '../../styles/colors';
import typography from '../../styles';
import spacing from '../../styles/spacing';

const styles = {
  app: {
    ...typography.base,
    background: `linear-gradient(45deg, ${colors.bg[0]},${colors.bg[1]})`,
    boxSizing: 'border-box',
    color: colors.text,
    fontSize: 12,
    height: '100%',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: `${spacing.sideBarW}px auto`,
    fontFamily: '"Be Vietnam", monospace',
  },
  global: {
    a: {
      color: colors.text,
      textDecoration: 'none',
    },
    ...typography.base,
    '*': { boxSizing: 'border-box' },
    'html, body': {
      backgroundColor: colors.bg,
      height: '100%',
    },
    '.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl': {
      display: 'none',
      visibility: 'hidden',
    },
    '.cesium-viewer-fullscreenContainer': {
      bottom: 170,
      right: spacing.unit,
    },
  },
};

export default styles;
