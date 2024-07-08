'use client';
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  styled,
  CardContent,
  CardMedia,
} from '@mui/material';
import Link from 'next/link';
import { Brand } from 'prisma/prisma-client';
import React from 'react';

const Title = styled(Typography)`
  margin-bottom: 20px;
  margin-top: 20px;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const GridContainer = styled(Box)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CustomCard = styled(Card)`
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  :hover img {
    transform: scale(1.1);
    transition: all 0.5s ease-in-out;
  }
`;

const CustomImage = styled('img')`
  width: 50%;
  transition: all 0.5s ease-in-out;
`;

const ImageContainer = styled(CardMedia)`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function BrandsPage({ brands }: { brands: Brand[] }) {
  return (
    <Container>
      <Title variant='h1' fontSize={'2rem'} fontWeight={'bold'}>
        Brands
      </Title>
      <GridContainer>
        <Grid container spacing={2}>
          {brands.map((brand) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={brand.id}>
              <UnstyledLink href={`/fix/brand/${brand.id}`}>
                <CustomCard
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <ImageContainer>
                    <CustomImage
                      src={brand.logo || ''}
                      alt={brand.name}
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </ImageContainer>

                  <CardContent>
                    <Typography variant='h6' fontWeight={'bold'}>
                      {brand.name}
                    </Typography>
                  </CardContent>
                </CustomCard>
              </UnstyledLink>
            </Grid>
          ))}
        </Grid>
      </GridContainer>
    </Container>
  );
}
