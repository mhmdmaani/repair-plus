import { Map } from '@/api/map';
import { useStateValue } from '@/providers/StateContext';
import { useEffect } from 'react';
// Replace with your API key
export const getRouteData = async (start: any, end: any, waypoints: any[]) => {
  const [startPoint, endPoint] = await Promise.all([
    Map.getCoordByPlaceId(start?.place_id),
    Map.getCoordByPlaceId(end?.place_id),
  ]);
  const wayP = await Promise.all(
    waypoints.map((waypoint) => Map.getCoordByPlaceId(waypoint.place_id))
  );

  return {
    start: startPoint,
    end: endPoint,
    path: wayP
      .flat()
      .map((w, index) => ({ ...w, type: waypoints[index]?.type })),
  };
};

export const useRoutePoints = () => {
  const { state, dispatch } = useStateValue();
  const { originObj, destinationObj, waypoints } = state;

  useEffect(() => {
    const onSetData = async () => {
      if (!originObj && !destinationObj) return;
      const data = await getRouteData(originObj, destinationObj, waypoints);
      dispatch({
        type: 'SET_START_END_PATH',
        payload: {
          start: data?.start,
          end: data?.end,
          path: data?.path,
        },
      });
    };
    onSetData();
  }, [originObj, destinationObj, waypoints]);
};
