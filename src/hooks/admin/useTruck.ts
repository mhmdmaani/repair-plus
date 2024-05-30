import { Truck } from '@/api/truck';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTrucks = ({
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
    queryKey: ['trucks', searchKey, page, perPage, sortBy, isAsc],
    queryFn: () => Truck.getAll({ searchKey, page, perPage, sortBy, isAsc }),
  });
};

export const useTruck = (id: string) => {
  return useQuery({
    queryKey: ['truck', id],
    queryFn: () => Truck.getSingle(id),
  });
};

export const useUpdateTruck = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Truck.update,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['trucks'],
      });
    },
  });
};

export const useCreateTruck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Truck.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['trucks'],
      });
    },
  });
};

export const useAssignTruckToOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Truck.assignTruckToIrder,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['order'],
      });
    },
  });
};
export const useSearchTrucks = (searchKey: string, truckTypeId: string) => {
  return useQuery({
    queryKey: ['searchTrucks', searchKey, truckTypeId],
    queryFn: () => Truck.searchTruck(searchKey, truckTypeId),
  });
};
