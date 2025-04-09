import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import Icon from '../Icon';
import { getDisplayedValue } from './Select.helpers';

// we need to make nativeSelect full width and full height to match StyledSelect
// so that when clicking on it, the select content opens
// because NativeSelect is taken out of the flow so one clickable surface
const NativeSelect = styled.select`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: max-content;
  position: relative;
`;

const StyledSelect = styled.div`
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 100%;
  color: ${COLORS.gray700};
  background: ${COLORS.transparentGray15};
  padding: 12px 16px;
  padding-right: 60px;
  border-radius: 8px;

  ${NativeSelect}:hover + & {
    color: ${COLORS.black};
  }

  ${NativeSelect}:focus + & {
    outline: 2px solid -webkit-focus-ring-color;
  }
`;

// with inline-block display and absolute position,
// tried flexbox but couldnt get the accurate pixel control wanted

// It is better to separate IconWrapper from Icon, so that Wrapper can focus on positioning and spacing
// Easier to apply different spacing for icons in different context

// to place the absolutely positioned item in the middle
// we need to constraint the height to 24px so that margin:auto takes effect
// else height takes full height to be 40px

const StyledIconWrapper = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  right: 12px;
  width: 24px;
  height: 24px;
  pointer-events: none;
`;

const Select = ({ label, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <Wrapper>
      <NativeSelect value={value} onChange={onChange}>
        {children}
      </NativeSelect>
      <StyledSelect>
        {displayedValue}
        <StyledIconWrapper>
          <Icon id="chevron-down" size={24} strokeWidth={2} />
        </StyledIconWrapper>
      </StyledSelect>
    </Wrapper>
  );
};

export default Select;
