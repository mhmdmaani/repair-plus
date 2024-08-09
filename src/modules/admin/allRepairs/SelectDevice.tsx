import { useDevicesByCategory } from '@/hooks/admin/useDevices';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { Brand, Category, Device } from 'prisma/prisma-client';
import React from 'react';

export default function SelectDevice({
  onSelect,
  selectedDevice,
  category,
  brand,
}: {
  onSelect: any;
  selectedDevice: any;
  brand: Brand | null;
  category: Category | null;
}) {
  const { data: devices } = useDevicesByCategory(category?.id || '');

  return (
    <List
      sx={{ maxHeight: 300, overflowY: 'auto', width: '100%', marginBottom: 2 }}
    >
      <ListItem
        button
        selected={selectedDevice === null}
        onClick={() => onSelect(null)}
      >
        <ListItemAvatar>
          <Avatar src='https://via.placeholder.com/150' alt='All' />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant='body1'>All</Typography>} />
      </ListItem>

      {devices?.map((device: Device) => (
        <ListItem
          key={device.id}
          button
          selected={selectedDevice?.id === device.id}
          onClick={() => onSelect(device)}
        >
          <ListItemAvatar>
            {device?.image ? (
              <img
                style={{
                  width: 40,
                }}
                src={device?.image}
                alt={device.name}
              />
            ) : (
              <Avatar>{device.name.charAt(0).toUpperCase()}</Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant='body1'>{device.name}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
}
