import { useAllDrivers, useAssignDriverToOrder } from '@/hooks/admin/useDriver';
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
import { Driver } from 'prisma/prisma-client';
import { useState } from 'react';
import DriverForm from '../admin/driver/DriverForm';

const DriverItem = styled('div')<{ selected: boolean }>`
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

export default function DriversList({
  open,
  setOpen,
  selectedDriver,
  setSelectedDriver,
  orderId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedDriver: string | null;
  setSelectedDriver: (d: any) => void;
  orderId: string;
}) {
  const [searchKey, setSearchKey] = useState('');
  const { data: drivers } = useAllDrivers(searchKey);
  const [isNew, setIsNew] = useState(false);
  const assignMutation = useAssignDriverToOrder();

  const onAdd = (driver: any) => {
    assignMutation.mutate({
      orderId: orderId,
      driverId: driver.id,
    });
    setOpen(false);
  };

  const onSelect = (driver: Driver) => {
    assignMutation.mutate({
      orderId: orderId,
      driverId: driver.id,
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
      <DialogTitle>Assign Driver</DialogTitle>
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
            <Typography variant='caption'>Another Driver?</Typography>
            <Switch checked={isNew} onChange={() => setIsNew(!isNew)} />
          </Row>
        </SearchContainer>
        {isNew ? (
          <DriverForm onAdd={onAdd} />
        ) : (
          <>
            {drivers?.map((driver: Driver) => (
              <DriverItem
                onClick={() => {
                  onSelect(driver);
                }}
                selected={selectedDriver === driver?.id}
                key={driver.id}
              >
                {driver?.image && driver?.image !== '' ? (
                  <Avatar src={driver?.image} />
                ) : (
                  <Avatar>{driver?.name[0]}</Avatar>
                )}
                <Typography>{driver?.name}</Typography>
              </DriverItem>
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
