'use client';
import { useAllTruckTypes } from '@/hooks/admin/useTruckTypes';
import VanItem from '@/modules/CreateQuote/VanItem';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { TruckType as TruckTypeType } from 'prisma/prisma-client';
import { useState } from 'react';
import TruckTypeForm from './TruckTypeForm';

function TruckTypesPage() {
  const { data: allTruckTypes } = useAllTruckTypes();

  const [addNew, setAddNew] = useState(false);
  return (
    <Box>
      <Stack direction='row' spacing={2} padding={2}>
        <Typography variant='h5'>Truck Types</Typography>
        <Button onClick={() => setAddNew(true)}>Add New</Button>
      </Stack>
      <Grid container>
        {allTruckTypes?.map((truckType: TruckTypeType) => (
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            xl={4}
            key={truckType.id}
            padding={2}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
              href={`/admin/trucktypes/${truckType.id}`}
            >
              {/* @ts-ignore */}
              <Card>
                <VanItem
                  maxLoad={truckType.maxWeight}
                  price={truckType.standardPricePerMin.toString()}
                  {...truckType}
                  style={{
                    border: 'none',
                  }}
                />
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Dialog
        sx={{
          width: '100%',
        }}
        open={addNew}
        onClose={() => setAddNew(false)}
      >
        <DialogTitle>Add New Truck Type</DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <TruckTypeForm truckType={null} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default TruckTypesPage;
