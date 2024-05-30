'use client';
import { useCreateDriver, useUpdateDriver } from '@/hooks/admin/useDriver';
import { Box, Button, Switch, TextField, styled } from '@mui/material';
import { Driver } from 'prisma/prisma-client';
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
export default function DriverForm({
  driver,
  onAdd,
}: {
  driver?: Driver | null;
  onAdd?: (a: any) => void;
}) {
  const updateMutation = useUpdateDriver(driver?.id || '');
  const createMutation = useCreateDriver();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(false);
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    if (driver) {
      setName(driver.name);
      setPhone(driver.phone);
      setEmail(driver.email);
      setActive(driver.active);
    }
  }, [driver]);

  const onSave = async () => {
    let saved = null;
    const data: any = {
      id: driver?.id || '',
      name,
      phone,
      email,
      active,
      image: image || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (driver?.id) {
      const saved = await updateMutation.mutate(data);
      // refetch trcuks
      //  refetch();
    } else {
      // create
      const saved = await createMutation.mutate(data, {
        onSuccess: (data) => {
          onAdd && onAdd(data);
        },
      });
    }
  };

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  return (
    <FormContainer>
      {driver && (
        <FeildContainer>
          <img src={driver?.image} />
        </FeildContainer>
      )}

      <FeildContainer>
        <TextField
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type='tel'
        />
        <TextField
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
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
