import { useAllBrands } from '@/hooks/admin/useBrands';
import { Typography, styled } from '@mui/material';
import { Brand } from 'prisma/prisma-client';
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
export default function SelectBrand({
  onSelect,
  selectedBrand,
}: {
  onSelect: any;
  selectedBrand: any;
}) {
  const { data: brands } = useAllBrands();
  return (
    <Container>
      <Item selected={selectedBrand === null} onClick={() => onSelect(null)}>
        <ItemImage src='https://via.placeholder.com/150' />
        <Typography textAlign={'center'} variant='body1' my={1}>
          All
        </Typography>
      </Item>
      {brands?.map((brand: Brand) => (
        <Item
          selected={selectedBrand?.id === brand.id}
          onClick={() => onSelect(brand)}
        >
          <ItemImage src={brand?.logo || 'https://via.placeholder.com/150'} />
          <Typography textAlign={'center'} variant='body1' my={1}>
            {brand.name}
          </Typography>
        </Item>
      ))}
    </Container>
  );
}
