'use client';
import { useOrders } from '@/hooks/admin/useOrders';
import EnhancedTable from '@/shared/table/EnhancedTable';
import { Button, Stack, TextField, Typography, styled } from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';
import { useSortAndSearch } from './../../hooks/useSearchAndSort';
const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const columns = [
  {
    id: 'TruckType',
    label: 'Truck Type',
    renderCell: (row: any) => row.truckType.name,
  },
  {
    id: 'name',
    label: 'Collection Name',
    renderCell: (row: any) => row.collection.name,
  },
  {
    id: 'From',
    label: 'Collection Address',
    renderCell: (row: any) => row.collection.address,
  },
  {
    id: 'To',
    label: 'To',
    renderCell: (row: any) => row.delivery.address,
  },
  {
    id: 'paymentMethod',
    label: 'Payment Method',
    renderCell: (row: any) => row.paymentMethod,
  },
  {
    id: 'paymentStatus',
    label: 'Payment Status',
    renderCell: (row: any) => row.paymentStatus,
  },
  {
    id: 'createdAt',
    label: 'Creation Date',
    renderCell: (row: any) => format(new Date(row.createdAt), 'dd-MM-yyyy'),
  },

  {
    id: 'collection.date',
    label: 'Collection Date',
    renderCell: (row: any) => (row: any) =>
      format(new Date(row.createdAt), 'dd-MM-yyyy'),
  },
  {
    id: 'status',
    label: 'Status',
    renderCell: (row: any) => row.status,
  },
  {
    id: 'price',
    label: 'Price',
    renderCell: (row: any) => row.price,
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
      </Stack>
    ),
  },
];

export default function OrdersPage() {
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
  const { data, isLoading } = useOrders({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
  });

  return (
    <>
      <Typography variant='h4'>Orders</Typography>
      <SearchContainer>
        <TextField
          value={search}
          label={'Search'}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchContainer>

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
