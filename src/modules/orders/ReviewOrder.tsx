'use client';
import { useOrderRoutes, useUpdateOrder } from '@/hooks/admin/useOrders';
import GoogleMapsWithPath from '@/shared/map/GoogleMapsWithPath';
import {
  Avatar,
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { Settings } from 'prisma/prisma-client';
import React from 'react';
import { FaRegCreditCard, FaRegStopCircle } from 'react-icons/fa';
import { RiBillLine } from 'react-icons/ri';
import CarsList from './CarsList';
import DriversList from './DriversList';
import ForClientOrderStatus from './ForClientOrderStatusStepper';
import MainPoint from './MainPoint';
import OrderStatusStepper from './OrderStatusStepper';
import StopPoint from './StopPoint';

const Container = styled(Card)`
  padding: 20px;
  height: calc(100vh - 130px);
`;
const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
`;
const MainSection = styled('div')`
  margin-top: 20px;
`;

const SectionContainer = styled('div')`
  padding: 10px;
  background: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.grey[200]};
  border-radius: 12px;
  font-size: 20px;
`;
const SectionTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const ItemRow = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  max-width: 300px;
`;
const LabelValue = styled('div')`
  display: flex;
  gap: 5px;
  width: 50%;
`;
const Label = styled(Typography)`
  font-weight: bold;
`;
const Value = styled(Typography)``;
const ImageContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled('img')`
  width: 200px;
  height: auto;
`;
const DriverItems = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const DriverItem = styled('div')<{ selected?: boolean }>`
  background: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.grey[200]};
  padding: 20px;
  border-radius: 12px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border: 2px solid
    ${({ theme, selected }) =>
      selected ? theme.palette.primary.main : theme.palette.grey[200]};
  transition: all 0.3s ease-in-out;
`;
const DriverIcon = styled('img')`
  width: 60px;
  height: 60px;
  filter: ${({ theme }) =>
    theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)'};
`;
const PriceContainer = styled('div')`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.common.black};
`;

const MapConatainer = styled('div')`
  position: relative;
  width: 100%;
`;

