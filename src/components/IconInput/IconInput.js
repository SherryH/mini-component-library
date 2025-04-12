import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const SIZES = {
  small: {
    height: '24px',
    iconWidth: '16px',
    iconGap: '24px',
    borderBottom: '1px solid black',
  },
  large: {
    height: '36px',
    iconWidth: '24px',
    iconGap: '36px',
    borderBottom: '2px solid black',
  },
};

const StyledInput = styled.input`
  border: none;
  padding-left: var(--iconGap);
  height: var(--height);
  width: var(--width);
  color: inherit;
  outline-offset: 2px;
  &:placeholder {
    color: ${COLORS.gray500};
    font-weight: 400;
  }
`;

const Wrapper = styled.div`
  position: relative;
  border-bottom: var(--borderBottom);
  width: var(--width);
  color: ${COLORS.gray700};
  font-weight: 700;
  &:hover {
    color: black;
  }
`;

const IconWrapper = styled.div`
  height: var(--iconWidth);
  width: var(--iconWidth);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  color: inherit;
`;

const IconInput = ({
  label,
  icon,
  width = 250,
  size = 'small',
  value,
  ...rest
}) => {
  const { height, iconGap, iconWidth, borderBottom } = SIZES[size];
  return (
    <Wrapper
      style={{
        '--width': width + 'px',
        '--height': height,
        '--iconGap': iconGap,
        '--iconWidth': iconWidth,
        '--borderBottom': borderBottom,
      }}
    >
      <IconWrapper>
        <Icon id={icon} size={iconWidth} />
      </IconWrapper>
      <StyledInput {...rest}>{value}</StyledInput>
      <VisuallyHidden>{label}</VisuallyHidden>
    </Wrapper>
  );
};

export default IconInput;
