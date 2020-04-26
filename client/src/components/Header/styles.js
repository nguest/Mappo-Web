/** @jsx jsx */

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

const styles = {
  ...typography,
  header: {
    ...spacing.fullWidth,
    alignItems: 'center',
    backgroundColor: 'rgba(5,0,10,0.9)',
    borderBottom: `1px solid ${colors.fg}`,
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.4)',
    borderRadius: '0 0 5px 0',
    display: 'flex',
    height: 56,
    left: -15,
    paddingLeft: spacing.unit * 3,
    position: 'fixed',
    transform: 'skew(-30deg)',
    width: 160,
    zIndex: 1,
    '> *': {
      transform: 'skew(30deg)',
    },
  },
  logo: {
    display: 'flex',
    width: spacing.unit * 5,
    height: spacing.unit * 5,
    marginRight: spacing.unit,
    fillRule: 'evenodd',
    clipRule: 'evenodd',
    strokeLinejoin: 'round',
    strokeMiterlimit: 2,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default styles;
