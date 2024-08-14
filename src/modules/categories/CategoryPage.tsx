'use client';
import { useSortAndSearch } from '@/hooks/useSearchAndSort';
import EnhancedTable from '@/shared/table/EnhancedTable';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
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
} from '@mui/material';
import { useState } from 'react';
import {
  useSearchDevices,
  useSearchDevicesByCategories,
} from '@/hooks/admin/useDevices';
import { Brand, Category, Device } from 'prisma/prisma-client';
import { useRouter } from 'next/navigation';
import SelectBrand from './SelectBrand';
import { useCategory } from '@/hooks/admin/useCategories';
import CategoryItem from './CategoryItem';
import CategoryItemAlt from './CategoryItemAlt';

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
`;

const ItemCard = styled(Card)`
  background: rgba(17, 25, 40, 1);
  border-width: 2px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    border-color: #cbacf9;
  }
  :hover img {
    transform: scale(1.1);
  }
`;

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px', // Adjust this value as needed
  },
}));

export default function CategoryPage({
  category,
  subCategories,
}: {
  category: Category | null;
  subCategories: Category[];
}) {
  const {
    page,
    perPage,
    search,
    sortBy,
    isASC,
    setPage,
    setPerPage,
    setIsASC,
    setSearch,
    setSortBy,
  } = useSortAndSearch();
  const { data } = useSearchDevicesByCategories({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
    brandId: undefined,
    categoryId: category?.id,
  });

  return (
    <div
      className='bg-black-100'
      style={{
        paddingTop: 100,
      }}
    >
      <Container>
        <Typography variant='h4' textAlign='center' fontWeight='bold'>
          {category?.name}
        </Typography>
        <GridContainer>
          <Grid container spacing={2}>
            {subCategories.map((cat) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={cat.id}>
                <CategoryItem category={cat} />
              </Grid>
            ))}
          </Grid>
        </GridContainer>

        <Stack
          direction='row'
          justifyContent={'space-between'}
          spacing={2}
          padding={2}
        >
          <Title>{category?.name}</Title>
          <SearchContainer>
            <CustomTextField
              sx={{ borderRadius: '12px' }}
              style={{ borderRadius: '12px' }}
              fullWidth
              value={search}
              label={'Model Name'}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchContainer>
        </Stack>
        <GridContainer>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CustomCard
                sx={{
                  minHeight: 'calc(100vh - 200px)',
                  borderRadius: '30px',
                }}
              >
                <Grid container spacing={1}>
                  {data?.data?.map((model: Device) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={model.id}>
                      <UnstyledLink href={`/fix/model/${model.id}`}>
                        <ItemCard
                          style={{
                            cursor: 'pointer',
                            marginTop: '30px',
                            height: 300,
                          }}
                          className='group'
                        >
                          <CardMedia
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '70%',
                            }}
                          >
                            <CustomImage
                              src={model.image || ''}
                              alt={model.name}
                              style={{
                                width: 'auto',
                                height: '70%',
                                objectFit: 'cover',
                                margin: 'auto',
                              }}
                            />
                          </CardMedia>
                          <CardContent>
                            <div className='group-hover:animate-bounce'>
                              <Typography
                                variant='body2'
                                fontWeight={'bold'}
                                textAlign={'center'}
                              >
                                {model.name}
                              </Typography>
                            </div>
                            <Typography
                              variant='body2'
                              fontWeight={'bold'}
                              textAlign={'center'}
                            >
                              {' '}
                              {model.modelNumber}{' '}
                            </Typography>
                          </CardContent>
                        </ItemCard>
                      </UnstyledLink>
                    </Grid>
                  ))}
                </Grid>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 75, 100, 200]}
                  component='div'
                  count={-1}
                  rowsPerPage={perPage}
                  page={page}
                  onPageChange={(_: any, newPage: number) => setPage(newPage)}
                  onRowsPerPageChange={(event: any) => {
                    setPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                  }}
                />
              </CustomCard>
            </Grid>
          </Grid>
        </GridContainer>
      </Container>
    </div>
  );
}
