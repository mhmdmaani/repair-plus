import { Map } from '@/api/map';
import { useEffect, useState } from 'react';

async function getCityAndPostalCode(placeId: string) {
  const result = await Map.getCityAndPostal(placeId);
  return result;
}

export const useCityAndPostalCodeByPlaceId = (placeId: string) => {
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');

  useEffect(() => {
    if (placeId) {
      // @ts-ignore
      getCityAndPostalCode(placeId).then(({ city, postalCode }) => {
        setCity(city);
        setPostalCode(postalCode);
      });
    }
  }, [placeId]);

  return { city, postalCode };
};
