import { Term } from '@/api/Term';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTerm = () => {
  return useQuery({
    queryKey: ['term'],
    queryFn: () => Term.get(),
  });
};

export const useCreateTerm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Term.create,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['term'],
      });
    },
  });
};
