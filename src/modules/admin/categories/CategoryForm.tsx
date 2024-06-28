'use client';
import {
  useCreateCategory,
  useUpdateCategory,
} from '@/hooks/admin/useCategories';
import {
  Button,
  FormControlLabel,
  Switch,
  TextField,
  styled,
} from '@mui/material';
import { addMonths } from 'date-fns';
import { Brand, Category } from 'prisma/prisma-client';
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
export default function CategoryForm({
  category,
  onAdd,
}: {
  category?: Category | null;
  onAdd?: (a: any) => void;
}) {
  const updateMutation = useUpdateCategory();
  const createMutation = useCreateCategory();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (category) {
      setName(category.name);
      setIsFeatured(category.isFeatured);
    }
  }, [category]);

  const onSave = async () => {
    let saved = null;
    const data: any = {
      id: category?.id || '',
      name,
      image: image && image !== '' ? image : undefined,
      isFeatured,
    };

    if (category?.id) {
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <input type='file' onChange={handleFileChange} />
      </FeildContainer>
      <FeildContainer>
        <FormControlLabel
          control={
            <Switch
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
          }
          label='Is Featured'
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
