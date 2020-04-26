/** @jsx jsx */
import { css } from '@emotion/core';

import colors from '../../styles/colors';
import typography from '../../styles';
import spacing from '../../styles/spacing';

const hover = (type) => ({
  backgroundColor: type === 'invisible' ? colors.mg : colors.hilite,
});


const getBackgroundColor = (active, type) => {
  if (type === 'invisible') {
    if (active) return colors.bg;
    return 'transparent';
  }
  return colors.hilite;
};

const styles = {
  button: (active, disabled, type) => ({
    color: colors.text,
    opacity: disabled ? 0.5 : 1.0,
    backgroundColor: getBackgroundColor(active, type),
    height: spacing.unit * 3,
    padding: `0 ${spacing.unit}px`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 3,

    '> i': {
      fontSize: 20,
    },

    ':hover': hover(type)
  }),
};

export default styles;
