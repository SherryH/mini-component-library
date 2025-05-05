import React from 'react';
import { ControlledSelect } from './Select';
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
        onChangeRef.current(newValue);
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
