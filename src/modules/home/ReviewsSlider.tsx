'use client';

import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards';
import { Review } from 'prisma/prisma-client';
import React, { useEffect, useState } from 'react';
import { Fade } from '@mui/material';

export function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  return (
    <div className='h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
      <Fade in timeout={1500}>
        <h1 className='heading mb-8'>
          Our Customers
          <span className='text-purple ml-1'> Reviews </span>
        </h1>
      </Fade>
      <InfiniteMovingCards items={reviews} direction='right' speed='slow' />
    </div>
  );
}
