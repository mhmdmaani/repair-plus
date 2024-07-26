import { Container, Grid, styled } from '@mui/material';
import { Repair } from 'prisma/prisma-client';
import React from 'react';

const ImageContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

function RepairPage({ repair }: { repair: Repair | null }) {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12}>
          <ImageContainer>
            <img src={repair?.image || ''} alt={repair?.name} />
          </ImageContainer>
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          <h1>{repair?.name}</h1>
          <p>{repair?.description}</p>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RepairPage;
