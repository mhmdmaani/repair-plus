'use client';
import { useSortAndSearch } from '@/hooks/useSearchAndSort';
import EnhancedTable from '@/shared/table/EnhancedTable';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  styled,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import CategoryForm from './CategoryForm';
import {
  useDeleteCategory,
  useSearchCategories,
  useUpdateCategory,
} from '@/hooks/admin/useCategories';
import SlideModal from '@/shared/modals/SlideModal';
import { Category } from 'prisma/prisma-client';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px', // Adjust this value as needed
  },
}));

export default function CategoriesPage() {
  const [addNew, setAddNew] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const deleteMutation = useDeleteCategory();
  const updateMutation = useUpdateCategory();
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

  const { data } = useSearchCategories({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
    isAdmin: true,
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
      id: 'image',
      label: 'Image',
      renderCell: (row: any) => (
        <img
          src={row.image}
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
              setCurrentCategory(row);
              setAddNew(true);
            }}
          >
            Edit
          </Button>

          <Button
            color='error'
            onClick={() => {
              currentCategory && deleteMutation.mutate(currentCategory?.id);
              setDeleteDialog(false);
            }}
            disabled={deleteMutation.status === 'pending'}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Typography variant='h4'>Categories List</Typography>
      <Stack
        direction='row'
        justifyContent={'space-between'}
        spacing={2}
        padding={2}
      >
        <SearchContainer>
          <CustomTextField
            value={search}
            label={'Search'}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
        <Button
          onClick={() => {
            setCurrentCategory(null);
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
          {currentCategory
            ? `Edit Category(${currentCategory?.name})`
            : `Add New Category`}
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <CategoryForm
            category={currentCategory}
            onAdd={() => setAddNew(false)}
            parentCategory={null}
          />
        </DialogContent>
      </Dialog>

      <SlideModal
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title='Delete Brand'
      >
        <div className='text-lg p-2'>
          <Typography variant='body2'>
            Are you sure you want to delete this Category(All Devices and
            Repairs in this Category will be removed )?
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
                currentCategory && deleteMutation.mutate(currentCategory?.id);
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
