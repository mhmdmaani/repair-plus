'use client';
import { useOffers } from '@/hooks/admin/useOffers';
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
import { useState } from 'react';
import OfferForm from './OfferForm';
import { useAllBrands } from '@/hooks/admin/useBrands';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export default function BrandsPage() {
  const [addNew, setAddNew] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const { data } = useAllBrands({
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
      id: 'title',
      label: 'Title',
      renderCell: (row: any) => row.title,
    },
    {
      id: 'summery',
      label: 'Summery',
      renderCell: (row: any) => row.summery.slice(0, 50) + '...',
    },
    {
      id: 'content',
      label: 'Content',
      renderCell: (row: any) => row.content?.slice(0, 50) + '...',
    },
    {
      id: 'Is Active',
      label: 'Active',
      renderCell: (row: any) => (row.isActive ? 'Yes' : 'No'),
    },
    {
      id: 'is percent',
      label: 'Active',
      renderCell: (row: any) => (row.isPercent ? 'Yes' : 'No'),
    },

    {
      id: 'from',
      label: 'From',
      renderCell: (row: any) => format(new Date(row.from), 'yyyy-MM-dd hh:mm'),
    },

    {
      id: 'To',
      label: 'To',
      renderCell: (row: any) => format(new Date(row.to), 'yyyy-MM-dd hh:mm'),
    },
    {
      id: 'createdAt',
      label: 'Creation Date',
      renderCell: (row: any) => format(new Date(row.createdAt), 'yyyy-MM-dd'),
    },

    {
      id: 'operations',
      label: 'Operations',
      renderCell: (row: any) => (
        <Stack direction='row' spacing={2}>
          <Button
            onClick={() => {
              setCurrentOffer(row);
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
      <Typography variant='h4'>Offers List</Typography>
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
            setCurrentOffer(null);
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
          {currentOffer ? 'Edit Offer' : 'Add New Offer'}
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <OfferForm offer={currentOffer} onAdd={() => setAddNew(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
