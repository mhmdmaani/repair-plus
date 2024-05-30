import { Payment } from '@/api/Payment';
import { useMutation } from '@tanstack/react-query';

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: Payment.createPayment,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
