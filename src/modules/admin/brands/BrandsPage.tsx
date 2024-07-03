'use client';
import { useSortAndSearch } from '@/hooks/useSearchAndSort';
import EnhancedTable from '@/shared/table/EnhancedTable';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Link,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import BrandForm from './BrandForm';
import {
  useAllBrands,
  useDeleteBrand,
  useSearchBrands,
  useUpdateBrand,
} from '@/hooks/admin/useBrands';
import SlideModal from '@/shared/modals/SlideModal';
import { Brand } from 'prisma/prisma-client';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export default function BrandsPage() {
  const [addNew, setAddNew] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteMutation = useDeleteBrand();
  const updateMutation = useUpdateBrand();
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
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);

  const { data } = useSearchBrands({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
  });

  const columns = [
    {
      id: 'order',
      label: 'Order',
      renderCell: (row: any) => row.order,
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
      id: 'isActive',
      label: 'Is Active',
      renderCell: (row: any) => (
        <FormControlLabel
          control={
            <Switch
              checked={row.isActive}
              onChange={() => {
                updateMutation.mutate({
                  id: row.id,
                  isActive: !row.isActive,
                });
              }}
            />
          }
          label={row.isActive ? 'Yes' : 'No'}
        />
      ),
    },
    {
      id: 'isFeatured',
      label: 'Is Featured',
      renderCell: (row: any) => (
        <FormControlLabel
          control={
            <Switch
              checked={row.isFeatured}
              onChange={() => {
                updateMutation.mutate({
                  id: row.id,
                  isFeatured: !row.isFeatured,
                });
              }}
            />
          }
          label={row.isFeatured ? 'Yes' : 'No'}
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

          <Button
            color='error'
            onClick={() => {
              setCurrentBrand(row);
              setDeleteDialog(true);
            }}
          >
            Delete
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
          {currentBrand ? 'Edit Brand' : 'Add New Brand'}
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

      <SlideModal
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title='Delete Brand'
      >
        <div className='text-lg p-2'>
          <Typography variant='body2'>
            Are you sure you want to delete this brand(All Devices and Repairs
            in this brand will be removed )?
          </Typography>

          <Stack direction='row' spacing={2}>
            <Button
              onClick={() => {
                setDeleteDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color='error'
              onClick={() => {
                currentBrand && deleteMutation.mutate(currentBrand?.id);
                setDeleteDialog(false);
              }}
              disabled={deleteMutation.status === 'pending'}
            >
              Delete
            </Button>
          </Stack>
        </div>
      </SlideModal>
    </>
  );
}
