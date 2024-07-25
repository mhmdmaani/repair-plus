'use client';
import Appbar from '@/shared/layout/Appbar';
import Footer from '@/shared/layout/Footer';
import { styled } from '@mui/material';
import AboutSection from './AboutSection';
import ChooseUs from './ChooseUs';
import ClientsSection from './ClientsSection';
import FeatureCards from './FeatureCards';
import HeroSection from './HeroSection';
import Services from './Services';
import SubscribeSection from './SubscribeSection';
import TopHeader from './TopHeader';
import SelectDevice from './SelectDevice';
import Hero from '@/components/Hero';
import CategoriesGrid from './CategoriesGrid';
import { FloatingNav } from '@/components/ui/FloatingNavbar';
import BrandsGrid from './BrandsGrid';
import { Brand, Category, Review } from 'prisma/prisma-client';
import { ReviewsSlider } from './ReviewsSlider';
const MainContainer = styled('div')`
  overflow-x: hidden;
`;
export default function HomePage({
  categories,
  featuredBrands,
  activeBrands,
  reviews,
}: {
  categories: Category[];
  featuredBrands: Brand[];
  activeBrands: Brand[];
  reviews: Review[];
}) {
  return (
    <div className='bg-black-100 overflow-hidden'>
      <Hero />

      <BrandsGrid brands={featuredBrands} />
      <SelectDevice brands={activeBrands} />
      <ReviewsSlider reviews={reviews} />
      <div data-aos={'fade-up'}>
        <AboutSection />
      </div>

      <ChooseUs />
      <SubscribeSection />
      <ClientsSection />
    </div>
  );
}
