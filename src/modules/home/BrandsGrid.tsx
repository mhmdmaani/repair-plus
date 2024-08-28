import React from 'react';

import { Vortex } from '@/components/ui/Vortex';
import Link from 'next/link';
import { Grid } from '@mui/material';
import { Brand } from 'prisma/prisma-client';

export default function BrandsGrid({ brands }: { brands: Brand[] }) {
  return (
    <div className='relative max-w-5xl mx-auto px-8 py-20'>
      <h1 className='heading mb-5'>
        De vanligaste märkena
        <span className='text-purple'> vi reparerar</span>
      </h1>
      <Vortex backgroundColor='transparent'>
        <Grid container spacing={2} justifyContent={'center'}>
          {brands?.map((item: any) => (
            <Grid
              item
              key={item?.id}
              justifyContent={'center'}
              alignItems={'center'}
              lg={3}
              md={6}
              sm={6}
            >
              <Link
                href={`/fix/brand/${item?.id}`}
                className='flex justify-center items-center flex-col'
              >
                <div
                  className='rounded-full flex justify-center items-center transform hover:scale-130 transition-all duration-300 ease-in-out'
                  style={{
                    width: '150px',
                    height: '150px',
                  }}
                >
                  <img
                    src={item?.logo}
                    style={{
                      width: '80px',
                      height: 'auto',
                    }}
                  />
                </div>
                <h4 className='mt-3'>{item.name}</h4>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Vortex>
    </div>
  );
}
