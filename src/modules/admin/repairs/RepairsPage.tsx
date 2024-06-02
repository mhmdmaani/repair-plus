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
import RepairForm from './RepairForm';
import { useAllBrands, useSearchBrands } from '@/hooks/admin/useBrands';
import { useSearchDevices } from '@/hooks/admin/useDevices';
import { Brand } from 'prisma/prisma-client';
import { useRouter } from 'next/navigation';
import { useSearchRepairs } from '@/hooks/admin/useRepairs';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export default function RepairsPage({ deviceId }: { deviceId: string }) {
  const [addNew, setAddNew] = useState(false);
  const router = useRouter();
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
  const [currentRepair, setCurrentRepair] = useState(null);
  const { data } = useSearchRepairs({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
    deviceId,
  });

  const columns = [
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
      id: 'buyPrice',
      label: 'Buy Price(From Source)',
      renderCell: (row: any) => row.buyPrice,
    },

    {
      id: 'sellPrice',
      label: 'Sell Price(For Customers)',
      renderCell: (row: any) => row.sellPrice,
    },

    {
      id: 'repairingPrice',
      label: 'Repair Price',
      renderCell: (row: any) => row.sellPrice,
    },
    {
      id: 'repairingTimeMinutes',
      label: 'Repair Time(Minutes)',
      renderCell: (row: any) => row.repairingTimeMinutes,
    },

    {
      id: 'createdAt',
      label: 'Created At',
      renderCell: (row: any) => format(new Date(row.createdAt), 'dd/MM/yyyy'),
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
          <TextField
            value={search}
            label={'Search'}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>

        <Button
          onClick={() => {
            setCurrentRepair(null);
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
          <RepairForm device={currentRepair} onAdd={() => setAddNew(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
