/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import VisuallyHidden from '../VisuallyHidden';

const MIN = 0;
const MAX = 100;
const clamp = (value) => {
  return Math.min(Math.max(value, MIN), MAX);
};

const SIZES = {
  small: {
    height: '8px',
    padding: 0,
    'border-radius': '4px',
  },
  medium: {
    height: '12px',
    padding: 0,
    'border-radius': '4px',
  },
  large: {
    height: '24px',
    padding: '4px',
    'border-radius': '8px',
  },
};

const StyledProgress = styled.div`
  width: 370px;
  height: var(--height);
  background: ${COLORS.transparentGray15};
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  border-radius: var(--radius);
  padding: var(--padding);
`;

const StyledIndicator = styled.div`
  width: var(--width);
  background-color: ${COLORS.primary};
  height: 100%;
`;

const BarWrapper = styled.div`
  overflow: hidden;
  border-radius: 4px;
  width: 100%;
  height: 100%;
`;

const ProgressBar = ({ value: inputValue, size: inputSize }) => {
  const size = SIZES[inputSize];

  const value = clamp(inputValue);
  return (
    <StyledProgress
      role="progressbar"
      aria-label="ProgresBar"
      value={value}
      aria-valuemin="0"
      aria-valuenow="50"
      aria-valuemax="100"
      style={{
        '--width': value + '%',
        '--height': size.height,
        '--padding': size.padding,
        '--radius': size['border-radius'],
      }}
    >
      <BarWrapper>
        <StyledIndicator></StyledIndicator>
      </BarWrapper>
      <VisuallyHidden>{value}</VisuallyHidden>
    </StyledProgress>
  );
};

export default ProgressBar;
