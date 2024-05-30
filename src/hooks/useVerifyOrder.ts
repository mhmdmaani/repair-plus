import { VerifyOrder } from '@/api/VerifyOrder';
import { useQuery } from '@tanstack/react-query';

export const useVerifyOrder = (code: string | null) => {
  return useQuery({
    queryKey: ['verifyOrder', code],
    queryFn: () => VerifyOrder.verifyOrder(code),
  });
};
