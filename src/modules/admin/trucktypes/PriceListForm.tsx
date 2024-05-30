'use client';
import {
  useCreatePriceList,
  useUpdatePricelist,
} from '@/hooks/admin/usePricelist';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { PriceList as PriceListType } from 'prisma/prisma-client';
import { useEffect, useState } from 'react';

const FormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  @media (max-width: 1000px) {
    gap: 5px;
  }
`;
export default function PriceListForm({
  priceList,
  truckTypeId,
  open,
  onClose,
}: {
  priceList?: PriceListType;
  truckTypeId: string;
  open: boolean;
  onClose: () => void;
}) {
  const updateMutation = useUpdatePricelist(priceList?.id || '');
  const createMutation = useCreatePriceList();
  const [day, setDay] = useState('0');
  const [from, setFrom] = useState<any>('');
  const [to, setTo] = useState<any>('');
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (priceList) {
      setDay(priceList.day);
      setFrom(priceList.fromTime);
      setTo(priceList.toTime);
      setPrice(priceList.price);
    }
  }, [priceList]);

  const onSubmit = () => {
    const dt: PriceListType = {
      id: priceList?.id || '',
      truckTypeId: truckTypeId,
      day: day,
      fromTime: format(new Date(from), 'HH:mm') || '',
      toTime: format(new Date(to), 'HH:mm') || '',
      price: price,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (priceList) {
      updateMutation.mutate(dt);
    } else {
      createMutation.mutate(dt);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Price List</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <DialogContent
          sx={{
            width: 500,
            padding: 2,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <FormContainer>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Day</InputLabel>
              <Select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                label='Day'
                fullWidth
                placeholder='Day'
              >
                <MenuItem value='0'>Sunday</MenuItem>
                <MenuItem value='1'>Monday</MenuItem>
                <MenuItem value='2'>Tuesday</MenuItem>
                <MenuItem value='3'>Wednesday</MenuItem>
                <MenuItem value='4'>Thursday</MenuItem>
                <MenuItem value='5'>Friday</MenuItem>
                <MenuItem value='6'>Saturday</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TimePicker
                value={from}
                onChange={(t) => setFrom(t)}
                label='From'
              />
            </FormControl>
            <FormControl fullWidth>
              <TimePicker value={to} onChange={(t) => setTo(t)} label='To' />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label='Price'
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                type='number'
              />
            </FormControl>
            <FormControl fullWidth>
              <Button onClick={onSubmit}>Save</Button>
            </FormControl>
          </FormContainer>
        </DialogContent>
      </LocalizationProvider>
    </Dialog>
  );
}
