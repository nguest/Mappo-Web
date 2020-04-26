import {
  area as d3Area,
  axisBottom,
  axisLeft,
  curveMonotoneX,
  event as d3Event,
  format,
  line as d3Line,
  mouse as d3Mouse,
  scaleLinear,
  scaleTime,
  select,
  selectAll,
  timeFormat,
} from 'd3';
import d3Config from './config';
import colors from '../../styles/colors';

function debounce(callback, wait, immediate = false) {
  let timeout = null;
  
  return function (...args) {
    const callNow = immediate && !timeout;
    const next = () => callback.apply(this, args);
    
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);

    if (callNow) {
      next();
    }
  }
}


const formatTime = timeFormat('%B %d, %Y');

const d3Utils = {
  initializeChart: ({ data, getActiveIdx, width }) => {
    console.log({ data });
    
    const roundedMaxChartHeight = Math.ceil(maxAltitude / 1000) * 1000;

    const mouseAction = (type) => () => updateMousePosition(d3Event.target);
  
    // build chart with margins
    select('.line-chart')
      .attr('width', width)
      .attr('height', d3Config.maxChartHeight + d3Config.margin.top + d3Config.margin.bottom)
      .on('mouseenter', mouseAction('mouseenter'))
      .on('mouseleave', mouseAction('mouseleave'))
      .on('mousemove', mouseAction('mousemove'))
      .on('mouseout', mouseAction('mouseout'))
      .on('mouseover', mouseAction('mouseover'))
      .append('g')
      .attr('class', 'line-chart-inner')
      .attr('transform', `translate(${d3Config.margin.left},${d3Config.margin.top})`);

    // build axes
    select('.line-chart-inner')
      .append('g')
      .attr('transform', `translate(0, ${d3Config.maxChartHeight})`)
      .attr('class', 'line-chart-xaxis');

    select('.line-chart-inner')
      .append('g')
      .attr('transform', 'translate(0, 0)')
      .attr('class', 'line-chart-yaxis');

    // build line
    select('.line-chart-inner')
      .append('path')
      .attr('class', 'line-chart-line')
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // build vertical line
    select('.line-chart-inner')
      .append('line')
      .attr('stroke', colors.text)
      .attr('stroke-width', 2)
      .attr('class', 'line-chart-vertical');

    // build scales
    const xScale = scaleTime()
      // .domain([min(data), max(data)])
      .domain([
        new Date(data[0].ts),
        new Date(data[data.length - 1].ts)])
      .range([0, width - d3Config.margin.left - d3Config.margin.right]);

    const yScale = scaleLinear()
      .domain([0, roundedMaxChartHeight])
      .range([d3Config.maxChartHeight, 0]);

    // scale data points according to their respective domain/range configuration
    const scaleXData = (point) => xScale(new Date(point.ts));
    const scaleYData = (point) => yScale(point.alt);

    // create x- and y-axes
    const yAxis = axisLeft(yScale)
      .ticks(5)
      .tickSize(-(width - d3Config.margin.left - d3Config.margin.right))
      .tickFormat(format(d3Config.numberFormat));

    const xAxis = axisBottom(xScale)
      .ticks(5)
      .tickFormat(timeFormat(d3Config.dateFormat));

    select('.line-chart-xaxis')
      .call(xAxis);

    select('.line-chart-yaxis')
      .call(yAxis);

    // hide the y-axis vertical:
    select('.line-chart-yaxis .domain').attr('display', 'none');
    selectAll('.line-chart-yaxis g.tick line')
      .attr('stroke', 'rgba(255,255,255,0.3)');

    // draw the line
    const line = d3Line()
      .x(scaleXData)
      .y(scaleYData)
      .curve(curveMonotoneX);

    // define the area
    const area = d3Area()
      .x((point) => xScale(new Date(point.ts)))
      .y0(d3Config.maxChartHeight)
      .y1((point) => yScale(point.alt));

    select('.line-chart-line')
      .attr('d', line(data))
      .attr('stroke', 'white');

    select('.line-chart-inner')
      .append('path')
      .datum(data)
      .attr('fill', colors.mg)
      //.attr('opacity', 0.3)
      .attr('class', 'area')
      .attr('d', area(data));

    const updateMousePosition = (t) => {
      const mouse = d3Mouse(t);
      const idx = Math.floor((mouse[0] / width) * data.length);
      const constrainedIdx = Math.min(Math.max(idx, 0), data.length - 1);
      debounce(getActiveIdx(constrainedIdx), 100);
      select('.line-chart-vertical')
        .interrupt()
        .attr('transform', `translate(${mouse[0]}, 0)`);
    };

    select('.line-chart-vertical')
      .attr('x1', 0)// xScale(new Date(data[4]).ts))
      .attr('y1', 0)
      .attr('x2', 0)// xScale(new Date(data[4]).ts))
      .attr('y2', d3Config.maxChartHeight);
  },
  empty: () => {
    select('.line-chart > *').remove();
  },
};

export default d3Utils;
