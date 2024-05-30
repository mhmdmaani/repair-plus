import { AdditionalDistanceCost } from '@/api/AdditionalDistanceCost';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAdditionalDistanceCosts = (id: string) => {
  return useQuery({
    queryKey: ['additionalDistanceCosts', id],
    queryFn: () => AdditionalDistanceCost.getByTruckType(id),
  });
};

export const useUpdateAdditionalDistanceCost = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdditionalDistanceCost.update,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['additionalDistanceCosts'],
      });
      toast.success('Additional distance cost updated successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};

export const useCreateAdditionalDistance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdditionalDistanceCost.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['additionalDistanceCosts'],
      });
      toast.success('Additional distance cost created successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};

export const useDeleteAdditionalDistanceCost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AdditionalDistanceCost.delete,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['additionalDistanceCosts'],
      });
      toast.success('Additional distance cost deleted successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};
