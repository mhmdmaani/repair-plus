import React from 'react';
import {
  Button,
  FormControl,
  Grid,
  styled,
  TextField,
  Typography,
} from '@mui/material';

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
`;

const Title = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const InputContainer = styled(FormControl)`
  width: 100%;
`;

export default function StatusSection({
  status,
  setStatus,
}: {
  status: string;
  setStatus: (e: any) => void;
}) {
  return (
    <Container>
      <Title>{`STATUS(${status})`} </Title>
      <InputContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6} sm={6}>
            <Button
              onClick={() => setStatus('WAITING')}
              variant='outlined'
              color='primary'
              fullWidth
            >
              WAITING
            </Button>
          </Grid>

          <Grid item xs={12} lg={6} sm={6}>
            <Button
              onClick={() => setStatus('PENDING')}
              variant='outlined'
              color='primary'
              fullWidth
            >
              PENDING
            </Button>
          </Grid>

          <Grid item xs={12} lg={6} sm={6}>
            <Button
              onClick={() => setStatus('IN_PROGRESS')}
              variant='outlined'
              color='primary'
              fullWidth
            >
              IN PROGRESS
            </Button>
          </Grid>

          <Grid item xs={12} lg={6} sm={6}>
            <Button
              onClick={() => setStatus('DONE')}
              variant='outlined'
              color='primary'
              fullWidth
            >
              DONE
            </Button>
          </Grid>

          <Grid item xs={12} lg={6} sm={6}>
            <Button
              onClick={() => setStatus('TOKEN')}
              variant='outlined'
              color='primary'
              fullWidth
            >
              TAKEN
            </Button>
          </Grid>

          <Grid item xs={12} lg={6} sm={6}>
            <Button
              onClick={() => setStatus('CANCELLED')}
              variant='outlined'
              color='primary'
              fullWidth
            >
              CANCELED
            </Button>
          </Grid>
        </Grid>
      </InputContainer>
    </Container>
  );
}
