'use client';
import { useAllCategories } from '@/hooks/admin/useCategories';
import { useAllDevices } from '@/hooks/admin/useDevices';
import { useCreateItem, useUpdateItem } from '@/hooks/admin/useItems';
import { useRepairs } from '@/hooks/admin/useRepairs';
import {
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
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
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [order, setOrder] = useState('0');
  const [momsPercent, setMomsPercent] = useState('0');
  const [color, setColor] = useState('');
  const { data: allDevices } = useAllDevices();
  const { data: allCategories } = useAllCategories();
  const { data: allRepairs } = useRepairs();

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
      setOrder(currentItem?.order?.toString());
      setColor(currentItem?.color);
      setMomsPercent(currentItem?.momsPercent);
      setRepairs(currentItem?.repairs || []);
      setModels(currentItem?.models || []);
      setCategories(currentItem?.categories || []);
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
      models: models.map((model) => model.id),
      repairs,
      categories: categories.map((category) => category.id),
      order: parseInt(order),
      momsPercent: parseFloat(momsPercent),
      color,
    };

    if (currentItem) {
      await updateMutation.mutate(data);
      onAdd && onAdd(data);
    } else {
      await createMutation.mutate(data, {
        onSuccess: (data) => {
          onAdd && onAdd(data);
        },
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={4} md={6} xs={12}>
        <FormContainer>
          <FeildContainer>
            <TextField
              label='QR Code'
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
            />
          </FeildContainer>
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
        </FormContainer>
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <FormContainer>
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
              label='Moms Percent'
              value={momsPercent}
              onChange={(e) => setMomsPercent(e.target.value)}
              type='number'
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
        </FormContainer>
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <FormContainer>
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
        </FormContainer>
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        <FormContainer>
          <FormContainer>
            <FeildContainer>
              <Autocomplete
                multiple
                disablePortal
                options={
                  allDevices?.map((option: any) => ({
                    id: option.id,
                    label: option.name,
                  })) || []
                }
                value={models}
                onChange={(event, newValue: any) => setModels(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label='Models' />
                )}
              />
            </FeildContainer>

            <FeildContainer>
              <Autocomplete
                multiple
                disablePortal
                options={
                  allCategories?.map((option: any) => ({
                    id: option.id,
                    label: option.name,
                  })) || []
                }
                value={categories}
                onChange={(event, newValue: any) => setCategories(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label='Categories' />
                )}
              />
            </FeildContainer>

            <FeildContainer>
              <Button variant='contained' onClick={onSave}>
                Submit
              </Button>
            </FeildContainer>
          </FormContainer>
        </FormContainer>
      </Grid>
      <Grid item lg={4} md={6} xs={12}></Grid>
    </Grid>
  );
}
