'use client';
import { useAllDevices } from '@/hooks/admin/useDevices';
import { useImportRepairs } from '@/hooks/admin/useRepairs';
import SlideModal from '@/shared/modals/SlideModal';
import {
  Autocomplete,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Device } from 'prisma/prisma-client';
import React from 'react';

const FeildContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (max-width: 1000px) {
    gap: 5px;
  }
`;

export default function ImportRepairsDialog({
  targetDeviceId,
  open,
  setOpen,
}: {
  targetDeviceId: string;
  open: boolean;
  setOpen: any;
}) {
  const [selectedDevice, setSelectedDevice] = React.useState<any>('');

  const { data: allDevices } = useAllDevices();
  const importMutation = useImportRepairs();

  const onImport = () => {
    importMutation.mutate({
      targetId: targetDeviceId,
      sourceId: selectedDevice?.id,
    });
    // Implement this function
  };
  return (
    <SlideModal open={open} setOpen={setOpen} title='Import Repairs'>
      <div
        className='text-lg p-2'
        style={{
          height: '500px',
        }}
      >
        <Typography variant='body2'>
          Import Repairs from other Device
        </Typography>

        <FeildContainer>
          <Autocomplete
            disablePortal
            options={
              allDevices?.map((option: any) => ({
                id: option.id,
                label: option.name,
              })) || []
            }
            value={selectedDevice}
            onChange={(event, newValue) => setSelectedDevice(newValue)}
            renderInput={(params) => <TextField {...params} label='Model' />}
          />
        </FeildContainer>

        <Stack direction='row' spacing={2}>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color='error'
            onClick={() => {
              onImport();
              setOpen(false);
            }}
            disabled={
              (selectedDevice === null ||
                selectedDevice === '' ||
                importMutation.status) === 'pending'
            }
          >
            {`Import`}
          </Button>
        </Stack>
      </div>
    </SlideModal>
  );
}
