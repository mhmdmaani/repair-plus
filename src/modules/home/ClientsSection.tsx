import { Container, Grid, styled } from '@mui/material';

const MainContainer = styled('div')`
  margin: 60px 0;
  padding: 40px 0;
`;

const LogoContainer = styled('div')`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled('img')`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
export default function ClientsSection() {
  return (
    <MainContainer>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LogoContainer>
              <Logo src='./client1.png' />
            </LogoContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LogoContainer>
              <Logo src='./client2.png' />
            </LogoContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LogoContainer>
              <Logo src='./client3.png' />
            </LogoContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LogoContainer>
              <Logo src='./client4.png' />
            </LogoContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LogoContainer>
              <Logo src='./client5.png' />
            </LogoContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LogoContainer>
              <Logo src='./client3.png' />
            </LogoContainer>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  );
}
