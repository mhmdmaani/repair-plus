import { useAllBrands } from '@/hooks/admin/useBrands';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import { Category } from 'prisma/prisma-client';
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

const CustomListItem = styled(ListItem)<{
  selected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  margin: 0;
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.selected
        ? props.theme.palette.primary.main
        : props.theme.palette.action.hover};
  }
`;
export default function SelectCategory({
  onSelect,
  selectedCategory,
  categories,
}: {
  onSelect: (category: Category | null) => void;
  selectedCategory: Category | null;
  categories: Category[];
}) {
  return (
    <List
      sx={{
        height: 'calc(100vh - 200px)',
        overflowY: 'auto',
      }}
    >
      <CustomListItem
        selected={selectedCategory === null}
        onClick={() => onSelect(null)}
      >
        <ListItemAvatar>
          <Avatar>A</Avatar>
        </ListItemAvatar>
        <ListItemText primary={`All`} />
      </CustomListItem>
      {categories?.map((category: Category) => (
        <CustomListItem
          key={category?.id}
          selected={selectedCategory?.id === category?.id}
          onClick={() => onSelect(category)}
        >
          <ListItemAvatar>
            <ItemImage src={category?.image || ''} />
          </ListItemAvatar>
          <ListItemText primary={category?.name} />
        </CustomListItem>
      ))}
    </List>
  );
}
