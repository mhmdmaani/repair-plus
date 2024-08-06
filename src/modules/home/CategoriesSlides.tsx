import CardSlider from '@/components/CustomSlider';
import { Container } from '@mui/material';
import { Category, Device } from 'prisma/prisma-client';
import React from 'react';

function CategoriesSLides({ categories }: { categories: any[] }) {
  return (
    <div className='relative max-w-5xl mx-auto px-8 py-20'>
      <h1 className='heading mb-5'>
        De vanligaste modellerna
        <span className='text-purple'> vi reparerar</span>
      </h1>
      {categories.map((category) => (
        <div className='pt-5' key={category.id}>
          <CardSlider
            items={category.devices.map((device: Device) => ({
              id: device.id,
              name: device.name,
              image: device.image,
            }))}
          />
        </div>
      ))}
    </div>
  );
}

export default CategoriesSLides;
