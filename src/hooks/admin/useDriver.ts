import { Driver } from '@/api/driver';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useDrivers = ({
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
    queryKey: ['drivers', searchKey, page, perPage, sortBy, isAsc],
    queryFn: () => Driver.getAll({ searchKey, page, perPage, sortBy, isAsc }),
  });
};

export const useAllDrivers = (searchKey: string) => {
  return useQuery({
    queryKey: ['searchDrivers', searchKey],
    queryFn: () => Driver.searchDrivers(searchKey),
  });
};
export const useDriver = (id: string) => {
  return useQuery({
    queryKey: ['driver', id],
    queryFn: () => Driver.getSingle(id),
  });
};

export const useUpdateDriver = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Driver.update,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['drivers'],
      });
      toast.success('Driver updated successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};

export const useCreateDriver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Driver.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['driver', 'searchDrivers'],
      });
      toast.success('Driver created successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};

export const useAssignDriverToOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Driver.assignDriverToOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['order'],
      });
      toast.success('Driver assigned to order successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};
