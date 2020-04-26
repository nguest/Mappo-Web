import spacing from '../../styles/spacing';

const d3config = {
  svgHeight: 150,
  dateFormat: 'dd/MM',
  numberFormat: '1000m',
  maxChartWidth: 800,
  maxChartHeight: 80,
  defaultMaxYValue: 4000,
  margin: {
    top: spacing.unit * 2,
    right: 0,
    bottom: spacing.unit * 2,
    left: spacing.unit * 4,
  },
};

export default d3config;
