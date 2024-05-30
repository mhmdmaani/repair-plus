import DashboardPage from '@/modules/admin/dashboard/DashboardPage';
import { signIn, useSession } from 'next-auth/react';

export default function Dashbaord() {
  return <DashboardPage />;
}
