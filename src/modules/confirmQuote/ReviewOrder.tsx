import { timeTypes } from '@/api/settings';
import { useCalculatePrice } from '@/hooks/useCalculatePrice';
import { useStateValue } from '@/providers/StateContext';
import AdditionalTimeSelect from '@/shared/inputs/AdditionalTimeSelect';
import { getDurationAndDistance } from '@/utils/getDurationAndDistance';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { Settings } from 'prisma/prisma-client';
import React from 'react';
import { FaRegCreditCard } from 'react-icons/fa';
import { RiBillLine } from 'react-icons/ri';
import ReviewWayPoints from './ReviewWayPoints';
import TermsCheck from './TermsCheck';

const Container = styled(Card)`
  padding: 20px;
  height: calc(100vh - 130px);
  overflow-y: auto;
  @media (max-width: 768px) {
    height: auto;
    box-shadow: none;
  }
`;
const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  @media (max-width: 1700px) {
    font-size: 1.5rem;
  }
`;
const MainSection = styled('div')`
  margin-top: 20px;
  width: 100%;
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
const SectionTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
`;
const LocationSection = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const LocationIcon = styled('img')`
  width: 60px;
  height: 60px;
  @media (max-width: 1800px) {
    width: 30px;
    height: 30px;
  }
`;
const DistanceAndDurationSection = styled('div')`
  border-left: 2px solid
    ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.common.black};
  margin: 5px;
  margin-left: 30px;
  padding: 10px 30px;
  position: relative;
  @media (max-width: 1800px) {
    padding: 10px 1px;
    margin-left: 14px;
  }
`;
const DurationText = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 14px;
`;
const ItemRow = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  max-width: 350px;
`;
const LabelValue = styled('div')`
  display: flex;
  gap: 5px;
  flex: 1;
`;
const Label = styled(Typography)`
  font-weight: bold;
`;
const Value = styled(Typography)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;
const ImageContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
`;
const Image = styled('img')`
  width: 200px;
  height: auto;
`;
const DriverItems = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const DriverIcon = styled('img')`
  width: 60px;
  height: 60px;
  filter: ${({ theme }) =>
    theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)'};
  @media (max-width: 1800px) {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const PriceContainer = styled('div')`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Row = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 12px;
  color: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.common.white};
`;
const VatPrice = styled(Typography)`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[600]};
  text-align: center;
`;

const UnstyledLink = styled('a')`
  text-decoration: none;
  color: inherit;
