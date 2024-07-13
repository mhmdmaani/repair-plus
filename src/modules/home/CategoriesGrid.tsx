import { CardHoverEffect } from '@/components/ui/CardHoverEffect';
import { Category } from 'prisma/prisma-client';
import React from 'react';

function CategoriesGrid({ categories }: { categories: Category[] }) {
  return (
    <div className='relative max-w-5xl mx-auto px-8 pb-20 pt-28 '>
      <h1 className='heading'>
        Most Common Categories
        <span className='text-purple'> We Fix</span>
      </h1>
      <CardHoverEffect items={categories} />
    </div>
  );
}

export default CategoriesGrid;
