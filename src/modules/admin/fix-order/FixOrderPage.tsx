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
import SlideModal from '@/shared/modals/SlideModal';
import { Brand } from 'prisma/prisma-client';
import {
  useDeleteFixOrder,
  useSearchFixOrders,
  useUpdateFixOrder,
} from '@/hooks/admin/useFixOrders';
import { useRouter } from 'next/navigation';

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

export default function FixOrderPage() {
  const [addNew, setAddNew] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const deleteMutation = useDeleteFixOrder();
  const updateMutation = useUpdateFixOrder();
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
  const [currentFix, setCurrentFix] = useState<Brand | null>(null);

  const router = useRouter();
  const { data } = useSearchFixOrders({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
  });

  const columns = [
    {
      id: 'reference',
      label: 'Reference',
      renderCell: (row: any) => row.reference,
    },
    {
      id: 'user',
      label: 'Customer Name',
      renderCell: (row: any) => row.user.name,
    },

    {
      id: 'userTel',
      label: 'Customer tel',
      renderCell: (row: any) => row.user.tel,
    },
    {
      id: 'userEmail',
      label: 'Customer Email',
      renderCell: (row: any) => row.user.email,
    },
    {
      id: 'status',
      label: 'Status',
      renderCell: (row: any) => row.status,
    },
    {
      id: 'userNote',
      label: 'User Note',
      renderCell: (row: any) => row.userNote,
    },
    {
      id: 'maintenanceNote',
      label: 'Mainenance Note',
      renderCell: (row: any) => row.maintenanceNote,
    },
    {
      id: 'expectedDateToFix',
      label: 'Expected Date To Fix',
      renderCell: (row: any) =>
        format(new Date(row.expectedDateToFix), 'dd/MM/yyyy'),
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
              router.push(`/admin/fix-order/${row.id}`);
            }}
          >
            Edit
          </Button>

          <Button
            color='error'
            onClick={() => {
              setCurrentFix(row);
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
      <Typography variant='h4'>Orders List</Typography>
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
            router.push('/admin/fix-order/create');
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
      <SlideModal
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title='Delete Brand'
      >
        <div className='text-lg p-2'>
          <Typography variant='body2'>
            Are you sure you want to delete this order?
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
                currentFix && deleteMutation.mutate(currentFix?.id);
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
