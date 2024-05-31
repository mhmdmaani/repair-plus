import { Device } from '@/api/Device';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAllDevices = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: Device.getAll,
  });
};

export const useDevice = (id: string) => {
  return useQuery({
    queryKey: ['device', id],
    queryFn: (a) => Device.getSingle,
  });
};

export const useCreateDevice = () => {
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

export const useUpdateDevice = () => {
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
