'use client';
import { useAllBrands } from '@/hooks/admin/useBrands';
import { useCategoriesByBrand } from '@/hooks/admin/useCategories';
import { useDevice, useDevicesByCategory } from '@/hooks/admin/useDevices';
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
import { Brand, Category, Device, Repair } from 'prisma/prisma-client';
import React from 'react';

const CustomListItem = styled(ListItem)<{
  selected: boolean;
}>`
  ${({ selected }) =>
    selected
      ? `
    background-color: #000319;
    border-left: 4px solid #CBACF9;
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
    background-color: transparent;
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

export default function SelectDevice({ brands }: { brands: Brand[] }) {
  const { data: settings } = useSettings();
  const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  const [selectedDevice, setSelectedDevice] = React.useState<Device | null>(
    null
  );
  const [selectedRepair, setSelectedRepair] = React.useState<Repair | null>(
    null
  );
  const { data: brand } = useBrandTree(selectedBrand?.id || '');
  const { data: categories } = useCategoriesByBrand(
    selectedBrand?.id || '',
    false
  );

  const { data: devices } = useDevicesByCategory(selectedCategory?.id || '');

  const { data: device } = useDeviceTree(selectedDevice?.id || '');
  return (
    <div className=' mt-32 '>
      <Container
        style={{
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        <Fade in timeout={1500}>
          <h1 className='heading mb-8'>
            Select What You Want
            <span className='text-purple ml-1'> To Repair</span>
          </h1>
        </Fade>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div
              className=' border-4 border-purple overflow-y-auto p-2'
              style={{ height: 700 }}
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
                      <Image src={brand?.logo || ''} alt={brand?.name} />
                    </ListItemIcon>
                    <CustomText>
                      <ListItemText primary={brand?.name} />
                    </CustomText>
                  </CustomListItem>
                ))}
              </List>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div
              className=' border-4 border-purple overflow-y-auto p-2'
              style={{ height: 700 }}
            >
              <List component='nav' aria-label='main mailbox folders'>
                {categories?.map((cat: Category) => (
                  <CustomListItem
                    key={cat.id}
                    disablePadding
                    onClick={() => setSelectedCategory(cat)}
                    selected={selectedCategory?.id === cat.id}
                  >
                    <ListItemIcon>
                      <Image src={cat?.image || ''} alt={cat.name} />
                    </ListItemIcon>
                    <CustomText>
                      <ListItemText primary={cat.name} />
                    </CustomText>
                  </CustomListItem>
                ))}
              </List>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div
              className=' border-4 border-purple overflow-y-auto p-2'
              style={{ height: 700 }}
            >
              <List component='nav' aria-label='main mailbox folders'>
                {devices?.map((device: Device) => (
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
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <div
              className=' border-4 border-purple overflow-y-auto p-2'
              style={{ height: 700 }}
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
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
