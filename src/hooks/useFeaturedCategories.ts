import { Brand } from '@/api/Brand';
import { Category } from '@/api/Category';
import { useQuery } from '@tanstack/react-query';

export const useFeaturedCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['featuredCategories'],
    queryFn: Category.getFeatured,
  });

  return {
    data,
    isLoading,
  };
};
