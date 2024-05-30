import { Button, Grid, TextField, styled } from '@mui/material';
import { useState } from 'react';

const FeildContainer = styled(Grid)`
  padding: 10px;
  @media (max-width: 1000px) {
    padding: 5px;
    width: 100%;
  }
`;

export default function WayPointForm({
  onSubmit,
}: {
  onSubmit: (d: any) => void;
}) {
  const [contactPhone, setContactPhone] = useState('');
  const [contactName, setContactName] = useState('');
  return (
    <Grid container>
      <FeildContainer item sm={12} md={6} lg={6} padding={2}>
        <TextField
          label='Contact Name'
          variant='outlined'
          fullWidth
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer item sm={12} md={6} lg={6} padding={2}>
        <TextField
          label='Contact Phone'
          variant='outlined'
          fullWidth
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          type='tel'
        />
      </FeildContainer>

      <FeildContainer item sm={12} md={12} lg={12} padding={2}>
        <Button
          onClick={() =>
            onSubmit({
              name: contactName,
              phone: contactPhone,
            })
          }
          variant='outlined'
          fullWidth
        >
          Confirm
        </Button>
      </FeildContainer>
    </Grid>
  );
}
