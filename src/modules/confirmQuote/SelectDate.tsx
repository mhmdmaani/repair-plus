import TimeSelect from '@/shared/inputs/TimeSelect';
import { styled, Select, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { addHours } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { useEffect, useState } from 'react';

const MainContainer = styled('div')`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  padding: 10px;
  padding-top: 20px;
  border-radius: 8px;
  position: relative;
`;
const InputContainer = styled('div')`
  margin-bottom: 10px;
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Option = styled('option')`
  padding: 10px;
  cursor: pointer;
  font-family: 'Uber Move', sans-serif;
  &:hover {
    background: #f4f4f4;
  }
`;

const MainLabel = styled('label')`
  font-size: 16px;
  font-weight: 600;
  position: absolute;
  top: -12px;
  background: ${(props) => props.theme.palette.background.default};
  border-radius: 10px;
  padding: 0 10px;
`;

const Row = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export default function SelectDate({
  label = 'Select Date',
  onChange,
  values,
  displayASAP = false,
}: {
  label?: string;
  onChange: (d: any) => void;
  values: any;
  displayASAP?: boolean;
}) {
  const [defaultFromValue, setDefaultFromValue] = useState('00:00');
  const [defaultToValue, setDefaultToValue] = useState('00:00');
  const handleSelect = (e: any) => {
    onChange({
      ...values,
      dateType: e.target.value,
    });
  };
  const onChangeDate = (d: any) => {
    onChange({
      ...values,
      selectedDate: d,
    });
  };

  const onChangeTime = (t: any, key: string) => {
    onChange({
      ...values,
      [key]: t,
    });
  };
  useEffect(() => {
    const hours = new Date().getHours().toString();
    const toHours = new Date(addHours(new Date(), 1)).getHours().toString();
    const minutes = '00';
    if (displayASAP && !values?.dateType) {
      onChange({
        ...values,
        fromTime: `${hours}:${minutes}`,
        toTime: `${toHours}:${minutes}`,
        dateType: '3',
      });
    } else if (values?.dateType === '3') {
      onChange({
        ...values,
        fromTime: `${hours}:${minutes}`,
        toTime: `${toHours}:${minutes}`,
      });
    } else if (values?.dateType === '0') {
      onChange({
        ...values,
        fromTime: `${hours}:${minutes}`,
        toTime: `${toHours}:${minutes}`,
      });
    } else if (values?.dateType === '1') {
      onChange({
        ...values,
        fromTime: `${toHours}:${minutes}`,
        toTime: `${toHours}:${minutes}`,
      });
    } else if (values?.dateType === '2') {
      onChange({
        ...values,
        fromTime: `${toHours}:${minutes}`,
        toTime: `${hours}:${minutes}`,
      });
    }
  }, [values?.dateType]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <MainContainer>
        <MainLabel>{label}</MainLabel>
        <InputContainer>
          <DatePicker
            sx={{
              width: '100%',
            }}
            onChange={onChangeDate}
            value={values?.selectedDate || new Date()}
          />
        </InputContainer>
        <Row>
          <InputContainer>
            <Select
              fullWidth
              onChange={handleSelect}
              value={values?.dateType || '0'}
            >
              <MenuItem value={'0'}>Between</MenuItem>
              <MenuItem value={'1'}>At</MenuItem>
              <MenuItem value={'2'}>Before</MenuItem>
              {displayASAP && <MenuItem value={'3'}>ASAP</MenuItem>}
            </Select>
          </InputContainer>

          {values?.dateType === '0' && (
            <>
              <InputContainer>
                <TimeSelect
                  value={values?.fromTime}
                  onChange={(t: any) => onChangeTime(t, 'fromTime')}
                  label='From'
                  placeholder='From'
                />
              </InputContainer>
              <InputContainer>
                <TimeSelect
                  value={values?.toTime}
                  onChange={(t: any) => onChangeTime(t, 'toTime')}
                  label='To'
                  placeholder='To'
                />
              </InputContainer>
            </>
          )}
          {values && (values?.dateType == '1' || values.dateType === '2') && (
            <InputContainer>
              <TimeSelect
                value={values?.fromTime}
                onChange={(t: any) => onChangeTime(t, 'fromTime')}
                label='Time'
                placeholder='Time'
              />
            </InputContainer>
          )}
        </Row>
      </MainContainer>
    </LocalizationProvider>
  );
}
