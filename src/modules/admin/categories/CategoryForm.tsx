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
  MenuItem,
  Select,
} from '@mui/material';
import { addMonths } from 'date-fns';
import { Brand, Category } from 'prisma/prisma-client';
import { useEffect, useState } from 'react';
import { useAllBrands } from '@/hooks/admin/useBrands';

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
  categories,
  parentCategory,
}: {
  category?: Category | null;
  onAdd?: (a: any) => void;
  categories: Category[];
  parentCategory: Category | null;
}) {
  const updateMutation = useUpdateCategory();
  const createMutation = useCreateCategory();

  const { data: brands } = useAllBrands();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [order, setorder] = useState('0');
  const [brand, setBrand] = useState('');
  const [parentId, setParentId] = useState<String | null>(null);

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (category) {
      setName(category.name);
      setIsFeatured(category.isFeatured);
      setIsActive(category.isActive);
      setorder(category.order.toString());
      setBrand(category.brandId);
      setParentId(category.parentId);
    }
  }, [category]);

  useEffect(() => {
    if (parentCategory) {
      setParentId(parentCategory.id);
    }
  }, [parentCategory]);

  const onSave = async () => {
    let saved = null;
    const data: any = {
      id: category?.id || '',
      name,
      image: image && image !== '' ? image : undefined,
      isFeatured,
      isActive,
      order: parseInt(order),
      brandId: brand,
      parentId,
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
          value={parentId}
          onChange={(e) => {
            setParentId(e.target.value);
          }}
        >
          {categories?.map((cat: Category) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
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
