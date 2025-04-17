import IconInput from './IconInput';

const meta = {
  component: IconInput,
  tags: ['autodocs'],
  title: 'IconInput/CSF',
  id: 'IconInputCSF',
  parameters: {
    design: {
      url: 'https://www.figma.com/design/u0wCdLXheiN9f2FmAuPsE9/Mini-Component-Library?node-id=0-1&p=f&t=ShXKjJ0few5CLAiV-0',
    },
  },
};
export default meta;

export const IconInputStyled = {
  args: {
    size: 'small',
    width: '500px',
    icon: 'search',
    label: 'Search',
    placeholder: 'Search...',
    value: '',
  },
};

export const IconInputWithAtSign = {
  args: {
    size: 'large',
    width: '300px',
    icon: 'at-sign',
    label: 'Email',
    placeholder: 'Enter your email...',
    value: '',
  },
};
