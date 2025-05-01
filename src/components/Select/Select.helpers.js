import React from 'react';

export function getDisplayedValue(value, children) {
  if (!value) return null;
  const childArray = React.Children.toArray(children);
  const selectedChild = childArray.find((child) => child.props.value === value);
  console.log({ value });
  console.log(children);
  return selectedChild.props.children;
}
