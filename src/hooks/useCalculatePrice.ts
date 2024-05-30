import { Price } from '@/api/Price';
import { useQuery } from '@tanstack/react-query';

export const useCalculatePrice = (dt: any) => {
  return useQuery({
    queryKey: ['price', dt],
    queryFn: async () => {
      const result = await Price.calculatePrice(dt);
      return result;
    },
    enabled: !!dt,
  });
};
