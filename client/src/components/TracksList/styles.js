/** @jsx jsx */

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

const styles = {
  container: {
    ...spacing.fullWidth,
    backgroundColor: colors.mg,
    gridColumn: '1 / span 2',
    gridRow: 'span 2',
    overflowY: 'scroll',
  },
  table: {
    ...spacing.fullWidth,
    borderCollapse: 'collapse',
    borderSpacing: 0,
    color: colors.text,
    fontSize: typography.base.fontSize,
    display: 'table',
  },
  tBody: {
    display: 'table-body',
    overflowY: 'auto',
  },
  headerRow: {
    color: colors.hilite,
    width: '100%',
    display: 'table-row',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.2)',
  },
  row: (isActive) => ({
    cursor: 'pointer',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    ':hover': {
      backgroundColor: colors.fg,
    },
    backgroundColor: isActive ? colors.active : 'transparent',
    display: 'table-row',
    paddingLeft: spacing.unit,
  }),
  cell: {
    padding: spacing.unit * 2,
    textAlign: 'left',
  },
};

export default styles;
