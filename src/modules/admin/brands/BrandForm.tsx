'use client';
import { useCreateBrand, useUpdateBrand } from '@/hooks/admin/useBrands';
import {
  Button,
  FormControlLabel,
  Switch,
  TextField,
  styled,
} from '@mui/material';
import { addMonths, set } from 'date-fns';
import { Brand } from 'prisma/prisma-client';
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
export default function BrandForm({
  brand,
  onAdd,
}: {
  brand?: Brand | null;
  onAdd?: (a: any) => void;
}) {
  const updateMutation = useUpdateBrand();
  const createMutation = useCreateBrand();
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [order, setorder] = useState('0');

  const handleFileChange = (event: any) => {
    setLogo(event.target.files[0]);
  };

  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setIsFeatured(brand.isFeatured);
      setorder(brand.order.toString());
      setIsActive(brand.isActive);
    }
  }, [brand]);

  const onSave = async () => {
    let saved = null;
    const data: any = {
      id: brand?.id || '',
      name,
      logo: logo && logo !== '' ? logo : undefined,
      isFeatured,
      isActive,
      order: parseInt(order),
    };

    if (brand?.id) {
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
        <TextField
          label='Order'
          value={order}
          onChange={(e) => setorder(e.target.value)}
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
