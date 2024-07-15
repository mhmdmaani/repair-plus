import React from 'react';
import {
  FormControl,
  IconButton,
  List,
  styled,
  TextField,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { FiX } from 'react-icons/fi';
import { useSearchByDevices } from '@/hooks/admin/useRepairs';
import { useSettings } from '@/hooks/useSettings';

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

const ListItem = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;
  :hover {
    border-color: #f0f0f0;
  }
`;

const Image = styled('img')`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;
const InputContainer = styled(FormControl)`
  width: 100%;
`;

export default function RepairsSection({
  devices,
  repairs,
  setRepairs,
}: {
  devices: any;
  repairs: any;
  setRepairs: (repairs: any) => void;
}) {
  const [displayNew, setDisplayNew] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState('');
  const { data: settings } = useSettings();
  const { data } = useSearchByDevices({
    searchKey,
    devices: devices.map((device: any) => device.id),
  });

  return (
    <Container>
      <Title>Repairs</Title>
      <InputContainer>
        <List>
          {repairs.map((repair: any, index: number) => (
            <ListItem key={index}>
              <Stack direction={'row'} alignItems={'center'}>
                <Image src={repair?.image} alt='repair' />
                <div className='w-full'>
                  <Typography variant='h6'>{repair.name}</Typography>
                  <Stack direction={'row'} spacing={3}>
                    <Typography>
                      Price: {repair?.sellPrice} {settings?.currencySymbol}
                    </Typography>
                    <Typography>
                      Fixing Cost: {repair?.repairingPrice}{' '}
                      {settings?.currencySymbol}
                    </Typography>

                    <Typography>
                      Time to Fix: {repair?.repairingTimeMinutes} Min
                    </Typography>
                  </Stack>
                </div>
              </Stack>
              <IconButton
                onClick={() => {
                  const newRepairs = [...repairs];
                  newRepairs.splice(index, 1);
                  setRepairs(newRepairs);
                }}
              >
                <FiX />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </InputContainer>
      <Button
        onClick={() => {
          setDisplayNew(!displayNew);
        }}
      >
        {displayNew ? 'Close' : 'Add Repair'}
      </Button>
      {displayNew && (
        <InputContainer>
          <InputContainer>
            <TextField
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              label='Repair'
              placeholder='Repair'
              fullWidth
              inputProps={{
                autoComplete: 'off',
              }}
            />

            <List>
              {data?.map((repair: any, index: number) => (
                <ListItem
                  key={index}
                  onClick={() => {
                    setRepairs([...repairs, repair]);
                  }}
                >
                  <Stack direction={'row'} alignItems={'center'}>
                    <Image src={repair.image} alt='repair' />
                    <Stack direction={'column'}>
                      <Typography>{repair?.name}</Typography>
                      <Typography>
                        {repair?.quantity > 0
                          ? `(${repair?.quantity} in Stock)`
                          : `Out Of Stock`}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography>
                    {repair?.sellPrice} + {repair?.repairingPrice} =
                    {repair?.sellPrice + repair?.repairingPrice}
                    {settings?.currencySymbol}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </InputContainer>
        </InputContainer>
      )}
    </Container>
  );
}
