import { Offer } from '@/api/Offer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useOffers = ({
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
    queryKey: ['offers', searchKey, page, perPage, sortBy, isAsc],
    queryFn: () => Offer.getAll({ searchKey, page, perPage, sortBy, isAsc }),
  });
};

export const useOffer = (id: string) => {
  return useQuery({
    queryKey: ['offer', id],
    queryFn: () => Offer.getSingle(id),
  });
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Offer.update,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['offers'],
      });
      toast.success('Offer updated successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Offer.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['offer', 'searchOffers', 'offers'],
      });
      toast.success('Offer created successfully');
    },
    onError: (err) => {
      toast.error(JSON.stringify(err) || 'An error occurred');
    },
  });
};

export const useCurrentOffer = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['currentOffer'],
    queryFn: () => Offer.getCurrentOffers(),
  });
};
