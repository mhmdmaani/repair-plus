'use client';
import { useRoutePoints } from '@/hooks/useRoutePoints';
import { useStateValue } from '@/providers/StateContext';
import Appbar from '@/shared/layout/Appbar';
import GoogleMapsWithPath from '@/shared/map/GoogleMapsWithPath';
import { getDurationAndDistance } from '@/utils/getDurationAndDistance';
import { Grid, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Settings, TruckType } from 'prisma/prisma-client';
import DistanceAndDurationSection from './DistanceAndDurationSection';
import PriceMatchNote from './PriceMatchNote';
import SelectVan from './SelectVan';
import SubmitButtonContainer from './SubmitButtonContainer';
import TripForm from './TripForm';

const MapConatainer = styled('div')`
  position: relative;
  width: 100%;
`;
export default function CreateQuote({
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
      <Appbar />
      <Grid container overflow={'auto'}>
        <Grid item sm={12} md={4} lg={4} padding={2}>
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

          <PriceMatchNote />
        </Grid>

        {originObj != null && destinationObj != null && (
          <Grid item sm={12} md={4} lg={4} padding={2}>
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
          </Grid>
        )}

        <Grid
          item
          sm={12}
          md={originObj != null && destinationObj ? 4 : 8}
          lg={originObj != null && destinationObj ? 4 : 8}
          padding={2}
        >
          <MapConatainer>
            {directions && directions?.routes && (
              <DistanceAndDurationSection
                distance={getDurationAndDistance(
                  directions
                )?.distanceInWords?.toString()}
                duration={getDurationAndDistance(
                  directions
                )?.durationInWords?.toString()}
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
                height: 'calc(100vh - 160px)',
                width: '100%',
                borderRadius: '8px',
              }}
            />
          </MapConatainer>
        </Grid>
        <SubmitButtonContainer
          selectedItem={selectedVan}
          onSubmit={handleSubmit}
        />
      </Grid>
    </>
  );
}
