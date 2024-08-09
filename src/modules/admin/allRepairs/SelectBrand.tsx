import { useAllBrands } from '@/hooks/admin/useBrands';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { Brand } from 'prisma/prisma-client';
import React from 'react';

export default function SelectBrand({
  onSelect,
  selectedBrand,
}: {
  onSelect: any;
  selectedBrand: any;
}) {
  const { data: brands } = useAllBrands();

  return (
    <List
      sx={{ maxHeight: 300, overflowY: 'auto', width: '100%', marginBottom: 2 }}
    >
      <ListItem
        button
        selected={selectedBrand === null}
        onClick={() => onSelect(null)}
      >
        <ListItemAvatar>
          <Avatar src='https://via.placeholder.com/150' alt='All' />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant='body1'>All</Typography>} />
      </ListItem>

      {brands?.map((brand: Brand) => (
        <ListItem
          key={brand.id}
          button
          selected={selectedBrand?.id === brand.id}
          onClick={() => onSelect(brand)}
        >
          <ListItemAvatar>
            {brand?.logo ? (
              <img
                style={{
                  width: 40,
                }}
                src={brand?.logo}
                alt={brand.name}
              />
            ) : (
              <Avatar>{brand.name.charAt(0).toUpperCase()}</Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant='body1'>{brand.name}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
}
