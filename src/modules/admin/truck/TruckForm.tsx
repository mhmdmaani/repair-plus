'use client';
import { useCreateTruck, useUpdateTruck } from '@/hooks/admin/useTruck';
import { useAllTruckTypes } from '@/hooks/admin/useTruckTypes';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Switch,
  TextField,
  styled,
} from '@mui/material';
import { Truck } from 'prisma/prisma-client';
import { useEffect, useState } from 'react';

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
export default function TruckForm({
  truck,
  onAdd,
  truckTypeId,
}: {
  truck?: Truck | null;
  onAdd?: (a: any) => void;
  truckTypeId?: string;
}) {
  const updateMutation = useUpdateTruck(truck?.id || '');
  const { data: allTruckTypes } = useAllTruckTypes();
  const createMutation = useCreateTruck();
  const [plate, setPlate] = useState('');
  const [active, setActive] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>('');
  useEffect(() => {
    if (truck) {
      setPlate(truck.plate);
      setActive(truck.active);
      setSelectedType(truck.truckTypeId);
    }
  }, [truck]);

  useEffect(() => {
    if (truckTypeId) {
      setSelectedType(truckTypeId);
    }
  }, [truckTypeId]);

  const onSave = async () => {
    const data: any = {
      id: truck?.id || '',
      plate,
      active,
      truckTypeId: selectedType,
      image: image || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (truck?.id) {
      updateMutation.mutate(data);
      // refetch trcuks
      //  refetch();
    } else {
      // create
      createMutation.mutate(data, {
        onSuccess: (dt) => {
          onAdd && onAdd(dt);
        },
        onError: () => {
          console.log('error');
        },
      });
    }
  };

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  return (
    <FormContainer>
      {truck && (
        <FeildContainer>
          <img src={truck?.image} />
        </FeildContainer>
      )}

      <FeildContainer>
        <TextField
          label='Plate Number'
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          placeholder='Select Type'
          label='Select Type'
        >
          {allTruckTypes?.map((type: any) => (
            <MenuItem value={type.id} key={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FeildContainer>
      <FeildContainer>
        <Switch
          color='success'
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <Box>
          <input type='file' onChange={handleFileChange} />
        </Box>
        <Button variant='contained' onClick={onSave}>
          Submit
        </Button>
      </FeildContainer>
    </FormContainer>
  );
}
