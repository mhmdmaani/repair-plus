import { useSettings } from '@/hooks/useSettings';
import { Box, Button, Grid, Stack, Typography, styled } from '@mui/material';
import { Repair } from 'prisma/prisma-client';
import React from 'react';

const Content = styled(Box)`
  padding: 10px;
`;

const CustomImage = styled('img')`
  width: 100%;
  height: auto;
`;

const Title = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Description = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;
export default function RepairDetails({ repair }: { repair: Repair | null }) {
  const { data: setting } = useSettings();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <CustomImage src={repair?.image || ''} alt={repair?.name} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Content>
          <Title variant='h6' fontWeight={'bold'}>
            {repair?.name}
          </Title>
          <Description variant='body2'>{repair?.description}</Description>
          <Stack direction='row' spacing={2}>
            <Typography variant='h6'>
              Price: {repair?.sellPrice} {setting?.currencySymbol}
            </Typography>
            <Typography variant='h6'>Price: {repair?.sellPrice} €</Typography>
          </Stack>
        </Content>
      </Grid>
      <Stack direction='row' spacing={2}>
        <Button variant='contained' color='primary'>
          Book Repair
        </Button>
      </Stack>
    </Grid>
  );
}
