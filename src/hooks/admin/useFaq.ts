import { Faq } from '@/api/Faq';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAllFaqs = () => {
  return useQuery({
    queryKey: ['allFaqs'],
    queryFn: Faq.getAll,
  });
};

export const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Faq.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allFaqs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['activeFaqs'],
      });
      toast.success('Faq created successfully');
    },
  });
};

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Faq.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allFaqs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['activeReviews'],
      });

      queryClient.invalidateQueries({
        queryKey: ['searchReviews'],
      });

      toast.success('Faq updated successfully');
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Faq.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allFaqs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['activeReviews'],
      });

      queryClient.invalidateQueries({
        queryKey: ['searchReviews'],
      });
      toast.success('Faq deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
    },
  });
};

export const useImportReviews = () => {
  return useQuery({
    queryKey: ['importReviews'],
    queryFn: Faq.importFromGoogleMaps,
  });
};

export const useCreateManyReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Faq.createMany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allFaqs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['activeReviews'],
      });

      queryClient.invalidateQueries({
        queryKey: ['searchReviews'],
      });
      toast.success('Faq created successfully');
    },
  });
};
