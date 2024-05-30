import { Subscription } from '@/api/Subscription';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Truck } from '@/api/truck';

export const useSubscriptions = ({
  searchKey,
  page,
  perPage,
  sortBy,
  isAsc,
}: {
  searchKey: any;
  page: any;
  perPage: any;
  sortBy?: any;
  isAsc?: any;
}) => {
  return useQuery({
    queryKey: ['subscriptions', searchKey, page, perPage, sortBy, isAsc],
    queryFn: () =>
      Subscription.getAll({ searchKey, page, perPage, sortBy, isAsc }),
  });
};

export const useUpdateSubscription = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Subscription.update,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['subscriptions'],
      });
    },
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Subscription.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      });
    },
  });
};

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Subscription.delete,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['subscriptions'],
      });
    },
  });
};
