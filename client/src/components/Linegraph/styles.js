/** @jsx jsx */

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

const styles = {
  container: {
    bottom: spacing.unit * 10,
    left: spacing.unit,
    position: 'absolute',
    gridColumn: '1 / span 3',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: spacing.unit,
    width: `calc(100% - ${spacing.unit * 2}px)`,
  },
  header: {
    alignItems: 'space-between',
    justifyContent: 'space-between',
    flex: 1,
    display: 'flex',
  },
  svg: {
    overflow: 'visible',
    color: colors.text,
  },
};

export default styles;
