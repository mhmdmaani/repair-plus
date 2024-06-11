import { Brand } from '@/api/Brand';
import { useQuery } from '@tanstack/react-query';
export const useBrandTree = (id: string) => {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: (a) => Brand.getBrandTree(id),
  });
};
