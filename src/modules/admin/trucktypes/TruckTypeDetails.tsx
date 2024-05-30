'use client';
import { days } from '@/api/settings';
import { useDeletePriceList, usePriceList } from '@/hooks/admin/usePricelist';
import { useTruckType } from '@/hooks/admin/useTruckTypes';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { PriceList } from 'prisma/prisma-client';
import { useState } from 'react';
import AdditionalDistanceCost from './AdditionalDistanceCost';
import PriceListForm from './PriceListForm';
import TruckTypeForm from './TruckTypeForm';
const ImageContainer = styled('div')`
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CustomCard = styled(Card)`
  padding: 15px;
`;

const CustomContainer = styled('div')`
  background-color: ${(props) => props.theme.palette.grey[200]};
`;

export default function TruckTypeDetails({ id }: { id: string }) {
  const { data: truckType, isLoading } = useTruckType(id);
  const { data: priceList, refetch } = usePriceList(id);
  const deleteMutation = useDeletePriceList(id);
  const [openPriceList, setOpenPriceList] = useState(false);

  const onDeletePriceList = (priceId: string) => {
    deleteMutation.mutate(
      { id: priceId },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <CustomContainer>
      <Container>
        <Grid container spacing={3}>
          <Grid item xl={6} lg={6} md={6} sm={12}>
            <CustomCard>
              <ImageContainer>
                <img src={truckType?.image} alt='truck type' />
              </ImageContainer>
              <TruckTypeForm truckType={truckType} />
            </CustomCard>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12}>
            <CustomCard>
              <Stack justifyContent={'space-between'} direction={'row'}>
                <Typography variant='h5'>{`${truckType?.name} Price list`}</Typography>
                <Button
                  onClick={() => setOpenPriceList(true)}
                  variant='contained'
                  color='primary'
                >
                  Add Price
                </Button>
              </Stack>
              <Box marginY={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>day</TableCell>
                      <TableCell>From Time</TableCell>
                      <TableCell>To Time</TableCell>
                      <TableCell>Price Per Minute</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {priceList?.map((price: PriceList) => (
                      <TableRow key={price.id}>
                        <TableCell>{days[parseInt(price?.day)]}</TableCell>
                        <TableCell>{price?.fromTime}</TableCell>
                        <TableCell>{price?.toTime}</TableCell>
                        <TableCell>{price?.price}</TableCell>
                        <TableCell>
                          <Button onClick={() => onDeletePriceList(price.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CustomCard>
            <CustomCard
              sx={{
                marginTop: 2,
              }}
            >
              <Box>
                <AdditionalDistanceCost id={id} />
              </Box>
            </CustomCard>
          </Grid>
        </Grid>
        <PriceListForm
          open={openPriceList}
          onClose={() => setOpenPriceList(false)}
          truckTypeId={id}
        />
      </Container>
    </CustomContainer>
  );
}
