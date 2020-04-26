/** @jsx jsx */
import colors from '../../styles/colors';

const container = (isDragActive) => ({
  backgroundColor: isDragActive ? colors.active : colors.fg,
  border: `4px dashed ${colors.bg}`,
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const styles = { container };

export default styles;
