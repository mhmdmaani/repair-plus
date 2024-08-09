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
  Grid,
  Card,
  Avatar,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import RepairForm from './../repairs/RepairForm';
import {
  useDeleteDevice,
  useSearchDevices,
  useUpdateDevice,
} from '@/hooks/admin/useDevices';
import SelectBrand from './SelectBrand';
import { Brand, Category, Device, Repair } from 'prisma/prisma-client';
import { useRouter } from 'next/navigation';
import SelectCategory from './SelectCategory';
import SlideModal from '@/shared/modals/SlideModal';
import {
  useDeleteRepair,
  useSearchAll,
  useSearchRepairs,
  useUpdateRepair,
} from '@/hooks/admin/useRepairs';
import SelectDevice from './SelectDevice';

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

export default function AllRepairsPage() {
  const [addNew, setAddNew] = useState(false);
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
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
  const [currentRepair, setCurrentRepair] = useState<Repair | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteMutation = useDeleteRepair();
  const updateMutation = useUpdateRepair();
  const { data } = useSearchAll({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
    deviceId:
      !selectedDevice || !selectedDevice?.id ? undefined : selectedDevice?.id,
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
        <>
          {row.image ? (
            <img
              src={row.image}
              alt={row.name}
              style={{ width: 50, height: 50, objectFit: 'contain' }}
            />
          ) : (
            <Avatar>{row.name.charAt(0).toUpperCase()}</Avatar>
          )}
        </>
      ),
    },
    {
      id: 'device',
      label: 'Device',
      renderCell: (row: any) => <Typography>{row.device?.name}</Typography>,
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
              setCurrentRepair(row);
              setAddNew(true);
            }}
          >
            Edit
          </Button>
          <Button
            color='warning'
            onClick={() => {
              setCurrentRepair(row);
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
      <Typography variant='h4'>Repairs List</Typography>
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
        {selectedDevice?.id && (
          <Button
            onClick={() => {
              setCurrentRepair(null);
              setAddNew(true);
            }}
          >
            Add New Repair
          </Button>
        )}
      </Stack>
      <Container
        style={{
          marginBottom: 20,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <SelectBrand
                selectedBrand={selectedBrand}
                onSelect={setSelectedBrand}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <SelectCategory
                brand={selectedBrand}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <SelectDevice
                brand={selectedBrand}
                category={selectedCategory}
                selectedDevice={selectedDevice}
                onSelect={setSelectedDevice}
              />
            </Card>
          </Grid>
        </Grid>
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
          {currentRepair ? 'Edit Device' : 'Add New Device'}
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <RepairForm
            deviceId={selectedDevice?.id}
            currentRepair={currentRepair}
            onAdd={() => setAddNew(false)}
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
            Are you sure you want to delete this brand(All Repairs and Repairs
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
                currentRepair && deleteMutation.mutate(currentRepair?.id);
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
