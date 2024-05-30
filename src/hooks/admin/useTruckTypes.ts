import { TruckType } from '@/api/truckType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAllTruckTypes = () => {
  return useQuery({
    queryKey: ['truckTypes'],
    queryFn: TruckType.getAllTruckTypes,
  });
};

export const useTruckType = (id: string) => {
  return useQuery({
    queryKey: ['truckType', id],
    queryFn: () => TruckType.getTruckType(id),
  });
};

export const useUpdateTruckType = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TruckType.updateTruckType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['truckType', id],
      });
      toast.success('Truck type updated successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};

export const useCreateTruckType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TruckType.createTruckType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['truckTypes'],
      });
    },
  });
};
