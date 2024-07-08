import React from 'react';

export default function Brand({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <div>{params.id}</div>;
}
