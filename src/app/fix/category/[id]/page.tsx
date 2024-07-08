import CategoryPage from '@/modules/categories/CategoryPage';
import React from 'react';
import Appbar from '@/shared/layout/Appbar';
import TopHeader from '@/modules/home/TopHeader';
import Footer from '@/shared/layout/Footer';

export default function Category({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <>
      <TopHeader />
      <Appbar />
      <CategoryPage categoryId={params.id} />
      <Footer />
    </>
  );
}
