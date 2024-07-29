'use client';
import { Button } from '@/components/ui/MovingBorders';
import {
  Avatar,
  Container,
  Grid,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { Repair } from 'prisma/prisma-client';
import React, { useMemo } from 'react';

const MainContainer = styled(Container)`
  padding-top: 150px;
  position: relative;
`;
const ImageContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
`;

const Label = styled(Typography)`
  font-size: 1rem;
  font-weight: 700;
`;

const Section = styled('div')`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%;
`;
const DeviceSection = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const DeviceImage = styled('img')`
  width: 50px;
  height: auto;
`;

const BrandImage = styled('img')`
  width: 75px;
  height: auto;
`;

const ColorSection = styled('div')<{
  color: string;
}>`
  width: 35px;
  height: 35px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
`;

const Price = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;
function RepairPage({ repair }: { repair: any }) {
  const totalPrice = useMemo(() => {
    return parseFloat(repair?.sellPrice) + parseFloat(repair.repairingPrice);
  }, [repair]);

  return (
    <MainContainer>
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12}>
            <ImageContainer>
              <img src={repair?.image || ''} alt={repair?.name} />
            </ImageContainer>
          </Grid>
          <Grid item lg={6} md={6} sm={12}>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <div>
                <Title>{repair?.name}</Title>
                <p>{repair?.description}</p>
              </div>
              <BrandImage src={repair?.device?.brand?.logo} />
            </Stack>

            <Section>
              <Stack
                direction={'row'}
                spacing={2}
                justifyContent={'space-between'}
              >
                <DeviceSection>
                  <DeviceImage src={repair?.device?.image} />
                  <Typography>{repair?.device?.name}</Typography>
                </DeviceSection>

                <DeviceSection>
                  <ColorSection color={repair?.color || '#fff'} />
                  <Typography>{repair?.color}</Typography>
                </DeviceSection>
              </Stack>
            </Section>
            <Section>
              {repair?.quantity <= 0 ? (
                <Label>Out of Stock</Label>
              ) : (
                <Label>In Stock</Label>
              )}
            </Section>

            <Section>
              <Section>
                <Price>
                  {totalPrice.toLocaleString('sv', {
                    style: 'currency',
                    currency: 'SEK',
                  })}
                </Price>
              </Section>
              <Button
                containerClassName='p-1 w-full hover:scale-105'
                className='h-16'
              >
                Add to Cart
              </Button>
            </Section>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  );
}

export default RepairPage;
