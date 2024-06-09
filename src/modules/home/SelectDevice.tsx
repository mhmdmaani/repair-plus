'use client';
import { useAllBrands } from '@/hooks/admin/useBrands';
import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component='div' disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function SelectDevice() {
  const { data, isLoading } = useAllBrands();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Box
          sx={{
            width: '100%',
            height: 400,
            maxWidth: 360,
            bgcolor: 'background.paper',
          }}
        >
          <FixedSizeList
            height={400}
            width={360}
            itemSize={46}
            itemCount={200}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        Devices
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        Repairs
      </Grid>
    </Grid>
  );
}
