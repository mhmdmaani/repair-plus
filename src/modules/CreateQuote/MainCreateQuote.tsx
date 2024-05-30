'use client';
import useWindowSize from '@/hooks/useWindowSize';
import CreateQuote from '@/modules/CreateQuote/CreateQuote';
import CreateQuoteMobile from '@/modules/CreateQuote/CreateQuoteMobile';
import { Settings, TruckType } from 'prisma/prisma-client';

function MainCreateQuote({
  truckTypes,
  settings,
  onSubmit,
}: {
  truckTypes: TruckType[];
  settings: Settings;
  onSubmit: () => void;
}) {
  const { width, height } = useWindowSize();
  if (width <= 1000) {
    return (
      <CreateQuoteMobile
        truckTypes={truckTypes}
        settings={settings}
        onSubmit={onSubmit}
      />
    );
  }
  return (
    <CreateQuote
      truckTypes={truckTypes}
      settings={settings}
      onSubmit={onSubmit}
    />
  );
}

export default MainCreateQuote;
