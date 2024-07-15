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

const FormContainer = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export default function FixSection({
  fixes,
  setFixes,
}: {
  fixes: any;
  setFixes: (repairs: any) => void;
}) {
  const [displayNew, setDisplayNew] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState('');
  const { data: settings } = useSettings();
  const [newName, setNewName] = React.useState('');
  const [newPrice, setNewPrice] = React.useState(0);
  const [newTime, setNewTime] = React.useState(0);

  return (
    <Container>
      <Title>Other Fixes</Title>
      <InputContainer>
        <List>
          {fixes.map((fix: any, index: number) => (
            <ListItem key={index}>
              <Stack direction={'row'} alignItems={'center'}>
                <div className='w-full'>
                  <Typography variant='h6'>{fix.name}</Typography>
                  <Stack direction={'row'} spacing={3}>
                    <Typography>
                      Cost: {fix?.price} {settings?.currencySymbol}
                    </Typography>
                    <Typography>
                      Time to Fix: {fix?.repairingTimeMinutes} Min
                    </Typography>
                  </Stack>
                </div>
              </Stack>
              <IconButton
                onClick={() => {
                  const newFixes = [...fixes];
                  newFixes.splice(index, 1);
                  setFixes(newFixes);
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
        <FormContainer>
          <TextField
            label='name'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder='Repair Name'
          />
          <TextField
            label='price'
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            placeholder='Repair Price'
          />
          <TextField
            label='time'
            value={newTime}
            onChange={(e) => setNewTime(Number(e.target.value))}
            placeholder='Repair Time'
          />
          <Button
            onClick={() =>
              setFixes([
                ...fixes,
                {
                  name: newName,
                  price: newPrice,
                  repairingTimeMinutes: newTime,
                },
              ])
            }
          >
            Add
          </Button>
        </FormContainer>
      )}
    </Container>
  );
}
