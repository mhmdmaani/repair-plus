'use client';
import React from 'react';
import ContactHero from './ContactHero';
import Appbar from '@/shared/layout/Appbar';
import TopHeader from '@/modules/home/TopHeader';
import Footer from '@/shared/layout/Footer';
import SubscribeSection from '../home/SubscribeSection';
import ContactForm from './ContactForm';
import { Container, Grid, Typography, styled } from '@mui/material';
import OurLocationMap from '@/shared/layout/OurLocationMap';
import ContactTypes from './ContactTypes';
import ScheduleCall from './ScheduleCall';

const SectionTitle = styled(Typography)`
  margin: 20px 0;
  font-weight: 700;
`;
const MainContainer = styled('div')`
  padding: 60px 0;
`;
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Container>
        <MainContainer>
          <ContactTypes />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <SectionTitle variant='h4'>Kontakta oss</SectionTitle>
              <ContactForm />
            </Grid>
            <Grid item xs={12} md={6}>
              <SectionTitle variant='h4'>
                Välkommen till vårt kontor!
              </SectionTitle>
              <OurLocationMap />
            </Grid>
          </Grid>
          <ScheduleCall />
        </MainContainer>
      </Container>
      <SubscribeSection />
    </>
  );
}
