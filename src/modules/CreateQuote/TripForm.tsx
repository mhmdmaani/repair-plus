'use client';
import { useSuggestedPlaces } from '@/hooks/useSuggestedPlaces';
import InputWithSugession from '@/shared/inputs/InputWithSugession';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
const FormContainer = styled('div')`
  border: 2px solid #efebe9;
  padding: 10px;
  border-radius: 16px;
  @media (max-width: 1000px) {
    border: none;
  }
`;
const WayPointsButtonsContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WayPointsList = styled('div')``;

const WayPointListItem = styled('div')`
  display: flex;
  gap: 10px;
  align-items: center;
  @media (max-width: 1000px) {
    gap:5px;
`;

const AddNewWaypointButton = styled(Button)`
  border-radius: 40px;
  padding: 10px 10px;
  margin: 10px 0;
  display: flex;
  gap: 5px;
  font-weight: bold;
  @media (max-width: 1000px) {
    padding: 5px 5px;
    margin: 5px 0;
    font-size: 12px;
  }
`;

const AdditionalStopsLabel = styled('div')`
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
  color: ${(props) => props.theme.palette.grey[300]};
`;

const WayPointImageContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  position: relative;
`;
const WayPointCounter = styled(Typography)<{
  isPickup?: boolean;
}>`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => (props.isPickup ? 'green' : 'red')};
  font-weight: bold;
  font-size: 12px;
`;
export default function TripForm({
  originObj,
  destinationObj,
  setOriginObj,
  setDestinationObj,
  waypoints,
  setWaypoints,
}: {
  originObj: any;
  destinationObj: any;
  setOriginObj: any;
  setDestinationObj: any;
  waypoints: any[];
  setWaypoints: any;
}) {
  useEffect(() => {
    setOrigin(originObj?.description);
  }, [originObj]);
  useEffect(() => {
    setDestination(destinationObj?.description);
  }, [destinationObj]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [waypointText, setWaypointText] = useState('');
  const { placePredictions: originPredictions } = useSuggestedPlaces(origin);
  const { placePredictions: destinationPredictions } =
    useSuggestedPlaces(destination);
  const { placePredictions: waypointsPredictions } =
    useSuggestedPlaces(waypointText);

  const onOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(e.target.value);
  };
  const onDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const onDeleteWaypoint = (index: number) => {
    setWaypoints([...waypoints.slice(0, index), ...waypoints.slice(index + 1)]);
  };

  const onAddWaypoint = (type: string) => {
    setWaypoints([...waypoints, { type, waypointText: '' }]);
  };

  return (
    <Box>
      <FormContainer>
        <InputWithSugession
          value={origin}
          onChange={onOriginChange}
          placeholder='Collection Post Code'
          suggestions={originPredictions}
          onSelectSuggesstion={(suggestion: any) => {
            setOrigin(suggestion?.description);
            setOriginObj(suggestion);
          }}
          icon={
            <img
              src='./pickup.png'
              style={{
                width: '30px',
                height: '30px',
              }}
            />
          }
        />
        <InputWithSugession
          value={destination}
          onChange={onDestinationChange}
          suggestions={destinationPredictions}
          placeholder='Destination Post Code'
          onSelectSuggesstion={(suggestion: any) => {
            setDestination(suggestion?.description);
            setDestinationObj(suggestion);
          }}
          icon={
            <img
              src='./dropoff.png'
              style={{
                width: '30px',
                height: '30px',
              }}
            />
          }
        />
        <Box>
          <Divider sx={{ marginTop: 2, fontWeight: 'bold' }}>
            <Typography variant='body2' fontWeight={'bold'}>
              Additional Stops
            </Typography>
          </Divider>
          <WayPointsButtonsContainer>
            <AddNewWaypointButton
              onClick={() => onAddWaypoint('pickup')}
              startIcon={
                <img
                  src='./pickupPoint.png'
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                />
              }
              color='success'
            >
              Pickup
            </AddNewWaypointButton>
            <AddNewWaypointButton
              onClick={() => onAddWaypoint('destination')}
              startIcon={
                <img
                  src='./dropoffPoint.png'
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                />
              }
              color='error'
            >
              Drop off
            </AddNewWaypointButton>
          </WayPointsButtonsContainer>
        </Box>
        <WayPointsList>
          {waypoints?.map((waypoint, index) => (
            <WayPointListItem>
              <div
                style={{
                  flex: 1,
                }}
              >
                <InputWithSugession
                  key={index}
                  value={waypoint.waypointText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setWaypointText(e.target.value);
                    setWaypoints([
                      ...waypoints.slice(0, index),
                      { ...waypoint, waypointText: e.target.value },
                      ...waypoints.slice(index + 1),
                    ]);
                  }}
                  suggestions={waypointsPredictions}
                  placeholder={`${
                    waypoint.type === 'pickup'
                      ? 'Pickup Post Code'
                      : 'Drop Off Post Code'
                  }`}
                  onSelectSuggesstion={(suggestion: any) => {
                    setWaypoints([
                      ...waypoints.slice(0, index),
                      {
                        ...waypoint,
                        waypointText: suggestion?.description,
                        ...suggestion,
                      },
                      ...waypoints.slice(index + 1),
                    ]);
                  }}
                  icon={
                    waypoint.type === 'pickup' ? (
                      <WayPointImageContainer>
                        <WayPointCounter isPickup variant='body2'>
                          {index + 1}
                        </WayPointCounter>
                        <img
                          src='./pickupPoint.png'
                          style={{ width: '30px', height: '30px' }}
                        />
                      </WayPointImageContainer>
                    ) : (
                      <WayPointImageContainer>
                        <WayPointCounter variant='body2'>
                          {index + 1}
                        </WayPointCounter>

                        <img
                          src='./dropoffPoint.png'
                          style={{ width: '30px', height: '30px' }}
                        />
                      </WayPointImageContainer>
                    )
                  }
                />
              </div>

              <IconButton color='error' onClick={() => onDeleteWaypoint(index)}>
                <FiX />
              </IconButton>
            </WayPointListItem>
          ))}
        </WayPointsList>
      </FormContainer>
    </Box>
  );
}
