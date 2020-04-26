/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { array, func, number } from 'prop-types';
import d3Utils from './utils';
import d3Config from './config';
import Button from '../Button';

import styles from './styles';

const Linegraph = ({ getActiveIdx, maxAltitude, timeSeriesData = [], width }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  useEffect(() => {
    if (width > 0 && timeSeriesData.length) {
      d3Utils.empty();
      d3Utils.initializeChart({ data: timeSeriesData, getActiveIdx, width, maxAltitude });
    }
  }, [timeSeriesData.length, width, isExpanded]);

  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <span>Altitude</span>
        <Button
          icon={isExpanded ? 'arrow-down' : 'arrow-up'}
          onClick={() => setIsExpanded((s) => !s)}
          title={isExpanded ? 'Close' : 'Open'}
          type="invisible"
        />
      </div>
      { isExpanded
        && <svg className="line-chart" width="100%" height={d3Config.svgHeight} css={styles.svg} /> }
    </div>
  );
};

Linegraph.propTypes = {
  getActiveIdx: func,
  timeSeriesData: array,
  width: number,
};

export default Linegraph;
