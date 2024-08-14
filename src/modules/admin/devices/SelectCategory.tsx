import { useAllBrands } from '@/hooks/admin/useBrands';
import {
  useAllCategories,
  useCategoriesByBrand,
} from '@/hooks/admin/useCategories';
import { Typography, styled } from '@mui/material';
import { Brand, Category } from 'prisma/prisma-client';
import React from 'react';

const Container = styled('div')`
  width: 100%;
  display: flex;
  gap: 20px;
  overflow-x: auto;
  margin-bottom: 20px;
`;

const Item = styled('div')<{
  selected: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) =>
    props.selected
      ? props.theme.palette.primary.main
      : props.theme.palette.background.paper};
  border-bottom: 2px solid
    ${(props) =>
      props.selected ? props.theme.palette.primary.main : 'transparent'};
`;

const ItemImage = styled('img')`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;
export default function SelectCategory({
  onSelect,
  selectedCategory,
  brand,
}: {
  onSelect: any;
  selectedCategory: any;
  brand: Brand | null;
}) {
  const { data: cats } = useCategoriesByBrand(brand?.id, true);
  return (
    <Container>
      <Item selected={selectedCategory === null} onClick={() => onSelect(null)}>
        <ItemImage src='https://via.placeholder.com/150' />
        <Typography textAlign={'center'} variant='body1' my={1}>
          All
        </Typography>
      </Item>
      {cats?.map((category: Category) => (
        <Item
          selected={selectedCategory?.id === category.id}
          onClick={() => onSelect(category)}
        >
          <ItemImage src={category.image || ''} />
          <Typography textAlign={'center'} variant='body1' my={1}>
            {category.name}
          </Typography>
        </Item>
      ))}
    </Container>
  );
}
