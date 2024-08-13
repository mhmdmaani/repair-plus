'use client';
import { Box, Container, Grid, Typography, styled } from '@mui/material';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { GOOGLE_API_KEY } from '@/api/settings';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import OurLocationMap from './OurLocationMap';
import { useSettings } from '@/hooks/useSettings';

const MainContainer = styled('div')`
  background: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.background.paper
      : props.theme.palette.primary.main};
  padding: 60px 0 0 0;
`;

const LogoSection = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Logo = styled('img')`
  width: 200px;
  height: 50px;
  object-fit: cover;
`;

const SocialContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SocialLink = styled('a')`
  text-decoration: none;
  font-size: 1.5rem;
  color: ${(props) => props.theme.palette.common.white};
  cursor: pointer;
`;
const SectionTitle = styled(Typography)``;
const Divider = styled('div')`
  width: 120px;
  height: 5px;
  background: ${(props) => props.theme.palette.primary.light};
  margin-top: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const LinksContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.palette.common.white};
`;

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const BottomBar = styled('div')`
  width: 100%;
  padding: 20px 0;
`;

const BottomBarContent = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Footer() {
  const { data } = useSettings();
  return (
    <>
      <div className='h-[40rem] mt-24 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <LogoSection>
                <Typography variant='h4' color={'white'}>
                  Repair Plus
                </Typography>
                <Typography variant='body2' color={'white'}>
                  Kardanvägen 10, 461 38 Trollhättan
                </Typography>
                <div>
                  <Typography variant='caption' color={'white'}>
                    E-post:
                  </Typography>
                  <Typography variant='body2' color={'white'}>
                    {data?.contactEmail}
                  </Typography>
                </div>

                <div>
                  <Typography variant='caption' color={'white'}>
                    Telefon:
                  </Typography>
                  <Typography variant='body2' color={'white'}>
                    {data?.contactPhone}
                  </Typography>
                </div>
                <SocialContainer>
                  <SocialLink>
                    <FaFacebookF />
                  </SocialLink>
                  <SocialLink>
                    <FaInstagram />
                  </SocialLink>
                  <SocialLink>
                    <FaLinkedinIn />
                  </SocialLink>

                  <SocialLink>
                    <FaYoutube />
                  </SocialLink>
                </SocialContainer>
              </LogoSection>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <SectionTitle variant='h6' color={'white'}>
                Snabblänkar
              </SectionTitle>
              <Divider />
              <LinksContainer>
                <CustomLink href='/'>
                  <Typography variant='caption' textTransform={'uppercase'}>
                    Hem
                  </Typography>
                </CustomLink>
                <CustomLink href='/fix/brands'>
                  <Typography variant='caption' textTransform={'uppercase'}>
                    Reparation
                  </Typography>
                </CustomLink>
                <CustomLink href='/about'>
                  <Typography variant='caption' textTransform={'uppercase'}>
                    Om oss
                  </Typography>
                </CustomLink>
                <CustomLink href='/contact'>
                  <Typography variant='caption' textTransform={'uppercase'}>
                    Kontakt
                  </Typography>
                </CustomLink>
                <CustomLink href='/terms'>
                  <Typography variant='caption' textTransform={'uppercase'}>
                    Villkor
                  </Typography>
                </CustomLink>
                <CustomLink href='/privacy'>
                  <Typography variant='caption' textTransform={'uppercase'}>
                    Sekretesspolicy
                  </Typography>
                </CustomLink>
              </LinksContainer>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <OurLocationMap />
            </Grid>
          </Grid>
        </Container>
      </div>

      <BottomBar className='bg-black-100 mt-4'>
        <Container>
          <BottomBarContent>
            <Typography variant='caption' color={'white'} fontWeight={'bold'}>
              &copy; {new Date().getFullYear()} MNB Mobilteknik AB. Alla
              rättigheter förbehållna
            </Typography>
            <div
              style={{
                display: 'flex',
                gap: 10,
              }}
            >
              <Link href='/privacy'>
                <Typography
                  variant='caption'
                  color={'white'}
                  fontWeight={'bold'}
                >
                  Sekretesspolicy
                </Typography>
              </Link>

              <Link href='/terms'>
                <Typography
                  variant='caption'
                  color={'white'}
                  fontWeight={'bold'}
                >
                  Villkor
                </Typography>
              </Link>
            </div>
          </BottomBarContent>
        </Container>
      </BottomBar>
    </>
  );
}
