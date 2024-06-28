import React from 'react';
import { CardHoverEffect } from '@/components/ui/CardHoverEffect';
import { Vortex } from '@/components/ui/Vortex';
import { useAllBrands } from '@/hooks/admin/useBrands';
import Link from 'next/link';
import { Avatar, Card, Grid } from '@mui/material';
import { useFeaturedBrands } from '@/hooks/useFeaturedBrands';

export default function BrandsGrid() {
  const { data } = useFeaturedBrands();
  return (
    <div className='relative max-w-5xl mx-auto px-8 py-20'>
      <h1 className='heading mb-5'>
        Most Common Brands
        <span className='text-purple'> We Fix</span>
      </h1>
      <Vortex backgroundColor='transparent'>
        <Grid container spacing={2} justifyContent={'center'}>
          {data?.map((item: any) => (
            <Grid
              item
              key={item?.link}
              justifyContent={'center'}
              alignItems={'center'}
              lg={3}
              md={6}
              sm={6}
            >
              <Link
                href={`/brand/${item?.id}`}
                className='flex justify-center items-center flex-col'
              >
                <div
                  className='bg-white rounded-full flex justify-center items-center transform hover:scale-130 transition-all duration-300 ease-in-out'
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
                      filter:
                        'drop-shadow(0 0 0 red) drop-shadow(0 0 10px red);',
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
