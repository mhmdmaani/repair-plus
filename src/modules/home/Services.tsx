import { Container, Grid, styled, Typography } from '@mui/material';
import ServiceCard from './ServiceCard';
const MainContaiiner = styled('div')`
  padding: 60px 0;
  position: relative;
  background: ${(props) =>
    props.theme.palette.mode === 'dark' ? '#333333' : '#eff4f9'};
`;
const Square = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: ${(props) => props.theme.palette.warning.main};
`;
const SquaresImage = styled('img')`
  position: absolute;
  top: 60px;
  right: 75px;
  width: 65px;
  height: 65px;
  object-fit: cover;
`;
const TitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const Tagline = styled(Typography)`
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;
const Divider = styled('div')`
  width: 120px;
  height: 5px;
  background: ${(props) => props.theme.palette.primary.main};
  margin-top: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
`;
const Title = styled(Typography)`
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

export default function Services() {
  return (
    <MainContaiiner>
      <Square />
      <SquaresImage src='./squares.png' />
      <Container>
        <TitleContainer>
          <Tagline
            data-aos='fade-up'
            variant='h5'
            color={'primary'}
            fontWeight={'bold'}
          >
            Services
          </Tagline>
          <Title data-aos='fade-up' variant='h3' fontWeight={'bold'}>
            Our Services
          </Title>
          <Divider data-aos='fade-up' />
          <Typography data-aos='fade-up' variant='body1' color={'GrayText'}>
            We provide a wide range of services to our clients to meet their
            business needs
          </Typography>
        </TitleContainer>
        <Grid container spacing={4} marginY={4}>
          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard
              data-aos='fade-up'
              data-aos-duration='1000'
              title='Intermodal'
              description=' We provide the best logistic services for your business needs'
              image='./service1.png'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard
              data-aos='fade-up'
              data-aos-duration='1000'
              title='Dedicated'
              description='We provide the best logistic services for your business needs'
              image='./service2.png'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard
              data-aos='fade-up'
              data-aos-duration='1000'
              title='Truckload'
              description='We provide the best logistic services for your business needs'
              image='./service6.jpg'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard
              data-aos='fade-up'
              data-aos-duration='1000'
              title='Final Mile'
              description=' We provide the best logistic services for your business needs'
              image='./service4.jpg'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard
              data-aos='fade-up'
              title='Fullfillment'
              description=' We provide the best logistic services for your business needs'
              image='./service5.jpg'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard
              data-aos='fade-up'
              title='LTL'
              description=' We provide the best logistic services for your business needs'
              image='./service7.jpg'
            />
          </Grid>
        </Grid>
      </Container>
    </MainContaiiner>
  );
}
