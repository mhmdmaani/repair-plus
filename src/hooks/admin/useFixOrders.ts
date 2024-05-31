import { Device } from '@/api/Device';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAllFixOrders = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: Device.getAll,
  });
};

export const useFixOrder = (id: string) => {
  return useQuery({
    queryKey: ['device', id],
    queryFn: (a) => Device.getSingle,
  });
};

export const useCreateFixOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Device.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['devices'],
      });
      toast.success('Device created successfully');
    },
  });
};

export const useUpdateFixOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Device.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['devices', 'device'],
      });
      toast.success('Device updated successfully');
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Device.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['devices', 'device'],
      });
      toast.success('Device deleted successfully');
    },
  });
};
