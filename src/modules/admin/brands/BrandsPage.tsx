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
} from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import BrandForm from './BrandForm';
import { useAllBrands, useSearchBrands } from '@/hooks/admin/useBrands';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export default function BrandsPage() {
  const [addNew, setAddNew] = useState(false);
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
  const [currentBrand, setCurrentBrand] = useState(null);
  const { data } = useSearchBrands({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
  });

  const columns = [
    {
      id: 'id',
      label: 'ID',
      renderCell: (row: any) => row.id,
    },
    {
      id: 'name',
      label: 'Name',
      renderCell: (row: any) => row.name,
    },
    {
      id: 'logo',
      label: 'Logo',
      renderCell: (row: any) => (
        <img
          src={row.logo}
          alt={row.name}
          style={{ width: 50, height: 50, objectFit: 'contain' }}
        />
      ),
    },
    {
      id: 'createdAt',
      label: 'Created At',
      renderCell: (row: any) => format(new Date(row.createdAt), 'dd/MM/yyyy'),
    },
    {
      id: 'updatedAt',
      label: 'Updated At',
      renderCell: (row: any) => format(new Date(row.updatedAt), 'dd/MM/yyyy'),
    },

    {
      id: 'operations',
      label: 'Operations',
      renderCell: (row: any) => (
        <Stack direction='row' spacing={2}>
          <Button
            onClick={() => {
              setCurrentBrand(row);
              setAddNew(true);
            }}
          >
            Edit
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Typography variant='h4'>Brands List</Typography>
      <Stack
        direction='row'
        justifyContent={'space-between'}
        spacing={2}
        padding={2}
      >
        <SearchContainer>
          <TextField
            value={search}
            label={'Search'}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
        <Button
          onClick={() => {
            setCurrentBrand(null);
            setAddNew(true);
          }}
        >
          Add New
        </Button>
      </Stack>

      <EnhancedTable
        data={data?.data || []}
        columns={columns}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isASC={isASC}
        setIsASC={setIsASC}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
      />
      <Dialog
        sx={{
          width: '100%',
        }}
        open={addNew}
        onClose={() => setAddNew(false)}
      >
        <DialogTitle>
          {currentBrand ? 'Edit Offer' : 'Add New Offer'}
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <BrandForm brand={currentBrand} onAdd={() => setAddNew(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
