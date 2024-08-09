import {
  useAllCategories,
  useCategoriesByBrand,
} from '@/hooks/admin/useCategories';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { Brand, Category } from 'prisma/prisma-client';
import React from 'react';

export default function SelectCategory({
  onSelect,
  selectedCategory,
  brand,
}: {
  onSelect: any;
  selectedCategory: any;
  brand: Brand | null;
}) {
  const { data: cats } = useCategoriesByBrand(brand?.id);

  return (
    <List
      sx={{ maxHeight: 300, overflowY: 'auto', width: '100%', marginBottom: 2 }}
    >
      <ListItem
        button
        selected={selectedCategory === null}
        onClick={() => onSelect(null)}
      >
        <ListItemAvatar>
          <Avatar src='https://via.placeholder.com/150' alt='All' />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant='body1'>All</Typography>} />
      </ListItem>

      {cats?.map((category: Category) => (
        <ListItem
          key={category.id}
          button
          selected={selectedCategory?.id === category.id}
          onClick={() => onSelect(category)}
        >
          <ListItemAvatar
            sx={{
              borderRadius: 0,
            }}
          >
            {category?.image ? (
              <img
                style={{
                  width: 40,
                }}
                src={category?.image}
                alt={category.name}
              />
            ) : (
              <Avatar>{category.name.charAt(0).toUpperCase()}</Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant='body1'>{category.name}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
}
