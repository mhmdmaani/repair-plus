'use client';
import { Box, Container, Grid, Typography, styled } from '@mui/material';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { GOOGLE_API_KEY } from '@/api/settings';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import OurLocationMap from './OurLocationMap';

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
  color: ${(props) => props.theme.palette.primary.contrastText};
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
  color: ${(props) => props.theme.palette.primary.contrastText};
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
  background: #d42b22;
  padding: 20px 0;
`;

const BottomBarContent = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Footer() {
  return (
    <MainContainer>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <LogoSection>
              <Logo src='nq.png' />
              <Typography variant='body2' color={'white'}>
                4200 Hamill Avenue, San Diego, California 92109
              </Typography>
              <div>
                <Typography variant='caption' color={'white'}>
                  Email:
                </Typography>
                <Typography variant='body2' color={'white'}>
                  info@national-quick.com
                </Typography>
              </div>

              <div>
                <Typography variant='caption' color={'white'}>
                  Phone:
                </Typography>
                <Typography variant='body2' color={'white'}>
                  021 3456 789
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
              Quick Links
            </SectionTitle>
            <Divider />
            <LinksContainer>
              <CustomLink href='/'>
                <Typography variant='caption' textTransform={'uppercase'}>
                  Home
                </Typography>
              </CustomLink>
              <CustomLink href='/services'>
                <Typography variant='caption' textTransform={'uppercase'}>
                  Services
                </Typography>
              </CustomLink>
              <CustomLink href='/about'>
                <Typography variant='caption' textTransform={'uppercase'}>
                  About
                </Typography>
              </CustomLink>
              <CustomLink href='/contact'>
                <Typography variant='caption' textTransform={'uppercase'}>
                  Contact
                </Typography>
              </CustomLink>
              <CustomLink href='/terms'>
                <Typography variant='caption' textTransform={'uppercase'}>
                  Terms
                </Typography>
              </CustomLink>
              <CustomLink href='/privacy'>
                <Typography variant='caption' textTransform={'uppercase'}>
                  Privacy Policy
                </Typography>
              </CustomLink>
            </LinksContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <OurLocationMap />
          </Grid>
        </Grid>
      </Container>
      <BottomBar>
        <Container>
          <BottomBarContent>
            <Typography variant='caption' color={'white'}>
              &copy; 2021 Quick National. All Rights Reserved
            </Typography>
            <div
              style={{
                display: 'flex',
                gap: 10,
              }}
            >
              <Link href='/privacy'>
                <Typography variant='caption' color={'white'}>
                  Privacy Policy
                </Typography>
              </Link>

              <Link href='/terms'>
                <Typography variant='caption' color={'white'}>
                  Terms & Conditions
                </Typography>
              </Link>
            </div>
          </BottomBarContent>
        </Container>
      </BottomBar>
    </MainContainer>
  );
}
