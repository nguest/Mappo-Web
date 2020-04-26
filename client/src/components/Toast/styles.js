/** @jsx jsx */
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

const styles = {
  container: (noteType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: (noteType === 'OK') ? colors.ok : colors.error,
    padding: spacing.unit,
    position: 'fixed',
    bottom: 0,
    left: spacing.sideBarW,
    right: spacing.gridGap,
    height: spacing.unit * 5,
    borderRadius: `${spacing.br}px ${spacing.br}px 0 0`,
    cursor: 'pointer',
  }),
};

export default styles;
