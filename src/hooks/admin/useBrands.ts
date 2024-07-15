import { Brand } from '@/api/Brand';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAllBrands = () => {
  return useQuery({
    queryKey: ['allBrands'],
    queryFn: Brand.getAll,
  });
};

export const useSearchBrands = (data: any) => {
  return useQuery({
    queryKey: [
      'searchBrands',
      data.searchKey,
      data.page,
      data.perPage,
      data.sortBy,
      data.isAsc,
      data.isAdmin,
    ],
    queryFn: () => Brand.getSearch(data),
  });
};

export const useBrand = (id: string) => {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: (a) => Brand.getSingle,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Brand.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
      });
      toast.success('Brand created successfully');
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Brand.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
      });
      toast.success('Brand updated successfully');
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Brand.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
      });
      toast.success('Brand deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['brands'],
      });
    },
  });
};
