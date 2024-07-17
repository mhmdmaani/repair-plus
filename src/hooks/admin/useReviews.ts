import { Review } from '@/api/Review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAllReviews = () => {
  return useQuery({
    queryKey: ['allBrands'],
    queryFn: Review.getAll,
  });
};

export const useSearchReviews = (data: any) => {
  return useQuery({
    queryKey: [
      'searchBrands',
      data.searchKey,
      data.page,
      data.perPage,
      data.sortBy,
      data.isAsc,
      data.isAdmin,
    ],
    queryFn: () => Review.getSearch(data),
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Review.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
      toast.success('Review created successfully');
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Review.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
      toast.success('Review updated successfully');
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Review.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
      toast.success('Review deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
    },
  });
};

export const useImportReviews = () => {
  return useQuery({
    queryKey: ['importReviews'],
    queryFn: Review.importFromGoogleMaps,
  });
};

export const useCreateManyReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Review.createMany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
      toast.success('Review created successfully');
    },
  });
};
