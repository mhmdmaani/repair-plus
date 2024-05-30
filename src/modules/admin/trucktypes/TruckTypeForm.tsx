'use client';
import {
  useCreateTruckType,
  useUpdateTruckType,
} from '@/hooks/admin/useTruckTypes';
import { Box, Button, Switch, TextField, styled } from '@mui/material';
import { TruckType as TruckTypeType } from 'prisma/prisma-client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FormContainer = styled('div')`
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
export default function TruckTypeForm({
  truckType,
}: {
  truckType: TruckTypeType | null;
}) {
  const updateMutation = useUpdateTruckType(truckType?.id || '');
  const createMutation = useCreateTruckType();
  const [name, setName] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [carries, setCarries] = useState('');
  const [initialPrice, setInitialPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [active, setActive] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [additionalTimePrice, setAdditionalTimePrice] = useState(0);
  const [withDriverPrice, setWithDriverPrice] = useState(0);
  const [stopPointCost, setStopPointCost] = useState(0);
  const [sort, setSort] = useState(0);

  useEffect(() => {
    if (truckType) {
      setName(truckType.name);
      setLength(truckType.length);
      setWidth(truckType.width);
      setHeight(truckType.height);
      setMaxWeight(truckType.maxWeight);
      setCarries(truckType.carries);
      setPrice(truckType.standardPricePerMin);
      setActive(truckType.active);
      setAdditionalTimePrice(truckType.additionalTimeCost);
      setWithDriverPrice(truckType.withDriverHelpCost);
      setStopPointCost(truckType.stopPointCost);
      setInitialPrice(truckType.initialPrice);
      setSort(truckType.sort);
    }
  }, [truckType]);

  const onSave = async () => {
    if (
      !name ||
      !length ||
      !width ||
      !height ||
      !maxWeight ||
      !carries ||
      !price
    ) {
      toast.error('Please fill all the fields');
      return;
    }
    const data: any = {
      id: truckType?.id || '',
      name,
      length,
      width,
      height,
      maxWeight,
      carries,
      standardPricePerMin: price,
      initialPrice,
      active,
      image: image || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      standardWaitingPricePerMin: 0,
      withDriverHelpCost: withDriverPrice,
      additionalTimeCost: additionalTimePrice,
      stopPointCost,
      sort,
    };

    if (truckType?.id) {
      updateMutation.mutate(data);
      // refetch trcuks
      //  refetch();
    } else {
      // create
      createMutation.mutate(data);
    }
  };

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  return (
    <FormContainer>
      <FeildContainer>
        <TextField
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Length'
          value={length}
          onChange={(e) => setLength(e.target.value)}
          type='number'
        />
        <TextField
          label='Width'
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          type='number'
        />
        <TextField
          label='Height'
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          type='number'
        />
        <TextField
          label='Max Weight'
          value={maxWeight}
          onChange={(e) => setMaxWeight(e.target.value)}
          type='number'
        />
        <TextField
          label='Carries'
          value={carries}
          onChange={(e) => setCarries(e.target.value)}
        />
        <TextField
          label='Intitial Price'
          value={initialPrice}
          onChange={(e) => setInitialPrice(parseFloat(e.target.value))}
          type='number'
        />
        <TextField
          label='Standard Cost Per Minute'
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          type='number'
        />

        <TextField
          label='Additional time Cost in Hour'
          value={additionalTimePrice}
          onChange={(e) => setAdditionalTimePrice(parseFloat(e.target.value))}
          type='number'
        />
        <TextField
          label='Cost with Driver Help'
          value={withDriverPrice}
          onChange={(e) => setWithDriverPrice(parseFloat(e.target.value))}
          type='number'
        />

        <TextField
          label='Stop Point Cost'
          value={stopPointCost}
          onChange={(e) => setStopPointCost(parseFloat(e.target.value))}
          type='number'
        />

        <TextField
          label='Sort Number'
          value={sort}
          onChange={(e) => setSort(parseFloat(e.target.value))}
          type='number'
        />

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
