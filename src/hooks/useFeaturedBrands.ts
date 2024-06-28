import { Brand } from '@/api/Brand';
import { useQuery } from '@tanstack/react-query';

export const useFeaturedBrands = () => {
  const { data } = useQuery({
    queryKey: ['featuredBrands'],
    queryFn: async () => {
      const res = await Brand.getFeatured();
      return res;
    },
  });

  return { data };
};
