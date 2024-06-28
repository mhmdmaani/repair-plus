'use client';
import { Box, Card, Container, Grid, Typography, styled } from '@mui/material';
import Link from 'next/link';
import { Brand } from 'prisma/prisma-client';
import React from 'react';

const Title = styled(Typography)`
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

export default function BrandsPage({ brands }: { brands: Brand[] }) {
  return (
    <Container>
      <Title variant='h1'>Brands</Title>
      <GridContainer>
        <Grid container spacing={2}>
          {brands.map((brand) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={brand.id}>
              <UnstyledLink href={`/brand/${brand.id}`}>
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant='h4'>{brand.name}</Typography>
                </Card>
              </UnstyledLink>
            </Grid>
          ))}
        </Grid>
      </GridContainer>
    </Container>
  );
}
