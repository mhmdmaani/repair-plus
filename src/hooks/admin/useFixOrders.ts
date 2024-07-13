import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Brand } from '@/api/Brand';
import { FixOrder } from '@/api/FixOrder';

export const useAllFixOrders = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: FixOrder.getAll,
  });
};

export const useSearchFixOrders = (data: any) => {
  return useQuery({
    queryKey: [
      'fixOrders',
      data.searchKey,
      data.page,
      data.perPage,
      data.sortBy,
      data.isAsc,
    ],
    queryFn: () => FixOrder.getSearch(data),
  });
};

export const useFixOrder = (id: string) => {
  return useQuery({
    queryKey: ['device', id],
    queryFn: () => FixOrder.getById(id),
  });
};

export const useCreateFixOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: FixOrder.create,
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
    mutationFn: FixOrder.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['devices', 'device'],
      });
      toast.success('Device updated successfully');
    },
  });
};

export const useDeleteFixOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: FixOrder.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['devices', 'device'],
      });
      toast.success('Device deleted successfully');
    },
  });
};
