import { OrderStep } from '@/api/OrderStep';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useOrderSteps = (orderId: string | null) => {
  return useQuery({
    queryKey: ['orderSteps', orderId],
    queryFn: () => OrderStep.getByOrderId(orderId),
  });
};

export const useUpdateOrderStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrderStep.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orderSteps'],
      });
      toast.success('Order step updated successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};

export const useCreateOrderStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrderStep.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orderSteps'],
      });
      toast.success('Order step created successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};

export const useGoBackStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: OrderStep.goBack,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orderSteps'],
      });
    },
  });
};
