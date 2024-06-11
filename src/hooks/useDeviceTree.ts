import { Device } from '@/api/Device';
import { useQuery } from '@tanstack/react-query';
export const useDeviceTree = (id: string) => {
  return useQuery({
    queryKey: ['device', id],
    queryFn: (a) => Device.getDeviceTree(id),
  });
};
