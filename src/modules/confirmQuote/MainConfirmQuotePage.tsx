'use client';
import useWindowSize from '@/hooks/useWindowSize';
import ConfirmQuotePage from './ConfirmQuotePage';
import MobileConfirmPage from './MobileConfirmPage';

export default function MainConfirmQuotePage({
  truckTypes,
  settings,
}: {
  truckTypes: any;
  settings: any;
}) {
  const { width } = useWindowSize();

  if (width <= 1000) {
    return <MobileConfirmPage truckTypes={truckTypes} settings={settings} />;
  }
  return <ConfirmQuotePage truckTypes={truckTypes} settings={settings} />;
}
