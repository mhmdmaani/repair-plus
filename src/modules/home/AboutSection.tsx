import {
  Button,
  Container,
  Fade,
  Grid,
  Typography,
  styled,
} from '@mui/material';

const MainContainer = styled('div')`
  padding: 60px 0;
`;

const Tagline = styled(Typography)`
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

const ImageContainer = styled('div')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const CustomButton = styled(Button)`
  height: 50px;
  width: 200px;
  margin-top: 20px;
  padding: 0 10px;
  position: relative;
  background: transparent;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.main};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
  gap: 10px;
  transition: all 0.5s ease-in-out;
  z-index: 1;
  overflow: hidden;
  :before {
    content: '';
    position: absolute;
    background: ${(props) => props.theme.palette.primary.main};
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translateX(-100%);
    transform-origin: 0 50%;
    transition: transform 0.3s;
  }
  :hover:before {
    transform: translateX(0);
  }
  :hover {
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const Title = styled(Typography)`
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
export default function AboutSection() {
  return (
    <MainContainer>
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12} sm={6} md={6} lg={6} alignItems={'center'}>
            <Fade in timeout={1500}>
              <Tagline
                data-aos={'fade'}
                variant='h5'
                color={'primary'}
                fontWeight={'bold'}
              >
                About Quick National
              </Tagline>
            </Fade>
            <Fade in timeout={1600}>
              <Title variant='h3' fontWeight={'bold'}>
                Solutions
              </Title>
            </Fade>
            <Divider />
            <div data-aos='fade-right'>
              <Typography variant='body1' color={'GrayText'}>
                Quick National is a logistics company that provides services in
                the areas of courier, cargo, and parcel delivery. We are a
                customer-centric company that is dedicated to providing the best
                services to our customers.
              </Typography>
            </div>
            <CustomButton variant='contained'>Learn More</CustomButton>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <ImageContainer data-aos='fade-left'>
              <img
                src='./about.png'
                alt='delivery'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageContainer>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  );
}
