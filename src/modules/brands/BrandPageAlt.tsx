'use client';
import { useSortAndSearch } from '@/hooks/useSearchAndSort';
import EnhancedTable from '@/shared/table/EnhancedTable';
import Link from 'next/link';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  styled,
  Card,
  Container,
  Grid,
  CardContent,
  CardMedia,
  TablePagination,
  Avatar,
} from '@mui/material';
import { useState } from 'react';
import { useSearchDevices } from '@/hooks/admin/useDevices';
import { Brand, Category, Device } from 'prisma/prisma-client';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/hooks/admin/useCategories';
import SelectCategory from './SelectCategory';
import { FiChevronRight } from 'react-icons/fi';
import CategoryItemAlt from '../categories/CategoryItemAlt';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
`;

const GridContainer = styled('div')`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CustomCard = styled('div')`
  background-color: transparent;
`;

const CustomImage = styled('img')`
  transition: all 0.5s ease-in-out;
`;

const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
`;

const ItemCard = styled('div')`
  background: rgba(17, 25, 40, 1);
  border-width: 2px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    border-color: #cbacf9;
  }
  :hover img {
    transform: scale(1.1);
  }
`;
export default function BrandPageAlt({
  brandId,
  brand,
  categories,
}: {
  brandId: string;

  brand: Brand | null;
  categories: Category[];
}) {
  return (
    <div
      className='bg-black-100'
      style={{
        paddingTop: 100,
      }}
    >
      <Container>
        <Stack
          direction='row'
          gap={2}
          alignItems={'center'}
          spacing={2}
          padding={2}
        >
          {brand?.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              style={{ width: '50px', height: 'auto' }}
            />
          ) : (
            <Avatar>{brand?.name.charAt(0).toUpperCase()}</Avatar>
          )}
          <Title>{brand?.name}</Title>
        </Stack>
        <GridContainer>
          <Grid container spacing={1}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <CategoryItemAlt category={category} />
              </Grid>
            ))}
          </Grid>
        </GridContainer>
      </Container>
    </div>
  );
}
