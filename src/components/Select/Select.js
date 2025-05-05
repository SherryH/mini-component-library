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

// Controlled Select
export const ControlledSelect = ({ value, onChange, children, ...rest }) => {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <Wrapper>
      <NativeSelect value={value} onChange={onChange} {...rest}>
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

// Keep the state internally
// pass the data out using the onChange callback
export const UncontrolledSelect = ({ children, defaultValue, onChange }) => {
  const [value, setValue] = React.useState(defaultValue);
  const onChangeCallback = React.useCallback(onChange, []);
  React.useEffect(() => {
    onChange(value);
  }, [value, onChangeCallback]);
  return (
    <ControlledSelect
      id="filter-by"
      defaultValue={defaultValue}
      value={value}
      onChange={(ev) => {
        setValue(ev.target.value);
      }}
    >
      {children}
    </ControlledSelect>
  );
};

// Inside Uncontrolled components, the states are managed within the component itself.
// parent cannot access the state data directly as they do in Controlled component
// To access the data inside Uncontrolled components, we can use FormData to get data from Form submission

// It is difficult for consumers to decided which components (Controlled vs Uncontrolled) to use
// To makes things easier, it is best to internally toggle Controlled vs Uncontrolled components
// based on the props passed in

// https://github.com/radix-ui/primitives/blob/main/packages/react/use-controllable-state/src/use-controllable-state.tsx#L5

export const Select = ({ value, defaultValue, onChange, children }) => {
  // if value is present, then this is a Controlled Component, else it is an Uncontrolled Component

  // If Controlled Component, the state is managed outside,
  // prop.value = valueStateOutside
  // prop.onChange = setValueStateOutside  set the valueState to a new value onChange

  const isControlled = value !== undefined;
  const SelectElement = isControlled ? ControlledSelect : UncontrolledSelect;
  return (
    <SelectElement
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {children}
    </SelectElement>
  );
};

export default Select;

// if Uncontrolled
// value = valueStateInside (default value is sensible default or defaultValue)
// onChange = callback(value) >> pass the value outside via callback function

// if I have a useControllableState(prop, defaultProp, onChange) hook
// I want to return a {valueState, setValueState}
// if Controlled, valueState = prop, setValueState = onChange(value)

// If Uncontrolled, valueState = useUncontrolledState(defaultProp, onChange)
//

// useUncontrolledState(defaultProp, onChange)

function useControllableState({ prop, defaultProp, onChange }) {
  // if Controlled, use the state and setState passed in from outside
  // ignore defaultProp, as it is only used in UncontrolledState
  /**
   * const [value, setValue] = React.useState('newest');
   * <Select value={value} onChange={(ev) => setValue(ev.target.value)} >
   * </Select>
   */

  // the component is controlled if prop is not defined
  const isControlled = prop !== undefined;
  // prop is uncontrolled
  // the defaultProp is used if provided
  // create the states here
  // Not using else {} here as React hooks cant be used inside conditionals
  const { uncontrolledValue, setUncontrolledValue, onChangeRef } =
    useUncontrolledState(defaultProp, onChange);

  let value = isControlled ? prop : uncontrolledValue;
  // const setValue = isControlled ? controlledSetter : setUncontrolledValue;
  const setValue = React.useCallback(
    (nextValue) => {
      const isFunction = (nextValue) => typeof nextValue === 'function';
      if (isControlled) {
        const newValue = isFunction(nextValue) ? nextValue(prop) : nextValue;
        console.log({ nextValue });
        onChangeRef(newValue);
      } else {
        setUncontrolledValue(nextValue);
      }
    },
    [isControlled, prop, onChangeRef, setUncontrolledValue]
  );

  // return the state setter set to make API contract consistent
  return { value, setValue };
}

function useUncontrolledState(defaultProp, onChange) {
  // handle Uncontrolled
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultProp);

  const onChangeRef = React.useRef(onChange);
  const preValue = React.useRef(uncontrolledValue);
  // Update the ref when value changes
  React.useEffect(() => {
    if (preValue.current !== uncontrolledValue) {
      onChangeRef.current(uncontrolledValue);
      preValue.current = uncontrolledValue;
    }
  }, [uncontrolledValue]);

  // Update the ref when onChange changes
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  return { uncontrolledValue, setUncontrolledValue, onChangeRef };
}

export const SelectUsingControllableHook = ({
  children,
  value: propValue,
  defaultValue,
  onChange,
}) => {
  // Create Controlled version first

  // if Controlled,
  const { value, setValue } = useControllableState({
    prop: propValue,
    onChange: onChange,
    defaultProp: defaultValue,
  });

  return (
    <ControlledSelect
      value={value}
      onChange={(ev) => {
        setValue(ev.target.value);
      }}
    >
      {children}
    </ControlledSelect>
  );
};
