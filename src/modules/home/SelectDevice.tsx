'use client';
import { useAllBrands } from '@/hooks/admin/useBrands';
import { useDevice } from '@/hooks/admin/useDevices';
import { useBrandTree } from '@/hooks/useBrandTree';
import { useDeviceTree } from '@/hooks/useDeviceTree';
import { useSettings } from '@/hooks/useSettings';
import {
  Box,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  styled,
  Fade,
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
    padding-left: 16px;
    margin-bottom: 10px;
    height:80px;
    gap: 10px;
    transition:all 0.3s ease-in-out;
    cursor: pointer;
  `
      : `
    padding-left: 20px
    margin-bottom: 10px;
    height:80px;
    gap: 10px;
    transition:all 0.3s ease-in-out;
    cursor: pointer;
      `};
`;

const CustomText = styled('div')`
  display: flex;
  gap: 10px;
  align-items: center;
  flex: 1;
`;

const Image = styled('img')`
  width: 50px;
  height: auto;
`;

const Title = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const Tagline = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const Divider = styled('div')`
  width: 120px;
  height: 5px;
  background: ${(props) => props.theme.palette.primary.main};
  margin-top: 10px;
  border-radius: 20px;
  margin-bottom: 20px;
`;

export default function SelectDevice() {
  const { data: settings } = useSettings();
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
    <Container
      style={{
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Fade in timeout={1500}>
        <Tagline
          data-aos={'fade'}
          variant='h5'
          color={'primary'}
          fontWeight={'bold'}
        >
          About Us
        </Tagline>
      </Fade>
      <Divider />
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
                    <Image src={brand?.logo || ''} alt={brand.name} />
                  </ListItemIcon>
                  <CustomText>
                    <ListItemText primary={brand.name} />
                  </CustomText>
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
                    <Image
                      src={device?.image || ''}
                      alt={brand.name}
                      width={30}
                      height={30}
                    />
                  </ListItemIcon>
                  <CustomText>
                    <ListItemText primary={device.name} />
                  </CustomText>
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
                    <Image
                      src={repair?.image || ''}
                      alt={repair.name}
                      width={30}
                      height={30}
                    />
                  </ListItemIcon>
                  <CustomText>
                    <ListItemText primary={repair.name} />
                    <Typography variant='body2'>{`${repair.sellPrice}${settings?.currencySymbol}`}</Typography>
                  </CustomText>
                </CustomListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
