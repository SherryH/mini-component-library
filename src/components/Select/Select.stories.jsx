import Select, { UncontrolledSelect } from './Select';

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Select/Uncontrolled',
  id: 'Select',
  parameters: {
    design: {
      url: 'https://www.figma.com/design/u0wCdLXheiN9f2FmAuPsE9/Mini-Component-Library?node-id=0-1&p=f&t=ShXKjJ0few5CLAiV-0',
    },
  },
};
export default meta;

export const Uncontrolled = () => {
  return (
    <>
      <label
        htmlFor="uncontrolled"
        style={{
          display: 'block',
          marginBottom: '0.5em',
        }}
      >
        Filter by:
      </label>
      <Select
        id="uncontrolled"
        label="Sort"
        defaultValue="price"
        onChange={(value) => {
          console.log(value);
        }}
      >
        <option value="newest">Newest Releases</option>
        <option value="price">Price</option>
        <option value="curated">Curated</option>
      </Select>
    </>
  );
};
