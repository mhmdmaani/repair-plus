'use client';
import { useAllBrands } from '@/hooks/admin/useBrands';
import { useDevice } from '@/hooks/admin/useDevices';
import { useBrandTree } from '@/hooks/useBrandTree';
import { useDeviceTree } from '@/hooks/useDeviceTree';
import {
  Box,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import { Brand, Device, Repair } from 'prisma/prisma-client';
import React from 'react';

const CustomListItem = styled(ListItem)<{
  selected: boolean;
}>`
  ${({ selected }) =>
    selected
      ? `
    background-color: #f5f5f5;
    border-left: 4px solid #3f51b5;
  `
      : ''};
`;
export default function SelectDevice() {
  const { data: brands, isLoading } = useAllBrands();
  const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);
  const [selectedDevice, setSelectedDevice] = React.useState<Device | null>(
    null
  );
  const [selectedRepair, setSelectedRepair] = React.useState<Repair | null>(
    null
  );
  const { data: brand } = useBrandTree(selectedBrand?.id || '');
  const { data: device } = useDeviceTree(selectedDevice?.id || '');
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{
              width: '100%',
              height: 400,
              overflow: 'auto',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            <List component='nav' aria-label='main mailbox folders'>
              {brands?.map((brand: Brand) => (
                <CustomListItem
                  key={brand.id}
                  disablePadding
                  onClick={() => setSelectedBrand(brand)}
                  selected={selectedBrand?.id === brand.id}
                >
                  <ListItemIcon>
                    <img
                      src={brand?.logo || ''}
                      alt={brand.name}
                      width={30}
                      height={30}
                    />
                  </ListItemIcon>
                  <ListItemButton>
                    <ListItemText primary={brand.name} />
                  </ListItemButton>
                </CustomListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{
              width: '100%',
              height: 400,
              overflow: 'auto',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            <List component='nav' aria-label='main mailbox folders'>
              {brand?.devices?.map((device: Device) => (
                <CustomListItem
                  key={device.id}
                  disablePadding
                  onClick={() => setSelectedDevice(device)}
                  selected={selectedDevice?.id === device.id}
                >
                  <ListItemIcon>
                    <img
                      src={device?.image || ''}
                      alt={brand.name}
                      width={30}
                      height={30}
                    />
                  </ListItemIcon>
                  <ListItemButton>
                    <ListItemText primary={device.name} />
                  </ListItemButton>
                </CustomListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{
              width: '100%',
              height: 400,
              overflow: 'auto',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
            <List component='nav' aria-label='main mailbox folders'>
              {device?.repairs?.map((repair: Repair) => (
                <CustomListItem
                  key={repair.id}
                  disablePadding
                  onClick={() => setSelectedRepair(repair)}
                  selected={selectedRepair?.id === repair.id}
                >
                  <ListItemIcon>
                    <img
                      src={repair?.image || ''}
                      alt={repair.name}
                      width={30}
                      height={30}
                    />
                  </ListItemIcon>
                  <ListItemButton>
                    <ListItemText primary={repair.name} />
                  </ListItemButton>
                </CustomListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
