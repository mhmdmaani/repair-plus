'use client';
import {
  useAllBrands,
  useCreateBrand,
  useUpdateBrand,
} from '@/hooks/admin/useBrands';
import { useCreateDevice, useUpdateDevice } from '@/hooks/admin/useDevices';
import { useCreateRepair, useUpdateRepair } from '@/hooks/admin/useRepairs';
import {
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  styled,
} from '@mui/material';
import { addMonths, set } from 'date-fns';
import { Brand, Device } from 'prisma/prisma-client';
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
export default function RepairForm({
  deviceId,
  onAdd,
  currentRepair,
}: {
  deviceId?: string | null;
  currentRepair?: any;
  onAdd?: (a: any) => void;
}) {
  const updateMutation = useUpdateRepair();
  const createMutation = useCreateRepair();
  const [name, setName] = useState('');
  const [image, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [buyPrice, setBuyPrice] = useState('0');
  const [sellPrice, setSellPrice] = useState('0');
  const [repairingPrice, setRepairingPrice] = useState('0');
  const [repairingTimeMinutes, setRepairingTimeMinutes] = useState('0');
  const [quantity, setQuantity] = useState('0');
  const [quality, setQuality] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [order, setOrder] = useState('0');
  const handleFileChange = (event: any) => {
    setLogo(event.target.files[0]);
  };

  useEffect(() => {
    if (currentRepair) {
      setName(currentRepair.name);
      setIsActive(currentRepair.isActive);
      setDescription(currentRepair.description);
      setBuyPrice(currentRepair.buyPrice);
      setSellPrice(currentRepair.sellPrice);
      setRepairingPrice(currentRepair.repairingPrice);
      setRepairingTimeMinutes(currentRepair.repairingTimeMinutes);
      setQuantity(currentRepair.quantity);
      setQuality(currentRepair.quality);
      setOrder(currentRepair.order.toString());
    }
  }, [currentRepair]);

  const onSave = async () => {
    const data: any = {
      id: currentRepair?.id,
      deviceId: deviceId,
      name,
      image: image && image !== '' ? image : undefined,
      isActive,
      description,
      buyPrice: parseFloat(buyPrice),
      sellPrice: parseFloat(sellPrice),
      repairingPrice: parseFloat(repairingPrice),
      repairingTimeMinutes: parseFloat(repairingTimeMinutes),
      quantity: parseFloat(quantity),
      quality,
      order: parseInt(order),
    };

    if (currentRepair) {
      const saved = await updateMutation.mutate(data);
      onAdd && onAdd(data);
    } else {
      // create
      const saved = await createMutation.mutate(data, {
        onSuccess: (data) => {
          onAdd && onAdd(data);
        },
      });
    }
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
          label='Order'
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          multiline
          rows={4}
          label='Description'
          value={description}
          onChange={(e) => set}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Buy Price'
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Sell Price'
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Repairing Price'
          value={repairingPrice}
          onChange={(e) => setRepairingPrice(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Repairing Time(Minutes)'
          value={repairingTimeMinutes}
          onChange={(e) => setRepairingTimeMinutes(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Quality'
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        />
      </FeildContainer>

      <FeildContainer>
        <input type='file' onChange={handleFileChange} />
      </FeildContainer>

      <FeildContainer>
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label='Is Active'
        />
      </FeildContainer>
      <FeildContainer>
        <Button variant='contained' onClick={onSave}>
          Submit
        </Button>
      </FeildContainer>
    </FormContainer>
  );
}
