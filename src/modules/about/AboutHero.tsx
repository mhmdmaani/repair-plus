import { Container, Typography, styled } from '@mui/material';
import React from 'react';

const MainContainer = styled('div')`
  background-image: url('./about.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  min-height: 400px;
  display: flex;
  align-items: center;
  position: relative;
`;
const Overlay = styled('div')`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Content = styled('div')`
  z-index: 2;
  color: white;
  text-align: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: 20px;
  max-width: 600px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.5);
`;
export default function AboutHero() {
  return (
    <MainContainer>
      <Overlay />
      <Content>
        <Container>
          <Typography variant='h3' fontWeight={'bold'}>
            Repair Plus
          </Typography>
        </Container>
      </Content>
    </MainContainer>
  );
}
