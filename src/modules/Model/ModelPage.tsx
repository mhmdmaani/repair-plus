'use client';
import { useSettings } from '@/hooks/useSettings';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Box,
  Typography,
  styled,
  CardActionArea,
  CardActions,
  Button,
  TextField,
  Stack,
  Avatar,
} from '@mui/material';
import { Repair } from 'prisma/prisma-client';
import React, { useEffect, useState } from 'react';
import RepairDetails from './RepairDetails';
import RepairPopUp from './RepairPopUp';
import { useDevice } from '@/hooks/admin/useDevices';
import Link from 'next/link';

const CustomImage = styled('img')`
  transition: all 0.5s ease-in-out;
`;

const SearchContainer = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function ModelPage({
  deviceId,
  repairs,
}: {
  repairs: Repair[];
  deviceId: string;
}) {
  const { data: settings } = useSettings();
  const { data: model } = useDevice(deviceId);
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<Repair[]>([]);
  const [currentRepair, setCurrentRepair] = useState<Repair | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (search) {
      setResults(
        repairs.filter((repair) =>
          repair.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setResults(repairs);
    }
  }, [search, repairs]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className='bg-black-100 min-h-screen pt-28'>
      <Container>
        <Stack
          justifyContent={'space-between'}
          direction='row-reverse'
          alignItems='center'
          width='100%'
        >
          <SearchContainer>
            <TextField
              value={search}
              label={'Search By Name'}
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{
                type: 'search',
              }}
            />
          </SearchContainer>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography
              variant='h4'
              textAlign={'center'}
              fontWeight={'bold'}
              marginBottom={2}
            >
              {`${model?.name} ${
                model?.modelNumber ? `(${model?.modelNumber})` : ''
              }`}
            </Typography>
            <img
              src={model?.image}
              alt={model?.name}
              className='w-full h-auto'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div className='w-full pt-8'>
              {results.map((repair) => (
                <div className='w-fill p-2 flex justify-between items-center border-b-2 border-white-100'>
                  <div className='flex items-center'>
                    {!repair?.image || repair?.image === '' ? (
                      <Avatar>{repair?.name.charAt(0).toUpperCase()}</Avatar>
                    ) : (
                      <img
                        src={repair?.image || ''}
                        alt={repair?.name}
                        className='w-12 h-auto mr-3'
                      />
                    )}

                    <Typography variant='h6' fontWeight={'bold'} marginLeft={2}>
                      {repair?.name}
                    </Typography>
                  </div>
                  <div>
                    {formatPrice(repair?.sellPrice + repair?.repairingPrice)}
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
        <RepairPopUp open={open} setOpen={setOpen}>
          <RepairDetails repair={currentRepair} />
        </RepairPopUp>
      </Container>
    </div>
  );
}
