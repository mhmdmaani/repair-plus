'use client';
import { useCreateItem, useUpdateItem } from '@/hooks/admin/useItems';
import {
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  styled,
} from '@mui/material';
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

export default function ItemForm({
  onAdd,
  currentItem,
}: {
  deviceId?: string | null;
  currentItem?: any;
  onAdd?: (a: any) => void;
}) {
  const updateMutation = useUpdateItem();
  const createMutation = useCreateItem();
  const [name, setName] = useState('');
  const [image, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [buyPrice, setBuyPrice] = useState('0');
  const [sellPrice, setSellPrice] = useState('0');
  const [quantity, setQuantity] = useState('0');
  const [quality, setQuality] = useState('');
  const [isUsed, setIsUsed] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [modelId, setModelId] = useState('');
  const [repairId, setRepairId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [order, setOrder] = useState('0');
  const [momsPercent, setMomsPercent] = useState('0');
  const [color, setColor] = useState('');

  const handleFileChange = (event: any) => {
    setLogo(event.target.files[0]);
  };

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setDescription(currentItem.description);
      setBuyPrice(currentItem.buyPrice);
      setSellPrice(currentItem.sellPrice);
      setQuantity(currentItem.quantity);
      setQuality(currentItem.quality);
      setIsUsed(currentItem.isUsed);
      setIsPublished(currentItem.isPublished);
      setQrCode(currentItem.qrCode || '');
      setModelId(currentItem.modelId || '');
      setRepairId(currentItem.repairId || '');
      setCategoryId(currentItem.categoryId || '');
      setOrder(currentItem.order.toString());
      setColor(currentItem.color);
      setMomsPercent(currentItem.momsPercent);
    }
  }, [currentItem]);

  const onSave = async () => {
    const data: any = {
      id: currentItem?.id,
      name,
      image: image && image !== '' ? image : undefined,
      description,
      buyPrice: parseFloat(buyPrice),
      sellPrice: parseFloat(sellPrice),
      quantity: parseInt(quantity),
      quality,
      isUsed,
      isPublished,
      qrCode,
      modelId,
      repairId,
      categoryId,
      order: parseInt(order),
      momsPercent: parseFloat(momsPercent),
      color,
    };

    if (currentItem) {
      await updateMutation.mutate(data);
      onAdd && onAdd(data);
    } else {
      // create
      await createMutation.mutate(data, {
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
          onChange={(e) => setDescription(e.target.value)}
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
        <TextField
          label='QR Code'
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Model ID'
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Repair ID'
          value={repairId}
          onChange={(e) => setRepairId(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Category ID'
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
      </FeildContainer>

      <FeildContainer>
        <input type='file' onChange={handleFileChange} />
      </FeildContainer>
      <FeildContainer>
        <input
          type='color'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </FeildContainer>

      <FeildContainer>
        <TextField
          label='Moms Percent'
          value={momsPercent}
          onChange={(e) => setMomsPercent(e.target.value)}
          type='number'
        />
      </FeildContainer>

      <FeildContainer>
        <FormControlLabel
          control={
            <Switch
              checked={isUsed}
              onChange={(e) => setIsUsed(e.target.checked)}
            />
          }
          label='Is Used'
        />
      </FeildContainer>
      <FeildContainer>
        <FormControlLabel
          control={
            <Switch
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          }
          label='Is Published'
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
