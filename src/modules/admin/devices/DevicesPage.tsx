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
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import DeviceForm from './DeviceForm';
import { useSearchDevices } from '@/hooks/admin/useDevices';
import SelectBrand from './SelectBrand';
import { Brand } from 'prisma/prisma-client';
import { useRouter } from 'next/navigation';
import SelectCategory from './SelectCategory';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

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
  const [currentDevice, setCurrentDevice] = useState(null);
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
          <TextField
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
      <div style={{ width: '95vw' }}>
        <SelectBrand
          selectedBrand={selectedBrand}
          onSelect={setSelectedBrand}
        />
      </div>

      <div style={{ width: '95vw' }}>
        <SelectCategory
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

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
    </>
  );
}
