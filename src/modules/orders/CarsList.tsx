import { useAssignTruckToOrder, useSearchTrucks } from '@/hooks/admin/useTruck';
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Switch,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { Truck } from 'prisma/prisma-client';
import { useState } from 'react';
import TruckForm from '../admin/truck/TruckForm';

const TruckItem = styled('div')<{ selected: boolean }>`
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.palette.primary.main : theme.palette.grey[300]};
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const SearchContainer = styled('div')`
  padding: 20px 0;
`;
const Row = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

export default function CarsList({
  open,
  setOpen,
  selectedCar,
  setSelectedCar,
  orderId,
  truckTypeId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCar: string | null;
  setSelectedCar: (d: any) => void;
  orderId: string;
  truckTypeId: string;
}) {
  const [searchKey, setSearchKey] = useState('');
  const { data: trucks } = useSearchTrucks(searchKey, truckTypeId);
  const [isNew, setIsNew] = useState(false);
  const assignMutation = useAssignTruckToOrder();

  const onAdd = (truck: any) => {
    assignMutation.mutate({
      orderId: orderId,
      truckId: truck.id,
    });
    setOpen(false);
  };

  const onSelect = (truck: Truck) => {
    assignMutation.mutate({
      orderId: orderId,
      truckId: truck.id,
    });
    setOpen(false);
  };

  return (
    <Dialog
      sx={{
        width: '100%',
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Assign Truck</DialogTitle>
      <DialogContent
        sx={{
          width: 500,
          '@media (max-width: 600px)': {
            width: 300,
          },
        }}
      >
        <SearchContainer>
          <TextField
            fullWidth
            label='Search'
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Row>
            <Typography variant='caption'>Another Truck?</Typography>
            <Switch checked={isNew} onChange={() => setIsNew(!isNew)} />
          </Row>
        </SearchContainer>
        {isNew ? (
          <TruckForm onAdd={onAdd} truckTypeId={truckTypeId} />
        ) : (
          <>
            {trucks?.map((truck: Truck) => (
              <TruckItem
                onClick={() => {
                  onSelect(truck);
                }}
                selected={selectedCar === truck?.id}
                key={truck.id}
              >
                {truck?.image && truck?.image !== '' ? (
                  <Avatar src={truck?.image} />
                ) : (
                  <Avatar>{truck?.plate[0]}</Avatar>
                )}
                <Typography>{truck?.plate}</Typography>
              </TruckItem>
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
