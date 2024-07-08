import { Category } from '@/api/Category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: Category.getAll,
  });
};

export const useSearchCategories = (data: any) => {
  return useQuery({
    queryKey: [
      'categories',
      data.searchKey,
      data.page,
      data.perPage,
      data.sortBy,
      data.isAsc,
    ],
    queryFn: () => Category.getSearch(data),
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => Category.getSingle(id),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Category.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Category created successfully');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Category.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Category updated successfully');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Category.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Category deleted successfully');
    },
  });
};
