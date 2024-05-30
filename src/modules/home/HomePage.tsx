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
const MainContainer = styled('div')`
  overflow-x: hidden;
`;
export default function HomePage() {
  return (
    <MainContainer>
      <TopHeader />
      <Appbar />
      <HeroSection />
      <div data-aos={'fade-up'}>
        <AboutSection />
      </div>
      <Services />
      <ChooseUs />
      <SubscribeSection />
      <ClientsSection />
      <Footer />
    </MainContainer>
  );
}
