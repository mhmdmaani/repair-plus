'use client';
import { useOrder } from '@/hooks/admin/useOrders';
import ReviewOrder from './ReviewOrder';

export default function OrderDetails({
  id,
  settings,
}: {
  id: string;
  settings: any;
}) {
  const { data, isLoading } = useOrder(id);

  if (isLoading) {
    return null;
  }
  return <ReviewOrder order={data} settings={settings} />;
}
