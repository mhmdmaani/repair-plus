import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from '@mui/material';

const Option = styled(MenuItem)`
  padding: 10px;
  cursor: pointer;
  font-family: 'Uber Move', sans-serif;
  &:hover {
    background: #f4f4f4;
  }
`;

export default function TimeSelect({
  value,
  onChange,
  defaultValue,
  label,
  placeholder,
  ...props
}: {
  defaultValue?: string;
  value: number | string;
  label: string;
  placeholder: string;
  onChange: any;
}) {
  const handleSelect = (val: string | number) => {
    onChange(val);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        fullWidth
        id={label}
        onChange={(t) => handleSelect(t.target.value)}
        value={value}
        defaultValue={defaultValue}
        label={label}
        placeholder={placeholder}
        variant='outlined'
        {...props}
      >
        <Option value={'0:00'}>00:00</Option>
        <Option value={'1:00'}>01:00</Option>
        <Option value={'1:30'}>01:30</Option>
        <Option value={'2:00'}>02:00</Option>
        <Option value={'2:30'}>02:30</Option>
        <Option value={'3:00'}>03:00</Option>
        <Option value={'3:30'}>03:30</Option>
        <Option value={'4:00'}>04:00</Option>
        <Option value={'4:30'}>04:30</Option>
        <Option value={'5:00'}>05:00</Option>
        <Option value={'5:30'}>05:30</Option>
        <Option value={'6:00'}>06:00</Option>
        <Option value={'6:30'}>06:30</Option>
        <Option value={'7:00'}>07:00</Option>
        <Option value={'7:30'}>07:30</Option>
        <Option value={'8:00'}>08:00</Option>
        <Option value={'8:30'}>08:30</Option>
        <Option value={'9:00'}>09:00</Option>
        <Option value={'9:30'}>09:30</Option>
        <Option value={'10:00'}>10:00</Option>
        <Option value={'10:30'}>10:30</Option>
        <Option value={'11:00'}>11:00</Option>
        <Option value={'11:30'}>11:30</Option>
        <Option value={'12:00'}>12:00</Option>
        <Option value={'12:30'}>12:30</Option>
        <Option value={'13:00'}>13:00</Option>
        <Option value={'13:30'}>13:30</Option>
        <Option value={'14:00'}>14:00</Option>
        <Option value={'14:30'}>14:30</Option>
        <Option value={'15:00'}>15:00</Option>
        <Option value={'15:30'}>15:30</Option>
        <Option value={'16:00'}>16:00</Option>
        <Option value={'16:30'}>16:30</Option>
        <Option value={'17:00'}>17:00</Option>
        <Option value={'17:30'}>17:30</Option>
        <Option value={'18:00'}>18:00</Option>
        <Option value={'18:30'}>18:30</Option>
        <Option value={'19:00'}>19:00</Option>
        <Option value={'19:30'}>19:30</Option>
        <Option value={'20:00'}>20:00</Option>
        <Option value={'20:30'}>20:30</Option>
        <Option value={'21:00'}>21:00</Option>
        <Option value={'21:30'}>21:30</Option>
        <Option value={'22:00'}>22:00</Option>
        <Option value={'22:30'}>22:30</Option>
        <Option value={'23:00'}>23:00</Option>
        <Option value={'23:30'}>23:30</Option>
      </Select>
    </FormControl>
  );
}
