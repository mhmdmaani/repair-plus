import { MenuItem, Select, styled } from '@mui/material';

const Option = styled(MenuItem)`
  padding: 10px;
  cursor: pointer;
  font-family: 'Uber Move', sans-serif;
  &:hover {
    background: #f4f4f4;
  }
`;

export default function AdditionalTimeSelect({
  value,
  onChange,
  defaultValue,
  label,
  placeholder,
  ...props
}: {
  defaultValue?: string;
  value: number | string;
  onChange: any;
  label?: string;
  placeholder?: string;
}) {
  const handleSelect = (val: string | number) => {
    onChange(val);
  };
  return (
    <Select
      fullWidth
      onChange={(t) => handleSelect(t.target.value)}
      value={value}
      defaultValue={defaultValue}
    >
      <Option value={0}>No Additional Time</Option>
      <Option value={1}>1 Hour more</Option>
      <Option value={1.5}>1 Hour and 30 minutes more</Option>
      <Option value={2}>2 Hours more</Option>
      <Option value={2.5}>2 Hours and 30 minutes more</Option>
      <Option value={3}>3 Hours more</Option>
      <Option value={3.5}>3 Hours and 30 minutes more</Option>
      <Option value={4}>4 Hours more</Option>
      <Option value={4.5}>4 Hours and 30 minutes more</Option>
      <Option value={5}>5 Hours more</Option>
      <Option value={5.5}>5 Hours and 30 minutes more</Option>
      <Option value={6}>6 Hours more</Option>
      <Option value={6.5}>6 Hours and 30 minutes more</Option>
      <Option value={7}>7 Hours more</Option>
      <Option value={7.5}>7 Hours and 30 minutes more</Option>
      <Option value={8}>8 Hours more</Option>
      <Option value={8.5}>8 Hours and 30 minutes more</Option>
      <Option value={9}>9 Hours more</Option>
      <Option value={9.5}>9 Hours and 30 minutes more</Option>
      <Option value={10}>10 Hours more</Option>
    </Select>
  );
}