`;
export default function ReviewOrder({
  settings,
  onSubmit,
  isLoading,
}: {
  settings: Settings;
  onSubmit: () => void;
  isLoading: boolean;
}) {
  const { state, dispatch } = useStateValue();
  const [isAgreed, setIsAgreed] = React.useState(false);
  const theme = useTheme();
  const {
    originObj,
    destinationObj,
    waypoints,
    selectedVan,
    path,
    start,
    end,
    directions,
    withDriver,
    paymentMethod,
    collection,
    delivery,
    email,
    collectionDates,
    deliveryDates,
  } = state;
  const [additionalTime, setAdditionalTime] = React.useState(0);
  const { data: totalPrice } = useCalculatePrice({
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
      type: s.type,
      phone: s.phone,
      name: s.name,
    })),
    truckTypeId: selectedVan?.id || '',
    withDriver: withDriver,
    paymentMethod: paymentMethod,
    additionalTime: additionalTime,
    duration: parseFloat(
      getDurationAndDistance(directions)?.duration.toString()
    ),
    distance: parseFloat(
      getDurationAndDistance(directions)?.distance.toString()
    ),
  });

  return (
    <Container>
      <Title variant='h5'>Review Order</Title>
      <MainSection>
        <SectionContainer
          style={{
            paddingTop: '25px',
          }}
        >
          <DurationText>
            {`${getDurationAndDistance(directions)?.durationInWords} (${
              getDurationAndDistance(directions)?.distanceInWords
            })`}
          </DurationText>
          <LocationSection>
            <LocationIcon src='./pickup.png' alt='pickup' />
            <Typography fontWeight={'bold'} variant='body2'>
              {originObj?.description}
            </Typography>
          </LocationSection>

          <DistanceAndDurationSection>
            <ReviewWayPoints waypoints={waypoints} />
          </DistanceAndDurationSection>

          <LocationSection>
            <LocationIcon src='./dropoff.png' alt='dropoff' />
            <Typography fontWeight={'bold'} variant='body2'>
              {destinationObj?.description}
            </Typography>
          </LocationSection>
        </SectionContainer>
      </MainSection>
      <MainSection>
        <SectionContainer
          style={{
            padding: '20px',
          }}
        >
          <Grid container>
            <Grid lg={8} md={8} sm={8} xs={12}>
              <ItemRow>
                <LabelValue>
                  <Label>{selectedVan?.name}</Label>
                </LabelValue>
              </ItemRow>
              <ItemRow>
                <LabelValue>
                  <Label>Length</Label>
                  <Value>{`${selectedVan?.length} M`}</Value>
                </LabelValue>
                <LabelValue>
                  <Label>Height</Label>
                  <Value>{`${selectedVan?.height} M`}</Value>
                </LabelValue>
              </ItemRow>
              <ItemRow>
                <LabelValue>
                  <Label>Width</Label>
                  <Value>{`${selectedVan?.width} M`}</Value>
                </LabelValue>
                <LabelValue>
                  <Label>Load</Label>
                  <Value>{`${selectedVan?.maxWeight}KG`}</Value>
                </LabelValue>
              </ItemRow>
            </Grid>
            <Grid lg={4} md={4} sm={4} xs={12}>
              <ImageContainer>
                <Image src={selectedVan?.image} alt='van' />
              </ImageContainer>
            </Grid>
          </Grid>
        </SectionContainer>
      </MainSection>
      <MainSection>
        <SectionTitle variant='h6'>Drivers's Help</SectionTitle>
        <DriverItems>
          <DriverItem
            selected={withDriver === true}
            onClick={() =>
              dispatch({
                type: 'SET_WITH_DRIVER',
                payload: true,
              })
            }
          >
            <DriverIcon src='./driverP.png' />
            <Typography variant='caption' fontWeight={'bold'}>
              Yes, I need
            </Typography>
          </DriverItem>
          <DriverItem
            selected={withDriver === false}
            onClick={() =>
              dispatch({
                type: 'SET_WITH_DRIVER',
                payload: false,
              })
            }
          >
            <DriverIcon src='./driverN.png' />
            <Typography variant='caption' fontWeight={'bold'}>
              No, I don't
            </Typography>
          </DriverItem>
        </DriverItems>
      </MainSection>

      <MainSection>
        <SectionTitle variant='h6'>
          Add Additional Time For Loading/Unloading if required
        </SectionTitle>
        <SectionContainer>
          <Row>
            <AdditionalTimeSelect
              value={additionalTime}
              onChange={(val: number) => setAdditionalTime(val)}
            />
            <Typography variant='caption' fontWeight={'bold'}>
              {additionalTime === 1 ||
              additionalTime === 1.5 ||
              additionalTime === 0
                ? 'Hour'
                : 'Hours'}
            </Typography>
          </Row>
        </SectionContainer>
      </MainSection>
      <MainSection>
        <SectionTitle variant='h6'>Payment Method</SectionTitle>
        <DriverItems>
          <DriverItem
            selected={paymentMethod === 'bill'}
            onClick={() =>
              dispatch({
                type: 'SET_PAYMENT_METHOD',
                payload: 'bill',
              })
            }
          >
            <RiBillLine
              style={{
                fontSize: '40px',
              }}
            />

            <Typography variant='caption' fontWeight={'bold'}>
              Bank Transfer
            </Typography>
          </DriverItem>
          <DriverItem
            selected={paymentMethod === 'creditCard'}
            onClick={() =>
              dispatch({
                type: 'SET_PAYMENT_METHOD',
                payload: 'creditCard',
              })
            }
          >
            <FaRegCreditCard
              style={{
                fontSize: '40px',
              }}
            />

            <Typography variant='caption' fontWeight={'bold'}>
              Card Payment
            </Typography>
          </DriverItem>
        </DriverItems>
      </MainSection>
      <MainSection>
        <TermsCheck
          checked={isAgreed}
          onChange={() => setIsAgreed(!isAgreed)}
        />
        <Typography variant='body1'>
          <UnstyledLink href='tel:+447888899997' target='_blank'>
            If the pricing does not meet your expectations, please reach out to
            us for further assistance.
          </UnstyledLink>
        </Typography>
      </MainSection>

      {/* */}
      <MainSection>
        <Grid container alignItems={'center'}>
          <Grid item xs={12} sm={12} md={6} lg={6} alignItems={'center'}>
            {selectedVan && directions && (
              <PriceContainer>
                {totalPrice?.totalPrice ? (
                  `${totalPrice?.totalPrice}${settings.currencySymbol}`
                ) : (
                  <CircularProgress color='primary' />
                )}
                <VatPrice>
                  {`VAT ${
                    (parseFloat(totalPrice?.totalPrice || '0') *
                      parseFloat(settings?.vatPercentage?.toString() || '0')) /
                    100
                  }${settings.currencySymbol}`}
                </VatPrice>
              </PriceContainer>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} alignItems={'center'}>
            <SubmitButton
              onClick={onSubmit}
              disabled={
                !originObj ||
                !destinationObj ||
                !selectedVan ||
                !directions ||
                !path ||
                !start ||
                !end ||
                !paymentMethod ||
                !collection ||
                !delivery ||
                !isAgreed ||
                !email ||
                email === '' ||
                isLoading
              }
              variant='contained'
            >
              Confirm
            </SubmitButton>
          </Grid>
        </Grid>
      </MainSection>
    </Container>
  );
}
