import { GetSettings } from '@/api/settings';
import OrderDetails from '@/modules/orders/OrderDetails';

export default async function SingleOrder({ params }: { params: any }) {
  const settings = await GetSettings.getSettings();
  return <OrderDetails id={params.id} settings={settings} />;
}
