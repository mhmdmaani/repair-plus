'use client';
import { useRoutePoints } from '@/hooks/useRoutePoints';
import DistanceAndDurationSection from '@/modules/CreateQuote/DistanceAndDurationSection';
import { useStateValue } from '@/providers/StateContext';
import Appbar from '@/shared/layout/Appbar';
import GoogleMapsWithPath from '@/shared/map/GoogleMapsWithPath';
import { getDurationAndDistance } from '@/utils/getDurationAndDistance';
import { styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Settings, TruckType } from 'prisma/prisma-client';
import PriceMatchNote from './PriceMatchNote';
import SelectVan from './SelectVan';
import SubmitButtonContainer from './SubmitButtonContainer';
import TripForm from './TripForm';

const MainContainer = styled('div')`
  position: relative;
  height: 100vh;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding-bottom: 100px;
  }
`;

const FormContainer = styled('div')`
  width: 100%;
  padding-top: 20px;
  padding: 10px;
`;

const MapConatainer = styled('div')`
  position: relative;
  height: 40vh;
  width: 100%;
  @media (max-width: 768px) {
  }
`;

export default function CreateQuoteMobile({
  truckTypes,
  settings,
  onSubmit,
}: {
  truckTypes: TruckType[];
  settings: Settings;
  onSubmit: () => void;
}) {
  const router = useRouter();
  const { state, dispatch } = useStateValue();
  const {
    originObj,
    destinationObj,
    waypoints,
    selectedVan,
    path,
    start,
    end,
    directions,
  } = state;

  useRoutePoints();

  const handleSubmit = () => {
    dispatch({
      type: 'SUBMIT_CREATE_QUOTE',
      payload: {
        selectedVan,
        originObj,
        destinationObj,
        waypoints,
        path,
        start,
        end,
        directions,
      },
    });
    onSubmit();
  };

  return (
    <>
      <MainContainer>
        <MapConatainer>
          <Appbar isFixed isTransparent />
          {directions && directions?.routes && (
            <DistanceAndDurationSection
              distance={getDurationAndDistance(
                directions
              )?.distanceInWords?.toString()}
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
            setDirections={(d: any) =>
              dispatch({
                type: 'SET_DIRECTIONS',
                payload: d,
              })
            }
            containerStyle={{
              height: '40vh',
              width: '100%',
              borderRadius: '8px',
            }}
          />
        </MapConatainer>
        <FormContainer>
          <TripForm
            originObj={originObj}
            destinationObj={destinationObj}
            setOriginObj={(d: any) =>
              dispatch({
                type: 'SET_ORIGIN_OBJ',
                payload: d,
              })
            }
            setDestinationObj={(d: any) =>
              dispatch({
                type: 'SET_DESTINATION_OBJ',
                payload: d,
              })
            }
            waypoints={waypoints}
            setWaypoints={(d: any) =>
              dispatch({
                type: 'SET_WAYPOINTS',
                payload: d,
              })
            }
          />
          {originObj != null && destinationObj != null && (
            <SelectVan
              selectedItem={selectedVan}
              setSelectedItem={(d: any) => {
                dispatch({
                  type: 'SET_SELECTED_VAN',
                  payload: d,
                });
              }}
              vans={truckTypes}
              period={getDurationAndDistance(directions)?.duration}
              settings={settings}
            />
          )}

          <PriceMatchNote />
        </FormContainer>
        <SubmitButtonContainer
          selectedItem={selectedVan}
          onSubmit={handleSubmit}
        />
      </MainContainer>
    </>
  );
}
