import { CardHoverEffect } from '@/components/ui/CardHoverEffect';
import { useAllCategories } from '@/hooks/admin/useCategories';
import { useFeaturedCategories } from '@/hooks/useFeaturedCategories';
import React from 'react';

export default function CategoriesGrid() {
  const { data, isLoading } = useFeaturedCategories();
  return (
    <div className='relative max-w-5xl mx-auto px-8 pb-20 pt-28 '>
      <h1 className='heading'>
        Most Common Categories
        <span className='text-purple'> We Fix</span>
      </h1>
      <CardHoverEffect items={data} />
    </div>
  );
}
