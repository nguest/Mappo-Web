/** @jsx jsx */

import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';


const styles = {
  ...typography,
  container: {
    top: spacing.unit,
    right: spacing.unit,
    position: 'absolute',
    gridColumn: '1 / span 3',
    backgroundColor: colors.darkOverlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    width: spacing.unit * 22,
  },
  table: {
    color: 'white',
    fontSize: '0.75rem',
    marginBottom: spacing.unit,
    'tr td:nth-of-type(2)': {
      color: colors.hilite,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
};

export default styles;
