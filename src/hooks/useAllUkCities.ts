import { Map } from '@/api/map';
import { useQuery } from '@tanstack/react-query';

export const useAllUkCities = (input: string) => {
  return useQuery({
    queryKey: ['allUkCities', input],
    queryFn: () => Map.getAllUKCities(input),
  });
};

export const useCityPostals = (cityName: string) => {
  return useQuery({
    queryKey: ['cityPostals', cityName],
    queryFn: () => Map.getCityPostals(cityName),
  });
};
