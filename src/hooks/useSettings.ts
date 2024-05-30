import { GetSettings } from '@/api/settings';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: GetSettings.getSettings,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: GetSettings.changeSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
  });
};
