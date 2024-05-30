import { Container, Grid, styled, Typography } from '@mui/material';
import { FaShippingFast } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import ChooseUsCard from './ChooseUsCard';

const MainContainer = styled('div')`
  padding: 60px 0;
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

export default function ChooseUs() {
  return (
    <MainContainer>
      <Container>
        <TitleContainer>
          <Tagline
            data-aos='fade-up'
            variant='h5'
            color={'primary'}
            fontWeight={'bold'}
          >
            WHY CHOOSE US
          </Tagline>
          <Title data-aos='fade-up' variant='h3' fontWeight={'bold'}>
            Why Our Customers Choose Us!
          </Title>
          <Divider data-aos='fade-up' />
          <Typography data-aos='fade-up' variant='body1' color={'GrayText'}>
            We are a team of dedicated professionals, ready to do whatever it
            takes to make your business grow.
          </Typography>
        </TitleContainer>
        <Grid container spacing={3} marginY={4}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <Typography
                  data-aos='zoom-in'
                  data-aos-delay='300'
                  variant='h5'
                  fontWeight={'bolder'}
                  color='#FFC107'
                >
                  +10
                </Typography>
              }
              title='10 years of experience'
              description={`
                We have been in the industry for over 10 years and have
                successfully delivered over 1000 projects to our clients.
            `}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <RiTeamFill size={50} color='#FFC107' />
                </div>
              }
              title='Experience Team'
              description={`
                We have a team of experienced professionals who are dedicated
                to providing the best services to our clients.
            `}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ChooseUsCard
              data-aos='fade-up'
              Icon={
                <div data-aos='zoom-in' data-aos-delay='500'>
                  <FaShippingFast
                    data-aos='zoom-in'
                    data-aos-delay='300'
                    size={50}
                    color='#FFC107'
                  />
                </div>
              }
              title='Fast Response'
              description={`
                We provide fast response to our clients and ensure that their
                needs are met in a timely manner.
            `}
            />
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  );
}
