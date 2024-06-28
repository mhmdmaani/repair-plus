'use client';
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
import { useSubscriptions } from '@/hooks/useSubscription';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export default function SubscriptionsPage() {
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

  const { data } = useSubscriptions({
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
      id: 'email',
      label: 'Email',
      renderCell: (row: any) => row.email,
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
          <a href={`mailto:${row.email}`}>
            <Button variant='contained' color='primary'>
              Send Email
            </Button>
          </a>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Typography variant='h4'>Subscriptions List</Typography>
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
    </>
  );
}
