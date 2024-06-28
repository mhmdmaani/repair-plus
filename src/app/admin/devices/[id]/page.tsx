import RepairsPage from '@/modules/admin/repairs/RepairsPage';
import React from 'react';

const DeviceRepairs = (props: any) => {
  const { id } = props;
  return <RepairsPage deviceId={id} />;
};

export default DeviceRepairs;
