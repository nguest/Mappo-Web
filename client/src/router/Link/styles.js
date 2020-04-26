/** @jsx jsx */

import typography from '../../styles';
import buttonStyles from '../../components/Button/styles';

const styles = {
  base: (active, disabled, isButton, styleOverrides, type) => {
    if (isButton) {
      return buttonStyles.button(active, disabled, type);
    }
    return {
      ...typography.base,
      a: {
        ...typography.base,
      },
      ...styleOverrides,
    };
  },
};

export default styles;
