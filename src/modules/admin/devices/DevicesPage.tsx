'use client';
import { useSortAndSearch } from '@/hooks/useSearchAndSort';
import EnhancedTable from '@/shared/table/EnhancedTable';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  TextField,
  Typography,
  styled,
  FormControlLabel,
  Switch,
  Container,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import DeviceForm from './DeviceForm';
import {
  useDeleteDevice,
  useSearchDevices,
  useUpdateDevice,
} from '@/hooks/admin/useDevices';
import SelectBrand from './SelectBrand';
import { Brand, Device } from 'prisma/prisma-client';
import { useRouter } from 'next/navigation';
import SelectCategory from './SelectCategory';
import SlideModal from '@/shared/modals/SlideModal';

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

export default function DevicesPage() {
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
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteMutation = useDeleteDevice();
  const updateMutation = useUpdateDevice();
  const { data } = useSearchDevices({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
    brandId:
      !selectedBrand || !selectedBrand?.id ? undefined : selectedBrand?.id,
    categoryId:
      !selectedCategory || !selectedCategory?.id
        ? undefined
        : selectedCategory?.id,
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
      id: 'brand',
      label: 'Brand',
      renderCell: (row: any) => <Typography>{row.brand?.name}</Typography>,
    },
    {
      id: 'category',
      label: 'Category',
      renderCell: (row: any) => <Typography>{row.category?.name}</Typography>,
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
              setCurrentDevice(row);
              setAddNew(true);
            }}
          >
            Edit
          </Button>

          <Button
            variant='contained'
            onClick={() => {
              router.push(`/admin/devices/${row.id}`);
            }}
          >
            View Repairs
          </Button>

          <Button
            color='warning'
            onClick={() => {
              setCurrentDevice(row);
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
      <Typography variant='h4'>Devices List</Typography>
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
            setCurrentDevice(null);
            setAddNew(true);
          }}
        >
          Add New
        </Button>
      </Stack>
      <Container>
        <SelectBrand
          selectedBrand={selectedBrand}
          onSelect={setSelectedBrand}
        />
      </Container>

      <Container>
        <SelectCategory
          brand={selectedBrand}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </Container>

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
          {currentDevice ? 'Edit Device' : 'Add New Device'}
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <DeviceForm device={currentDevice} onAdd={() => setAddNew(false)} />
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
                currentDevice && deleteMutation.mutate(currentDevice?.id);
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
