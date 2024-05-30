'use client';
import { Order } from '@/api/order';
import { timeTypes } from '@/api/settings';
import { useRoutePoints } from '@/hooks/useRoutePoints';
import { useUpdateCitiesAndPostCodes } from '@/hooks/useUpdateCityAndPostCode';
import DistanceAndDurationSection from '@/modules/CreateQuote/DistanceAndDurationSection';
import { useStateValue } from '@/providers/StateContext';
import Appbar from '@/shared/layout/Appbar';
import GoogleMapsWithPath from '@/shared/map/GoogleMapsWithPath';
import { getDurationAndDistance } from '@/utils/getDurationAndDistance';
import { Card, Grid, TextField, styled } from '@mui/material';
import { addMinutes } from 'date-fns';
import { Settings, TruckType } from 'prisma/prisma-client';
import React, { useEffect } from 'react';
import VanItem from '../CreateQuote/VanItem';
import FormStepper from './FormStepper';
import PaymentModel from './PaymentModel';
import ReviewOrder from './ReviewOrder';
import SelectTruckModel from './SelectTruckModel';
import SuccessPage from './SuccessPage';

const StepsCol = styled('div')``;

const CustomCard = styled(Card)`
  padding: 20px;
  height: calc(100vh - 130px);
  overflow-y: auto;
`;
const MapConatainer = styled('div')`
  position: relative;
  width: 100%;
`;
const SelectedTruckContainer = styled('div')`
  margin-top: 30px;
`;

const SectionContainer = styled('div')`
  padding: 10px;
  background: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.grey[200]};
  border-radius: 12px;
  font-size: 20px;
  position: relative;
`;

export default function ConfirmQuotePage({
  truckTypes,
  settings,
}: {
  truckTypes: TruckType[];
  settings: Settings;
}) {
  const { state, dispatch } = useStateValue();
  const {
    path,
    selectedVan,
    directions,
    start,
    end,
    collection,
    delivery,
    waypoints,
    withDriver,
    paymentMethod,
    collectionDates,
    deliveryDates,
    originObj,
    destinationObj,
    email,
    additionalTime,
  } = state;
  const [open, setOpen] = React.useState(false);
  const [openPayment, setOpenPaymnet] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState('');

  const onSubmit = async () => {
    setIsLoading(true);
    const order = await Order.createOrder({
      email: email,
      collection: {
        ...collection,
        place_id: originObj?.place_id,
        date: collectionDates?.selectedDate || new Date(),
        timeType: timeTypes[parseInt(collectionDates?.dateType)],
        fromTime: collectionDates?.fromTime || `${new Date().getHours()}:00`,
        toTime: collectionDates?.toTime,
      },
      delivery: {
        ...delivery,
        place_id: destinationObj?.place_id,
        date: deliveryDates?.selectedDate || new Date(),
        timeType: timeTypes[parseInt(deliveryDates?.dateType)],
        fromTime:
          deliveryDates?.fromTime ||
          `${addMinutes(
            new Date(),
            getDurationAndDistance(directions).duration
          ).getHours()}:00`,
        toTime: deliveryDates?.toTime,
      },
      stopPoints: waypoints.map((s) => ({
        place_id: s.place_id,
        address: s.description || '',
        phone: s.phone,
        name: s.name,
      })),
      truckTypeId: selectedVan?.id || '',
      withDriver: withDriver,
      paymentMethod: paymentMethod,
      duration: parseFloat(
        getDurationAndDistance(directions)?.duration.toString()
      ),
      distance: parseFloat(
        getDurationAndDistance(directions)?.distance.toString()
      ),
      additionalTime: additionalTime,
    });
    setIsLoading(false);
    dispatch({ type: 'SET_ORDER', payload: order });
    setOrderId(order.id);
    setOpenPaymnet(true);
  };

  useUpdateCitiesAndPostCodes();
  useRoutePoints();

  return (
    <>
      <Appbar />
      <Grid container>
        <Grid item sm={12} md={4} lg={4} padding={2}>
          <CustomCard
            sx={{
              padding: 2,
            }}
          >
            {!settings?.displayEmailInSeperatePage && (
              <TextField
                label='Your Email'
                value={email}
                onChange={(e) =>
                  dispatch({ type: 'SET_EMAIL', payload: e.target.value })
                }
                fullWidth
                type='email'
                autoComplete='off'
                sx={{ marginBottom: 2 }}
                inputProps={{
                  'aria-autocomplete': 'none',
                  autoComplete: 'off',
                }}
              />
            )}

            <StepsCol>
              <FormStepper />
            </StepsCol>
          </CustomCard>
        </Grid>
        <Grid item sm={12} md={4} lg={4} padding={2}>
          <CustomCard>
            <MapConatainer>
              {directions && directions?.routes && (
                <DistanceAndDurationSection
                  distance={getDurationAndDistance(
                    directions
                  )?.distanceInWords.toString()}
                  duration={getDurationAndDistance(
                    directions
                  )?.durationInWords.toString()}
                />
              )}

              <GoogleMapsWithPath
                waypoints={path}
                start={start}
                end={end}
                directions={directions}
                setDirections={(d) =>
                  dispatch({ type: 'SET_DIRECTIONS', payload: d })
                }
                containerStyle={{
                  height: 'calc(60vh - 50px)',
                  width: '100%',
                  borderRadius: '8px',
                }}
              />
            </MapConatainer>

            <SelectedTruckContainer>
              {/* @ts-ignore */}
              <VanItem
                {...selectedVan}
                maxLoad={selectedVan?.maxWeight.toString() || ''}
                price={`${
                  // @ts-ignore
                  selectedVan?.standardPricePerMin *
                  parseFloat(
                    getDurationAndDistance(directions).duration.toString()
                  )
                } ${settings.currencySymbol} `}
                onClick={() => setOpen(true)}
              />
            </SelectedTruckContainer>
          </CustomCard>
        </Grid>
        <Grid item sm={12} md={4} lg={4} padding={2}>
          <ReviewOrder
            settings={settings}
            onSubmit={() => onSubmit()}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
      <SelectTruckModel
        open={open}
        settings={settings}
        setOpen={setOpen}
        truckTypes={truckTypes}
      />
      <PaymentModel
        open={openPayment}
        setOpen={setOpenPaymnet}
        paymentMethod={paymentMethod}
        orderId={orderId}
        onSuccess={() => {
          setOpenPaymnet(false);
          setSuccess(true);
        }}
        amount={
          // @ts-ignore
          selectedVan?.standardPricePerMin *
          parseFloat(
            `${getDurationAndDistance(directions).duration.toString()}`
          )
        }
      />
      <SuccessPage open={success} />
    </>
  );
}
