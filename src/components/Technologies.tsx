import { technologies } from '@/data';
import React from 'react';
import { CardHoverEffect } from './ui/CardHoverEffect';
import { BackgroundBeams } from '@/components/ui/BackgroundBeam';

function Technologies() {
  return (
    <div id='tech' className='relative max-w-5xl mx-auto px-8 py-20'>
      <h1 className='heading'>
        Top Technologies I Use{' '}
        <span className='text-purple'>for Development</span>
      </h1>
      <CardHoverEffect items={technologies} />
    </div>
  );
}

export default Technologies;
