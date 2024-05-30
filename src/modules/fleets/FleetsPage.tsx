'use client';
import React from 'react';
import TopHeader from '@/modules/home/TopHeader';
import Footer from '@/shared/layout/Footer';
import {
  Container,
  styled,
  Typography,
  LinearProgress,
  Grid,
} from '@mui/material';
import { useAllTruckTypes } from '@/hooks/admin/useTruckTypes';
import { TruckType } from 'prisma/prisma-client';
import VanItem from '../CreateQuote/VanItem';
import FleetItem from './FleetItem';
import Appbar from '@/shared/layout/Appbar';
import { useStateValue } from '@/providers/StateContext';
import { useRouter } from 'next/navigation';

const MainContainer = styled('div')`
  overflow-x: hidden;
`;

const FleetsContent = styled('div')`
  min-height: calc(100vh - 200px);
`;
const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: bolder;
  margin: 10px 0;
  @media (max-width: 1000px) {
    font-size: 1rem;
    margin: 5px 0;
  }
`;

const LoadingContainer = styled('div')`
  width: 100%;
  position: fixed;
  top: 65px;
  z-index: 1000;
`;

export default function FleetsPage() {
  const { data, isLoading } = useAllTruckTypes();
  const { state, dispatch } = useStateValue();
  const router = useRouter();

  const onSelect = (item: any) => {
    dispatch({ type: 'SELECT_TRUCK_TYPE', payload: item });
    router.push('/quote');
  };
  return (
    <MainContainer>
      <TopHeader />
      <Appbar />
      <FleetsContent>
        <Container>
          <Title>Our Fleets</Title>
          {isLoading ? (
            <LoadingContainer>
              <LinearProgress color='warning' />
            </LoadingContainer>
          ) : (
            <Container>
              <Grid container>
                {data?.map((truckType: TruckType) => (
                  <Grid item xs={12} md={6} lg={4}>
                    <FleetItem
                      key={truckType.id}
                      name={truckType.name}
                      length={truckType.length}
                      width={truckType.width}
                      height={truckType.height}
                      maxLoad={truckType.maxWeight}
                      carries={truckType.carries}
                      image={truckType.image}
                      selected={false}
                      onClick={() => {}}
                      price={''}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
        </Container>
      </FleetsContent>
      <Footer />
    </MainContainer>
  );
}
