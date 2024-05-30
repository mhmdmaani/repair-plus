import { Skeleton } from '@mui/material';

export default function PartItemSkeleton() {
  return (
    <Skeleton
      variant='rectangular'
      width={'100%'}
      height={200}
      animation='wave'
    />
  );
}
