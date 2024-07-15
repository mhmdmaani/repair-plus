import InputWithSugession from '@/shared/inputs/InputWithSugession';
import {
  Button,
  FormControl,
  Grid,
  styled,
  Typography,
  CardContent,
  CardMedia,
  Card,
} from '@mui/material';
import { Device, User } from 'prisma/prisma-client';
import React, { useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import NewUserForm from './NewUserForm';
import { useSearchDevicesByName } from '@/hooks/admin/useDevices';
import { set } from 'date-fns';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  flex-grow: 1;
  gap: 10px;
  border: 1px solid #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const Title = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const InputContainer = styled(FormControl)`
  width: 100%;
`;

const ItemCard = styled(Card)`
  background: rgba(17, 25, 40, 1);
  border-width: 2px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    border-color: #cbacf9;
  }
  :hover img {
    transform: scale(1.1);
  }
`;

const CustomImage = styled('img')`
  transition: all 0.5s ease-in-out;
`;

export default function DevicesSection({
  devices,
  setDevices,
}: {
  devices: Device[] | [];
  setDevices: (devices: any) => void;
}) {
  const [nameKey, setNameKey] = React.useState('');
  const { data } = useSearchDevicesByName(nameKey);
  const [displayNew, setDisplayNew] = React.useState(false);

  return (
    <Container>
      <Title variant='h1'>Devices</Title>
      <Grid container spacing={1}>
        {devices.map((device: Device) => (
          <Grid item lg={6} md={6} sm={12}>
            <ItemCard
              style={{
                cursor: 'pointer',
                marginTop: '30px',
                height: 250,
              }}
            >
              <CardMedia
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80%',
                }}
              >
                <CustomImage
                  src={device.image || ''}
                  alt={device.name}
                  style={{
                    width: 'auto',
                    height: '80%',
                    objectFit: 'cover',
                    margin: 'auto',
                  }}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant='body2'
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  {device.name}
                </Typography>
              </CardContent>
            </ItemCard>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={() => {
          setDisplayNew(!displayNew);
        }}
      >
        {displayNew ? 'Cancel' : 'Add Device'}
      </Button>
      {displayNew && (
        <InputContainer>
          <InputWithSugession
            label='name'
            value={nameKey}
            onChange={(e) => setNameKey(e.target.value)}
            placeholder='Device Name'
            suggestions={data || []}
            onSelectSuggesstion={(suggestion: any) => {
              setDevices([...devices, suggestion]);
            }}
            icon={<FiUser />}
          />
        </InputContainer>
      )}
    </Container>
  );
}
