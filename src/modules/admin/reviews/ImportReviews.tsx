import {
  useCreateManyReview,
  useImportReviews,
} from '@/hooks/admin/useReviews';
import {
  Avatar,
  Button,
  Checkbox,
  Rating,
  Typography,
  styled,
} from '@mui/material';
import React from 'react';

const List = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled('li')``;

const LeftSection = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ContentSection = styled('div')`
  width: 100%;
`;
export default function ImportReviews({ setOpen }: { setOpen: any }) {
  const { data } = useImportReviews();
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);
  const createManyMutation = useCreateManyReview();

  const handleClick = () => {
    createManyMutation.mutate(selectedItems);
    setOpen(false);
  };

  return (
    <List>
      {data?.map((review: any) => (
        <ListItem key={review.author_name}>
          <LeftSection>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedItems([...selectedItems, review]);
                } else {
                  setSelectedItems(
                    selectedItems.filter(
                      (r: any) => r.author_name !== review.author_name
                    )
                  );
                }
              }}
              checked={selectedItems.some(
                (r: any) => r.author_name === review.author_name
              )}
              value={review.author_name}
            />

            <Avatar src={review.profile_photo_url} />
            <Typography>{review.author_name}</Typography>
          </LeftSection>
          <ContentSection>
            <Typography ml={3}>{review.text}</Typography>
            <div style={{ marginLeft: 10 }}>
              <Rating name='read-only' value={review.rating} readOnly />
            </div>
          </ContentSection>
        </ListItem>
      ))}
      <Button onClick={handleClick} className='w-full'>
        Import
      </Button>
    </List>
  );
}
