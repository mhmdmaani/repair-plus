import { GetSettings } from '@/api/settings';
import HomePage from '@/modules/home/HomePage';

export default async function Home() {
  const settings = await GetSettings.getSettings();
  return <HomePage />;
}
