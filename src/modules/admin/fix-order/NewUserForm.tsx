import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useCreateUser, useUpdateUser } from '@/hooks/admin/useUsers';
import { User } from 'prisma/prisma-client';

const NewUserForm = ({
  user,
  onSubmit,
}: {
  user: User | null;
  onSubmit: (us: any) => void;
}) => {
  const saveMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    address: '',
    company: '',
    orgNumber: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        tel: user.tel,
        address: user?.address || '',
        company: user?.company || '',
        orgNumber: user?.orgNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (user) {
      updateMutation.mutate(
        { ...formData, id: user.id },
        {
          onSuccess: (data) => {
            onSubmit(data);
          },
        }
      );
    }
    saveMutation.mutate(formData, {
      onSuccess: (data) => {
        onSubmit(data);
      },
    });
  };

  return (
    <Container maxWidth='sm'>
      <div style={{ marginTop: 20 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          New User Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label='Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Phone Number'
            name='tel'
            type='tel'
            value={formData.tel}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Company'
            name='company'
            value={formData.company}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Organization Number'
            name='orgNumber'
            value={formData.orgNumber}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default NewUserForm;
