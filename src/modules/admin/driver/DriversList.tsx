'use client';
import { useDrivers } from '@/hooks/admin/useDriver';
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
import { useSortAndSearch } from '../../../hooks/useSearchAndSort';
import DriverForm from './DriverForm';
const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export default function DriversList() {
  const {
    sortBy,
    setSortBy,
    isASC,
    setIsASC,
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
  } = useSortAndSearch();
  const [addNew, setAddNew] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);

  const { data } = useDrivers({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
  });

  const columns = [
    {
      id: 'image',
      label: 'Image',
      renderCell: (row: any) => (
        <img
          src={row.image}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      ),
    },
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
      id: 'phone',
      label: 'Phone',
      renderCell: (row: any) => row.phone,
    },
    {
      id: 'email',
      label: 'Email',
      renderCell: (row: any) => row.email,
    },
    {
      id: 'active',
      label: 'Active',
      renderCell: (row: any) => (row.active ? 'Yes' : 'No'),
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
          <Link href={`/admin/orders/${row.id}`}>
            <Button variant='contained' color='primary'>
              Details
            </Button>
          </Link>
          <Button
            onClick={() => {
              setCurrentDriver(row);
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
      <Typography variant='h4'>Drivers List</Typography>
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
            setCurrentDriver(null);
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
          {currentDriver ? 'Edit Driver' : 'Add New Driver'}
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <DriverForm driver={currentDriver} />
        </DialogContent>
      </Dialog>
    </>
  );
}
