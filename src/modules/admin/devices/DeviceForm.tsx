'use client';
import {
  useAllBrands,
  useCreateBrand,
  useUpdateBrand,
} from '@/hooks/admin/useBrands';
import {
  useAllCategories,
  useCategoriesByBrand,
} from '@/hooks/admin/useCategories';
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
import { addMonths, set } from 'date-fns';
import { Brand, Category, Device } from 'prisma/prisma-client';
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
  currentCategory,
}: {
  device?: Device | null;
  onAdd?: (a: any) => void;
  currentCategory?: Category | null;
}) {
  const [name, setName] = useState('');
  const [image, setLogo] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [order, setOrder] = useState('0');
  const [modelNumber, setModelNumber] = useState('');
  const { data: brands } = useAllBrands();
  const { data: categories } = useCategoriesByBrand(brand, true);
  const updateMutation = useUpdateDevice();
  const createMutation = useCreateDevice();

  const handleFileChange = (event: any) => {
    setLogo(event.target.files[0]);
  };

  useEffect(() => {
    if (device) {
      setName(device.name);
      setBrand(device.brandId);
      setCategory(device.categoryId);
      setIsActive(device.isActive);
      setOrder(device.order.toString());
      setModelNumber(device?.modelNumber || '');
    }
  }, [device]);

  useEffect(() => {
    if (currentCategory) {
      setCategory(currentCategory.id);
      setBrand(currentCategory.brandId);
    }
  }, [currentCategory]);

  const onSave = async () => {
    const data: any = {
      id: device?.id,
      name,
      image: image && image !== '' ? image : undefined,
      brandId: brand || '',
      categoryId: category || '',
      isActive,
      order: parseInt(order),
      modelNumber,
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
        <TextField
          label='Model Number'
          value={modelNumber}
          onChange={(e) => setModelNumber(e.target.value)}
        />
      </FeildContainer>

      <FeildContainer>
        <TextField
          label='Order'
          inputProps={{ inputMode: 'numeric' }}
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
      </FeildContainer>

      <FeildContainer>
        <Select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        >
          {brands?.map((brand: Brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FeildContainer>

      <FeildContainer>
        <Select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories?.map((category: Category) => (
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
