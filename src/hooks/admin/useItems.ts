import { Item } from '@/api/Item';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Brand } from '@/api/Brand';
import { Device } from '@/api/Device';

export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: Item.getAll,
  });
};

export const useItem = (id: string) => {
  return useQuery({
    queryKey: ['repair', id],
    queryFn: (a) => Item.getSingle,
  });
};

export const useSearchItems = (data: any) => {
  return useQuery({
    queryKey: [
      'items',
      data.searchKey,
      data.page,
      data.perPage,
      data.sortBy,
      data.isAsc,
      data.deviceId,
      data.isAdmin,
    ],
    queryFn: () => Item.getSearch(data),
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Item.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['items'],
      });
      toast.success('Item created successfully');
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Item.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['items'],
      });
      toast.success('Item updated successfully');
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Item.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['items', 'repair'],
      });
      toast.success('Item deleted successfully');
    },
  });
};

export const useSearchByDevices = (data: any) => {
  return useQuery({
    queryKey: ['itemsDevices', data.searchKey, data.devices],
    queryFn: () => Item.searchByDevices(data),
  });
};

export const useSearchAll = (data: any) => {
  return useQuery({
    queryKey: [
      'itemsAll',
      data.searchKey,
      data.page,
      data.perPage,
      data.sortBy,
      data.isAsc,
      data.deviceId,
      data.isAdmin,
      data.categoryId,
      data.brandId,
    ],
    queryFn: () => Item.searchAll(data),
  });
};
