'use client';
import {
  useAllBrands,
  useCreateBrand,
  useUpdateBrand,
} from '@/hooks/admin/useBrands';
import { useAllCategories } from '@/hooks/admin/useCategories';
import { useCreateDevice, useUpdateDevice } from '@/hooks/admin/useDevices';
import {
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  styled,
} from '@mui/material';
import { addMonths } from 'date-fns';
import { Brand, Device } from 'prisma/prisma-client';
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
export default function OfferForm({
  device,
  onAdd,
}: {
  device?: Device | null;
  onAdd?: (a: any) => void;
}) {
  const { data: brands } = useAllBrands();
  const { data: categories } = useAllCategories();
  const updateMutation = useUpdateDevice();
  const createMutation = useCreateDevice();
  const [name, setName] = useState('');
  const [image, setLogo] = useState('');
  const [brand, setBrand] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleFileChange = (event: any) => {
    setLogo(event.target.files[0]);
  };

  useEffect(() => {
    if (device) {
      setName(device.name);
      setBrand(device.brandId);
      setIsActive(device.isActive);
    }
  }, [device]);

  const onSave = async () => {
    const data: any = {
      id: device?.id,
      name,
      image: image && image !== '' ? image : undefined,
      brandId: brand || '',
      isActive,
    };

    if (device?.id) {
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
        <Select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        >
          {brands.map((brand: Brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FeildContainer>

      <FeildContainer>
        <Select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        >
          {categories.map((category: Brand) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
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
