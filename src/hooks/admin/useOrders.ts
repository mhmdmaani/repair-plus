import { Order } from '@/api/order';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getRouteData } from '../useRoutePoints';
import { toast } from 'react-toastify';

export const useOrders = ({
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
    queryKey: ['orders', searchKey, page, perPage, sortBy, isAsc],
    queryFn: () => Order.getOrders({ searchKey, page, perPage, sortBy, isAsc }),
  });
};

export const useOrder = (id: any) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => Order.getOrderDetails(id),
  });
};

export const useOrderRoutes = (
  collecton: any,
  delivery: any,
  stopPoints: any[]
) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState<any>([]);

  useEffect(() => {
    const onSetData = async () => {
      if (!collecton && !delivery) return;
      const data = await getRouteData(collecton, delivery, stopPoints);
      setStart(data?.start);
      setEnd(data?.end);
      setPath(data?.path);
    };
    onSetData();
  }, [collecton, delivery, stopPoints]);

  return { start, end, path };
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Order.updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['order'],
      });
      toast.success('Order updated successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};
