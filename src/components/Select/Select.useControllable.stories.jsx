import React from 'react';
import Select from './Select';
import { SelectUsingControllableHook } from './Select.useControllable';

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Select/UseControllableState',
  id: 'Select',
  parameters: {
    design: {
      url: 'https://www.figma.com/design/u0wCdLXheiN9f2FmAuPsE9/Mini-Component-Library?node-id=0-1&p=f&t=ShXKjJ0few5CLAiV-0',
    },
  },
};
export default meta;

export const ControlledUsingHook = () => {
  const [value, setValue] = React.useState('newest');
  return (
    <SelectUsingControllableHook
      value={value}
      onChange={(value) => setValue(value)}
    >
      <option value="newest">Newest Releases</option>
      <option value="price">Price</option>
    </SelectUsingControllableHook>
  );
};

export const UncontrolledUsingHook = () => {
  return (
    <SelectUsingControllableHook
      defaultValue="price"
      onChange={(value) => {
        console.log(value);
      }}
    >
      <option value="newest">Newest Releases</option>
      <option value="price">Price</option>
    </SelectUsingControllableHook>
  );
};
