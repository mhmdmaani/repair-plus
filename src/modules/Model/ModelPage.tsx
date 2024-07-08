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
} from '@mui/material';
import { Repair } from 'prisma/prisma-client';
import React, { useEffect, useState } from 'react';
import RepairDetails from './RepairDetails';
import RepairPopUp from './RepairPopUp';
import { useDevice } from '@/hooks/admin/useDevices';

const CustomImage = styled('img')`
  transition: all 0.5s ease-in-out;
`;

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
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

  return (
    <Container>
      <Stack
        justifyContent={'space-between'}
        direction='row'
        alignItems='center'
      >
        <div>
          <Typography variant='h4' textAlign={'center'} fontWeight={'bold'}>
            {model?.name}
          </Typography>
        </div>
        <SearchContainer>
          <TextField
            fullWidth
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
        {results.map((repair) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={repair.id}>
            <Card
              sx={{
                cursor: 'pointer',
                marginTop: '30px',
              }}
            >
              <CardMedia
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 300,
                  overflow: 'hidden',
                }}
              >
                <CustomImage
                  src={repair.image || ''}
                  alt={repair.name}
                  style={{
                    width: '60%',
                    height: '90%',
                    objectFit: 'cover',
                    margin: 'auto',
                  }}
                />
              </CardMedia>
              <CardContent
                style={{
                  height: '75px',
                  display: 'flex',
                }}
              >
                <Typography
                  variant='body2'
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  {repair.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={() => {
                    setCurrentRepair(repair);
                    setOpen(true);
                  }}
                >
                  {`${repair.sellPrice} ${settings?.currencySymbol}`}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <RepairPopUp open={open} setOpen={setOpen}>
        <RepairDetails repair={currentRepair} />
      </RepairPopUp>
    </Container>
  );
}
