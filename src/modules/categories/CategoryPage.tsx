'use client';
import { useSortAndSearch } from '@/hooks/useSearchAndSort';
import EnhancedTable from '@/shared/table/EnhancedTable';
import {
  div,
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
import { useSearchDevices } from '@/hooks/admin/useDevices';
import { Brand, Device } from 'prisma/prisma-client';
import { useRouter } from 'next/navigation';
import SelectBrand from './SelectBrand';

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

export default function CategoryPage({ categoryId }: { categoryId: string }) {
  const [addNew, setAddNew] = useState(false);
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Brand | null>(null);
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
  const { data } = useSearchDevices({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
    brandId:
      !selectedBrand || !selectedBrand?.id ? undefined : selectedBrand?.id,
    categoryId: categoryId,
  });

  return (
    <Container>
      <Stack
        direction='row'
        justifyContent={'space-between'}
        spacing={2}
        padding={2}
      >
        <SearchContainer>
          <TextField
            fullWidth
            value={search}
            label={'Model Name'}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
      </Stack>
      <GridContainer>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Card>
              <SelectBrand
                selectedBrand={selectedBrand}
                onSelect={setSelectedBrand}
              />
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Card
              sx={{
                minHeight: 'calc(100vh - 200px)',
              }}
            >
              <Grid container>
                {data?.data?.map((model: Device) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={model.id}>
                    <UnstyledLink href={`/fix/model/${model.id}`}>
                      <div
                        sx={{
                          cursor: 'pointer',
                          marginTop: '30px',
                        }}
                      >
                        <CardMedia
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <CustomImage
                            src={model.image || ''}
                            alt={model.name}
                            style={{
                              width: '60%',
                              height: '90%',
                              objectFit: 'cover',
                              margin: 'auto',
                            }}
                          />
                        </CardMedia>
                        <CardContent>
                          <Typography
                            variant='body2'
                            fontWeight={'bold'}
                            textAlign={'center'}
                          >
                            {model.name}
                          </Typography>
                        </CardContent>
                      </div>
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
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </GridContainer>
    </Container>
  );
}
