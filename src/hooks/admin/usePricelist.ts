import { PriceList } from '@/api/PriceList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const usePriceList = (id: string) => {
  return useQuery({
    queryKey: ['pricelist', id],
    queryFn: () => PriceList.getPriceList(id),
  });
};

export const useUpdatePricelist = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PriceList.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pricelist', id],
      });
    },
  });
};

export const useCreatePriceList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PriceList.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pricelist'],
      });
    },
  });
};

export const useDeletePriceList = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PriceList.delete,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['pricelist', id],
      });
    },
  });
};
