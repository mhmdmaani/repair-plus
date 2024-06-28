import CategoryPage from '@/modules/categories/CategoryPage';
import React from 'react';
import Appbar from '@/shared/layout/Appbar';
import TopHeader from '@/modules/home/TopHeader';

export default function Category({ id }: any) {
  return (
    <>
      <TopHeader />
      <Appbar />
      <CategoryPage categoryId={id} />
    </>
  );
}
