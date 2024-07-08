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

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CustomCard = styled(Card)`
  transition: all 0.5s ease-in-out;
  :hover img {
    transform: scale(1.1);
    transition: all 0.5s ease-in-out;
  }
`;

const CustomImage = styled('img')`
  transition: all 0.5s ease-in-out;
`;
export default function CategoriesPage({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Container
      sx={{
        paddingTop: '40px',
      }}
    >
      <Title variant='h1' fontSize={'2rem'} fontWeight={'bold'}>
        Categories
      </Title>
      <GridContainer>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <UnstyledLink href={`/fix/category/${category.id}`}>
                <CustomCard
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <CardMedia>
                    <CustomImage
                      src={category.image || ''}
                      alt={category.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography variant='h6' fontWeight={'bold'}>
                      {category.name}
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