export default function ReviewOrder({
  order,
  settings,
  onSubmit,
  forClient,
}: {
  order: any;
  settings?: Settings;
  onSubmit?: () => void;
  forClient?: boolean;
}) {
  const theme = useTheme();
  const [displayDriversModal, setDisplayDriversModel] = React.useState(false);
  const [directions, setDirections] = React.useState<any>();
  const [selectedDriver, setSelectedDriver] = React.useState<any>(null);
  const [selectedCar, setSelectedCar] = React.useState<any>(null);
  const [displayCarModel, setDisplayCarModel] = React.useState(false);
  const updateOrderMutation = useUpdateOrder();
  const {
    collection,
    delivery,
    truckType,
    stopPoints,
    Driver,
    Truck,
    price,
    status,
    additional,
    paymentMethod,
    paymentStatus,
    paymentId,
    additionalTime,
    withDriverHelp,
    email,
    steps,
  } = order;
  const { start, end, path } = useOrderRoutes(collection, delivery, stopPoints);

  const onChangeIsPaid = (paymentStatus: string) => {
    if (paymentMethod === 'bill') {
      updateOrderMutation.mutate({
        id: order.id,
        paymentStatus: paymentStatus === 'paid' ? 'pending' : 'paid',
        paidAt: paymentStatus === 'pending' ? new Date() : null,
      });
    }
  };
  return (
    <Grid container>
      <Grid lg={4} md={4} sm={12} xs={12} padding={1}>
        <Container>
          <Title variant='h5'>Review Order</Title>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <SectionTitle variant='h6'>
              {forClient ? 'Payment Status' : 'Is Paid?'}
            </SectionTitle>
            {forClient ? (
              <Typography
                variant='h6'
                style={{
                  marginBottom: '10px',
                }}
              >
                {paymentStatus}
              </Typography>
            ) : (
              <Switch
                value={paymentStatus === 'paid'}
                color='success'
                onChange={() => !forClient && onChangeIsPaid(paymentStatus)}
              />
            )}
          </Stack>
          <MainSection>
            <SectionTitle variant='h6'>Email</SectionTitle>
            <SectionContainer>
              <Typography variant='h6'>{email}</Typography>
            </SectionContainer>
          </MainSection>

          <MainSection>
            <SectionTitle variant='h6'>
              <Avatar src='../../pickup.png' />
              Collection
            </SectionTitle>
            <SectionContainer>
              <MainPoint point={collection} />
            </SectionContainer>
          </MainSection>
          <MainSection>
            <SectionTitle variant='h6'>
              <Avatar src='../../dropoff.png' />
              Drop Off
            </SectionTitle>
            <SectionContainer>
              <MainPoint point={delivery} />
            </SectionContainer>
          </MainSection>
          {stopPoints && stopPoints.length > 0 && (
            <MainSection>
              <SectionTitle variant='h6'>
                <FaRegStopCircle />
                Stop Points:
              </SectionTitle>
              <SectionContainer>
                {stopPoints?.map((point: any, index: number) => (
                  <StopPoint point={point} pointIndex={index} />
                ))}
              </SectionContainer>
            </MainSection>
          )}

          <MainSection>
            <SectionTitle variant='h6'>Drivers's Help</SectionTitle>
            <DriverItems>
              <DriverItem selected={withDriverHelp === true} onClick={() => {}}>
                <DriverIcon src='../../driverP.png' />
                <Typography variant='caption' fontWeight={'bold'}>
                  Yes, I need his help
                </Typography>
              </DriverItem>
              <DriverItem
                selected={withDriverHelp === false}
                onClick={() => {}}
              >
                <DriverIcon src='../../driverN.png' />
                <Typography variant='caption' fontWeight={'bold'}>
                  No, I don't need
                </Typography>
              </DriverItem>
            </DriverItems>
          </MainSection>
        </Container>
      </Grid>
      <Grid lg={4} md={4} sm={12} xs={12} padding={1}>
        <Container>
          <MapConatainer>
            <GoogleMapsWithPath
              waypoints={path}
              start={start}
              end={end}
              directions={directions}
              setDirections={(d) => setDirections(d)}
              containerStyle={{
                height: 'calc(50vh - 80px)',
                width: '100%',
                borderRadius: '8px',
              }}
            />
          </MapConatainer>
          <MainSection>
            <SectionTitle variant='h6'>Truck Type</SectionTitle>
            <SectionContainer>
              <Grid container justifyContent={'center'} alignItems={'center'}>
                <Grid lg={6} md={6} sm={6} xs={12}>
                  <ItemRow>
                    <LabelValue>
                      <Value variant='body2' fontWeight={'bold'}>
                        {truckType?.name}
                      </Value>
                    </LabelValue>
                  </ItemRow>
                  <ItemRow>
                    <LabelValue>
                      <Label variant='caption' fontWeight={'bold'}>
                        Length
                      </Label>
                      <Value variant='caption' fontWeight={'bold'}>
                        {truckType?.length}
                      </Value>
                    </LabelValue>
                    <LabelValue>
                      <Label variant='caption' fontWeight={'bold'}>
                        Height
                      </Label>
                      <Value variant='caption' fontWeight={'bold'}>
                        {truckType?.height}
                      </Value>
                    </LabelValue>
                  </ItemRow>
                  <ItemRow>
                    <LabelValue>
                      <Label variant='caption' fontWeight={'bold'}>
                        Width
                      </Label>
                      <Value variant='caption' fontWeight={'bold'}>
                        {truckType?.width}
                      </Value>
                    </LabelValue>
                    <LabelValue>
                      <Label variant='caption' fontWeight={'bold'}>
                        Max Load
                      </Label>
                      <Value variant='caption' fontWeight={'bold'}>
                        {truckType?.maxWeight}
                      </Value>
                    </LabelValue>
                  </ItemRow>
                </Grid>
                <Grid lg={6} md={6} sm={6} xs={12}>
                  <ImageContainer>
                    <Image src={truckType?.image} alt='van' />
                  </ImageContainer>
                </Grid>
              </Grid>
            </SectionContainer>
          </MainSection>

          <MainSection>
            <SectionTitle variant='h6' fontWeight={'bold'}>
              Assigned Driver
            </SectionTitle>
            <SectionContainer
              onClick={() => !forClient && setDisplayDriversModel(true)}
            >
              {Driver ? (
                <DriverItem>
                  {Driver?.image ? (
                    <Avatar
                      sx={{
                        width: '60px',
                        height: '60px',
                        fontSize: '20px',
                      }}
                      src={Driver?.image}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: '60px',
                        height: '60px',
                        fontSize: '20px',
                      }}
                    >
                      {' '}
                      {Driver?.name.charAt(0)}{' '}
                    </Avatar>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography fontWeight={'bold'} variant='body2'>
                      {Driver?.name}
                    </Typography>
                    <Typography variant='caption'>{Driver?.phone}</Typography>
                  </Box>
                </DriverItem>
              ) : (
                <DriverItem>
                  {forClient ? (
                    <Typography fontWeight={'bold'} variant='caption'>
                      No Driver Assigned
                    </Typography>
                  ) : (
                    <Typography fontWeight={'bold'} variant='caption'>
                      Assign Driver
                    </Typography>
                  )}
                </DriverItem>
              )}
            </SectionContainer>
          </MainSection>

          <MainSection>
            <SectionTitle variant='h6'>Assigned Truck</SectionTitle>
            <SectionContainer
              onClick={() => !forClient && setDisplayCarModel(true)}
            >
              {Truck ? (
                <DriverItem>
                  {Truck?.image ? (
                    <Avatar
                      sx={{
                        width: '60px',
                        height: '60px',
                        fontSize: '20px',
                      }}
                      src={Truck?.image}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: '60px',
                        height: '60px',
                        fontSize: '20px',
                      }}
                    >
                      {' '}
                      {Truck?.plate.charAt(0)}{' '}
                    </Avatar>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography fontWeight={'bold'} variant='caption'>
                      {Truck?.plate}
                    </Typography>
                  </Box>
                </DriverItem>
              ) : (
                <DriverItem>
                  {forClient ? (
                    <Typography fontWeight={'bold'} variant='caption'>
                      No Truck Assigned
                    </Typography>
                  ) : (
                    <Typography fontWeight={'bold'} variant='caption'>
                      Assign Truck
                    </Typography>
                  )}
                </DriverItem>
              )}
            </SectionContainer>
          </MainSection>
        </Container>
      </Grid>
      <Grid lg={4} md={4} sm={12} xs={12} padding={1}>
        <Container>
          <MainSection>
            <SectionTitle variant='h6'>Total Cost</SectionTitle>
            <SectionContainer>
              <PriceContainer>{`${price}${settings?.currencySymbol}`}</PriceContainer>
            </SectionContainer>
          </MainSection>
          <MainSection>
            <SectionTitle variant='h6' fontWeight={'bold'}>
              Payment Method
            </SectionTitle>
            <DriverItems>
              <DriverItem
                selected={paymentMethod === 'bill'}
                onClick={() => {}}
              >
                <RiBillLine
                  style={{
                    fontSize: '40px',
                  }}
                />

                <Typography variant='caption' fontWeight={'bold'}>
                  Bill
                </Typography>
              </DriverItem>
              <DriverItem
                selected={paymentMethod === 'creditCard'}
                onClick={() => {}}
              >
                <FaRegCreditCard
                  style={{
                    fontSize: '40px',
                  }}
                />

                <Typography variant='caption' fontWeight={'bold'}>
                  Credit Card
                </Typography>
              </DriverItem>
            </DriverItems>
          </MainSection>

          {additionalTime !== 0 && (
            <MainSection>
              <SectionTitle variant='h6'>Additional Time</SectionTitle>
              <SectionContainer>
                <Typography>{additionalTime}</Typography>
              </SectionContainer>
            </MainSection>
          )}
          {additional && additional.length > 0 && (
            <MainSection>
              <SectionTitle variant='h6'>Customer Note</SectionTitle>
              <SectionContainer>
                <Typography>{additional}</Typography>
              </SectionContainer>
            </MainSection>
          )}

          <MainSection>
            <SectionTitle variant='h6'>Current Status</SectionTitle>
            <SectionContainer>
              {forClient ? (
                <ForClientOrderStatus
                  stopPoints={stopPoints}
                  steps={steps}
                  orderId={order?.id}
                />
              ) : (
                <OrderStatusStepper
                  stopPoints={stopPoints}
                  steps={steps}
                  orderId={order?.id}
                />
              )}
            </SectionContainer>
          </MainSection>
        </Container>
      </Grid>
      <DriversList
        open={displayDriversModal}
        setOpen={setDisplayDriversModel}
        selectedDriver={selectedDriver}
        setSelectedDriver={setSelectedDriver}
        orderId={order.id}
      />

      <CarsList
        open={displayCarModel}
        setOpen={setDisplayCarModel}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        orderId={order.id}
        truckTypeId={truckType?.id}
      />
    </Grid>
  );
}
