'use client';
import { Order } from '@/api/order';
import { timeTypes } from '@/api/settings';
import { useRoutePoints } from '@/hooks/useRoutePoints';
import { useUpdateCitiesAndPostCodes } from '@/hooks/useUpdateCityAndPostCode';
import DistanceAndDurationSection from '@/modules/CreateQuote/DistanceAndDurationSection';
import { useStateValue } from '@/providers/StateContext';
import GoogleMapsWithPath from '@/shared/map/GoogleMapsWithPath';
import { getDurationAndDistance } from '@/utils/getDurationAndDistance';
import { styled, TextField } from '@mui/material';
import { Settings, TruckType } from 'prisma/prisma-client';
import React from 'react';
import VanItem from '../CreateQuote/VanItem';
import FormStepper from './FormStepper';
import PaymentModel from './PaymentModel';
import ReviewOrder from './ReviewOrder';
import SelectTruckModel from './SelectTruckModel';
import SuccessPage from './SuccessPage';

const MainContainer = styled('div')`
  padding-bottom: 100px;
`;
const StepsCol = styled('div')``;

const CustomCard = styled('div')`
  padding: 0 5px;
`;
const MapConatainer = styled('div')`
  position: relative;
  width: 100%;
`;
const SelectedTruckContainer = styled('div')`
  margin-top: 30px;
`;

export default function MobileConfirmPage({
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
    order,
  } = state;
  const [open, setOpen] = React.useState(false);
  const [openPayment, setOpenPaymnet] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async () => {
    setIsLoading(true);
    const order = await Order.createOrder({
      email: email,
      collection: {
        ...collection,
        place_id: originObj?.place_id,
        date: collectionDates?.selectedDate,
        timeType: timeTypes[parseInt(collectionDates?.dateType)],
        fromTime: collectionDates?.fromTime,
        toTime: collectionDates?.toTime,
      },
      delivery: {
        ...delivery,
        place_id: destinationObj?.place_id,
        date: deliveryDates?.selectedDate,
        timeType: timeTypes[parseInt(deliveryDates?.dateType)],
        fromTime: deliveryDates?.fromTime,
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
    if (paymentMethod === 'creditCard') {
      setOpenPaymnet(true);
    } else {
      setSuccess(true);
    }
  };

  useUpdateCitiesAndPostCodes();
  useRoutePoints();

  return (
    <MainContainer>
      <div>
        <div>
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
                height: 'calc(50vh - 50px)',
                width: '100%',
                borderRadius: '8px',
              }}
            />
          </MapConatainer>
          <CustomCard>
            <SelectedTruckContainer>
              {/* @ts-ignore */}
              <VanItem
                {...selectedVan}
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
        </div>

        <div>
          <CustomCard
            sx={{
              padding: 2,
            }}
          >
            {!settings?.displayEmailInSeperatePage && (
              <TextField
                label='Email'
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
        </div>

        <div>
          <ReviewOrder
            settings={settings}
            onSubmit={() => onSubmit()}
            isLoading={isLoading}
          />
        </div>
      </div>
      <SelectTruckModel
        open={open}
        settings={settings}
        setOpen={setOpen}
        truckTypes={truckTypes}
      />
      <PaymentModel
        open={openPayment}
        setOpen={setOpenPaymnet}
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
        orderId={order?.id || ''}
      />
      <SuccessPage open={success} />
    </MainContainer>
  );
}
