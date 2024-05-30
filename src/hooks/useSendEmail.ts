import { SendEmail } from '@/api/SendEmail';
import { useMutation } from '@tanstack/react-query';

export const useSendEmail = () => {
  return useMutation({
    mutationFn: SendEmail.sendEmail,
  });
};
