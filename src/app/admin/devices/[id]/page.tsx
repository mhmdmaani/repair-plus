import RepairsPage from '@/modules/admin/repairs/RepairsPage';
import React from 'react';

export default function DeviceRepairs({ id }: { id: string }) {
  return <RepairsPage deviceId={id} />;
}
