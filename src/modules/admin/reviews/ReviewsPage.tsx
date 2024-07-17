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
import { useState } from 'react';

import SlideModal from '@/shared/modals/SlideModal';
import { Review } from 'prisma/prisma-client';
import {
  useDeleteReview,
  useSearchReviews,
  useUpdateReview,
} from '@/hooks/admin/useReviews';
import ReviewForm from './ReviewForm';
import ImportReviews from './ImportReviews';

const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export default function ReviewsPage() {
  const [addNew, setAddNew] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

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
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [displayImportReviews, setDisplayImportReviews] = useState(false);

  const { data } = useSearchReviews({
    searchKey: search,
    page,
    perPage,
    sortBy,
    isAsc: isASC,
    isAdmin: true,
  });

  const updateMutation = useUpdateReview();
  const deleteMutation = useDeleteReview();

  const columns = [
    {
      id: 'referenceId',
      label: 'Ref Id',
      renderCell: (row: any) => row.referenceId,
    },
    {
      id: 'author_image',
      label: 'Author Image',
      renderCell: (row: any) => (
        <img
          src={row.author_image}
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
              setCurrentReview(row);
              setAddNew(true);
            }}
          >
            Edit
          </Button>

          <Button
            color='error'
            onClick={() => {
              setCurrentReview(row);
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
      <Typography variant='h4'>Reviews List</Typography>
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
            setDisplayImportReviews(true);
          }}
        >
          Import Reviews From Google maps
        </Button>

        <Button
          onClick={() => {
            setCurrentReview(null);
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
          {currentReview ? 'Edit Review' : 'Add New Review'}
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <ReviewForm review={currentReview} />
        </DialogContent>
      </Dialog>

      <Dialog
        sx={{
          width: '100%',
        }}
        open={displayImportReviews}
        onClose={() => setDisplayImportReviews(false)}
      >
        <DialogTitle>Import Reviews</DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <ImportReviews setOpen={setDisplayImportReviews} />
        </DialogContent>
      </Dialog>

      <SlideModal
        open={deleteDialog}
        setOpen={setDeleteDialog}
        title='Delete Review'
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
                currentReview && deleteMutation.mutate(currentReview?.id);
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
