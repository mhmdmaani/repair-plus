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
const ItemCard = styled('div')`
  background: rgba(17, 25, 40, 1);
  border-radius: 12px;
  border-width: 2px;
  border-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    border-color: #cbacf9;
  }
  :hover img {
    transform: scale(1.1);
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

const MainContainer = styled('div')`
  padding-top: 120px;
  padding-bottom: 100px;
`;
export default function BrandsPage({ brands }: { brands: Brand[] }) {
  return (
    <MainContainer>
      <Container>
        <Title variant='h4' fontWeight={'bold'} textAlign={'center'}>
          Välj ett märke
        </Title>
        <GridContainer>
          <Grid
            container
            spacing={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {brands.map((brand) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={brand.id}>
                <UnstyledLink href={`/fix/brand/${brand.id}`}>
                  <ItemCard
                    style={{
                      cursor: 'pointer',
                      marginTop: '30px',
                      height: 300,
                    }}
                    className='group'
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
                      <Typography
                        variant='h6'
                        fontWeight={'bold'}
                        style={{ textAlign: 'center' }}
                      >
                        {brand.name}
                      </Typography>
                    </CardContent>
                  </ItemCard>
                </UnstyledLink>
              </Grid>
            ))}
          </Grid>
        </GridContainer>
      </Container>
    </MainContainer>
  );
}
