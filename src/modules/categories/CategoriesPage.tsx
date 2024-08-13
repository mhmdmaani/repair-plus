'use client';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import Link from 'next/link';
import { Brand, Category } from 'prisma/prisma-client';
import React from 'react';
import CategoryItem from './CategoryItem';

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
  margin-top: 30px;
  margin-bottom: 30px;
`;

export default function CategoriesPage({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Container
      sx={{
        paddingTop: '100px',
      }}
    >
      <Title variant='h1' fontSize={'2rem'} fontWeight={'bold'}>
        Categories
      </Title>
      <GridContainer>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <CategoryItem category={category} />
            </Grid>
          ))}
        </Grid>
      </GridContainer>
    </Container>
  );
}
