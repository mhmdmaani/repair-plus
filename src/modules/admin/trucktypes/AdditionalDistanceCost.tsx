import {
  useAdditionalDistanceCosts,
  useCreateAdditionalDistance,
  useDeleteAdditionalDistanceCost,
} from '@/hooks/admin/useAdditionalDistanceCost';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { AdditionalDistanceCost } from 'prisma/prisma-client';
import { useState } from 'react';

export default function AdditionalDistanceCost({ id }: { id: string }) {
  const { data } = useAdditionalDistanceCosts(id);
  const onDeleteMutation = useDeleteAdditionalDistanceCost();
  const onAddMutation = useCreateAdditionalDistance();

  const [moreThan, setMoreThan] = useState<number>(0);
  const [cost, setCost] = useState(0);
  const onDelete = (id: string) => {
    onDeleteMutation.mutate(id);
  };

  const onAdd = () => {
    if (moreThan && cost) {
      onAddMutation.mutate({
        truckTypeId: id,
        moreThanDistance: moreThan,
        cost: cost,
      });
    }
  };
  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        Additional Distance Cost
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>More Than Distance(Km)</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={0}>
            <TableCell>
              <TextField
                label='More Than Distance(Km)'
                variant='outlined'
                fullWidth
                value={moreThan}
                onChange={(e) => setMoreThan(parseFloat(e.target.value))}
              />
            </TableCell>
            <TableCell>
              <TextField
                label='Cost'
                variant='outlined'
                fullWidth
                value={cost}
                onChange={(e) => setCost(parseFloat(e.target.value))}
              />
            </TableCell>
            <TableCell>
              <Button onClick={() => onAdd()}>Save</Button>
            </TableCell>
          </TableRow>
          {data?.map((price: AdditionalDistanceCost) => (
            <TableRow key={price.id}>
              <TableCell>{price?.moreThanDistance}</TableCell>
              <TableCell>{price?.cost}</TableCell>
              <TableCell>
                <Button onClick={() => onDelete(price.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
