import { Grid, TextField, styled } from '@mui/material';
import React from 'react';

const FeildContainer = styled('div')`
  padding: 10px;
`;
export default function BasePaymentForm({
  name,
  lastName,
  setName,
  setLastName,
  email,
  setEmail,
  address,
  setAddress,
  phone,
  setPhone,
  city,
  postal,
  setCity,
  setPostal,
  company,
  setCompany,
}: {
  city: string;
  postal: string;
  setCity: (city: string) => void;
  setPostal: (postal: string) => void;
  name: string;
  setName: (name: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  email: string;
  setEmail: (email: string) => void;
  address: string;
  setAddress: (address: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  company: string;
  setCompany: (company: string) => void;
}) {
  return (
    <Grid container>
      <Grid item lg={6} md={6} sm={12}>
        <FeildContainer>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your First Name'
            label='First Name'
            fullWidth
          />
        </FeildContainer>
      </Grid>
      <Grid item lg={6} md={6} sm={12}>
        <FeildContainer>
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Enter your Last Name'
            label='Last Name'
            fullWidth
          />
        </FeildContainer>
      </Grid>
      <Grid item lg={6} md={6} sm={12}>
        <FeildContainer>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            label='Email'
            fullWidth
          />
        </FeildContainer>
      </Grid>

      <Grid item lg={6} md={6} sm={12}>
        <FeildContainer>
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Phone'
            label='Phone'
            fullWidth
          />
        </FeildContainer>
      </Grid>

      <Grid item lg={6} md={6} sm={12}>
        <FeildContainer>
          <TextField
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder='Company Name (optional)'
            label='Company Name (optional)'
            fullWidth
          />
        </FeildContainer>
      </Grid>

      <Grid item lg={6} md={6} sm={12}>
        <FeildContainer>
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
            label='Address'
            fullWidth
          />
        </FeildContainer>
      </Grid>
      <Grid item lg={6} md={6} sm={12}>
        <FeildContainer>
          <TextField
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
            label='City'
            fullWidth
          />
        </FeildContainer>
      </Grid>
      <Grid item lg={6} md={6} sm={12}>
        <FeildContainer>
          <TextField
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            placeholder='Postal Code'
            label='Postal Code'
            fullWidth
          />
        </FeildContainer>
      </Grid>
    </Grid>
  );
}
