'use client';
import { useAllCategories } from '@/hooks/admin/useCategories';
import { useAllDevices } from '@/hooks/admin/useDevices';
import { useCreateItem, useUpdateItem } from '@/hooks/admin/useItems';
import { useRepairs } from '@/hooks/admin/useRepairs';
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardMedia,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Switch,
  TextField,
  styled,
} from '@mui/material';
import { Category, Device, Repair } from 'prisma/prisma-client';
import { useEffect, useState } from 'react';
import { FiDelete } from 'react-icons/fi';

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

// model Item {
//   id          String     @id @default(uuid())
//   name        String
//   description String
//   image       String
//   sellPrice   Float
//   buyPrice    Float
//   quantity    Int
//   qrCode      String?
//   isUsed      Boolean    @default(false)
//   quality     String
//   isPublished Boolean    @default(false)
//   createdAt   DateTime   @default(now())
//   updatedAt   DateTime   @updatedAt
//   momsPercent Int        @default(0)
//   categories  Category[]
//   repairs     Repair[]
//   devices     Device[]
//   fixOrders   FixOrder[]
//   images      String[]
//   discount    Float?     @default(0)
//   orders      Order[]
//   order       Int        @default(0)
// }

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
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [buyPrice, setBuyPrice] = useState('0');
  const [sellPrice, setSellPrice] = useState('0');
  const [quantity, setQuantity] = useState('0');
  const [quality, setQuality] = useState('');
  const [isUsed, setIsUsed] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [models, setModels] = useState<Device[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [order, setOrder] = useState('0');
  const [momsPercent, setMomsPercent] = useState('0');
  const [color, setColor] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const { data: allDevices } = useAllDevices();
  const { data: allCategories } = useAllCategories();
  const { data: allRepairs } = useRepairs();

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleAddImage = (event: any) => {
    const files = event.target.files as FileList;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
      quantity: parseInt(quantity) || 1,
      quality: quality || 'new',
      isUsed,
      isPublished,
      qrCode,
      devices: models.map((model) => model?.id),
      categories: categories.map((category) => category?.id),
      order: parseInt(order),
      momsPercent: parseFloat(momsPercent),
      color: color,
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
    <Grid container spacing={4}>
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
          </FormContainer>
        </FormContainer>
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        <FormContainer>
          <Button variant='contained' component='label'>
            Upload Images
            <input
              type='file'
              accept='image/*'
              hidden
              multiple
              onChange={handleAddImage}
            />
          </Button>

          <FeildContainer>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
              {images.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card>
                    <CardMedia
                      component='img'
                      height='200'
                      image={image}
                      alt={`Uploaded Image ${index + 1}`}
                    />
                    <CardActions>
                      <IconButton
                        aria-label='delete'
                        onClick={() => handleRemoveImage(index)}
                      >
                        <FiDelete />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </FeildContainer>
        </FormContainer>
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        <FeildContainer>
          <Button variant='contained' onClick={onSave}>
            Submit
          </Button>
        </FeildContainer>
      </Grid>
    </Grid>
  );
}
