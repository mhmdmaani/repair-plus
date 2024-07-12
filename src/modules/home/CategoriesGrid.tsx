import { CardHoverEffect } from '@/components/ui/CardHoverEffect';
import { useFeaturedCategories } from '@/hooks/useFeaturedCategories';
import { PrismaClient } from 'prisma/prisma-client';

import React from 'react';

async function CategoriesGrid() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
  });
  await prisma.$disconnect();

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
