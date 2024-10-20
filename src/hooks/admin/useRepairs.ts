import { Repair } from '@/api/Repair';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Brand } from '@/api/Brand';
import { Device } from '@/api/Device';

export const useRepairs = () => {
  return useQuery({
    queryKey: ['repairs'],
    queryFn: Repair.getAll,
  });
};

export const useRepair = (id: string) => {
  return useQuery({
    queryKey: ['repair', id],
    queryFn: (a) => Repair.getSingle,
  });
};

export const useSearchRepairs = (data: any) => {
  return useQuery({
    queryKey: [
      'repairs',
      data.searchKey,
      data.page,
      data.perPage,
      data.sortBy,
      data.isAsc,
      data.deviceId,
      data.isAdmin,
    ],
    queryFn: () => Repair.getSearch(data),
  });
};

export const useCreateRepair = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Repair.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['repairs'],
      });
      toast.success('Repair created successfully');
    },
  });
};

export const useUpdateRepair = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Repair.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['repairs'],
      });
      toast.success('Repair updated successfully');
    },
  });
};

export const useDeleteRepair = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Repair.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['repairs', 'repair'],
      });
      toast.success('Repair deleted successfully');
    },
  });
};

export const useSearchByDevices = (data: any) => {
  return useQuery({
    queryKey: ['repairsByDevices', data.searchKey, data.devices],
    queryFn: () => Repair.searchByDevices(data),
  });
};

export const useSearchAll = (data: any) => {
  return useQuery({
    queryKey: [
      'repairsAll',
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
    queryFn: () => Repair.searchAll(data),
  });
};

export const useImportRepairs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Repair.importFromDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['repairs'],
      });
      toast.success('Repairs imported successfully');
    },
  });
};
