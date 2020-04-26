/** @jsx jsx */
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

const styles = {
  ...typography,
  label: {
    display: 'inline-flex',
    justifyContent: 'center',
    backgroundColor: colors.darkOverlay,
    width: spacing.unit * 6,
    paddingBottom: spacing.unit,
    paddingTop: spacing.unit,
    cursor: 'pointer',
  },
  input: {
    display: 'none',
    ':checked + label': {
      backgroundColor: colors.hilite,
    },
  },
};

export default styles;
