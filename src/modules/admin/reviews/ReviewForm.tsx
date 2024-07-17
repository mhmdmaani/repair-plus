'use client';
import { useCreateBrand, useUpdateBrand } from '@/hooks/admin/useBrands';
import { useCreateReview, useUpdateReview } from '@/hooks/admin/useReviews';
import {
  Button,
  FormControlLabel,
  Switch,
  TextField,
  styled,
} from '@mui/material';
import { addMonths, set } from 'date-fns';
import { Brand, Review } from 'prisma/prisma-client';
import { useEffect, useState } from 'react';

const FormContainer = styled('div')`
  border: 2px solid #efebe9;
  padding: 10px;
  border-radius: 16px;
  @media (max-width: 1000px) {
    border: none;
  }
`;

const FeildContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  @media (max-width: 1000px) {
    gap: 5px;
  }
`;
export default function ReviewForm({
  review,
  onAdd,
}: {
  review?: Review | null;
  onAdd?: (a: any) => void;
}) {
  const updateMutation = useUpdateReview();
  const createMutation = useCreateReview();
  const [author_name, setAuthorName] = useState('');
  const [author_image, setAuthorImage] = useState('');
  const [author_email, setAuthorEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleFileChange = (event: any) => {
    setAuthorImage(event.target.files[0]);
  };

  useEffect(() => {
    if (review) {
      setAuthorName(review.author_name);
      setAuthorImage(review.author_image);
      setAuthorEmail(review.author_email);
      setRating(review.rating);
      setText(review.text);
      setIsActive(review.isActive);
    }
  }, [review]);

  const onSave = async () => {
    let saved = null;
    const data: any = {
      id: review?.id || '',
      author_name,
      author_email,
      author_image:
        author_image && author_image !== '' ? author_image : undefined,
      rating,
      isActive,
    };

    if (review?.id) {
      const saved = await updateMutation.mutate(data);
      // refetch trcuks
      //  refetch();
      onAdd && onAdd(data);
    } else {
      // create
      const saved = await createMutation.mutate(data, {
        onSuccess: (data) => {
          onAdd && onAdd(data);
        },
      });
    }
  };

  return (
    <FormContainer>
      <FeildContainer>
        <TextField
          label='Name'
          value={author_name}
          onChange={(e) => setAuthorName(e.target.value)}
        />
      </FeildContainer>

      <FeildContainer>
        <TextField
          label='Author Email'
          value={author_email}
          onChange={(e) => setAuthorEmail(e.target.value)}
        />
      </FeildContainer>

      <FeildContainer>
        <TextField
          label='Rating'
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          type='number'
        />
      </FeildContainer>

      <FeildContainer>
        <TextField
          label='Text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </FeildContainer>

      <FeildContainer>
        <input type='file' onChange={handleFileChange} />
      </FeildContainer>
      <FeildContainer>
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label='Is Active'
        />
      </FeildContainer>
      <FeildContainer>
        <Button variant='contained' onClick={onSave}>
          Submit
        </Button>
      </FeildContainer>
    </FormContainer>
  );
}
