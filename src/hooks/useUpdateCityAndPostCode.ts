import { useCityAndPostalCodeByPlaceId } from '@/hooks/useCityAndPostalCodeByPlaceId';
import { useStateValue } from '@/providers/StateContext';
import { useEffect } from 'react';

export const useUpdateCitiesAndPostCodes = () => {
  const { state, dispatch } = useStateValue();
  const { originObj, destinationObj } = state;
  const { city: collectionCity, postalCode: collectionPostalCode } =
    useCityAndPostalCodeByPlaceId(originObj?.place_id);

  const { city: deliveryCity, postalCode: deliveryPostalCode } =
    useCityAndPostalCodeByPlaceId(destinationObj?.place_id);

  useEffect(() => {
    dispatch({
      type: 'SET_CITIES_AND_POSTCODES',
      payload: {
        collectionCity,
        collectionPostalCode,
        deliveryCity,
        deliveryPostalCode,
      },
    });
  }, [collectionCity, collectionPostalCode, deliveryCity, deliveryPostalCode]);
};
