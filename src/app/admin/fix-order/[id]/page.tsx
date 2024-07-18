import FixOrderForm from '@/modules/admin/fix-order/FixOrderForm';
import React from 'react';

export default function EditFix({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <FixOrderForm id={params.id} />;
}
