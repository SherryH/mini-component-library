import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const StyledInput = styled.input`
  border: none;
  padding-left: 16px;
  height: 30px;
  width: var(--width);
  color: inherit;
  outline-offset: 2px;
`;

const Wrapper = styled.div`
  position: relative;
  border-bottom: 1px solid black;
  width: var(--width);
  color: ${COLORS.gray700};
  :hover {
    color: black;
    font-weight: 700;
  }
`;

const IconWrapper = styled.div`
  width: 16px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 16px;
  color: inherit;
`;

const IconInput = ({
  label,
  icon,
  width = 250,
  size,
  value,
  placeholder,
  ...rest
}) => {
  return (
    <Wrapper style={{ '--width': width + 'px' }}>
      <IconWrapper>
        <Icon id={icon} size="16px" />
      </IconWrapper>
      <StyledInput {...rest}>{value}</StyledInput>
      <VisuallyHidden>{label}</VisuallyHidden>
    </Wrapper>
  );
};

export default IconInput;
