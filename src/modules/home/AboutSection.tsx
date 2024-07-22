import {
  Button,
  Container,
  Fade,
  Grid,
  Typography,
  styled,
} from '@mui/material';

const MainContainer = styled('div')`
  padding: 80px 0;
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
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Fade in timeout={1500}>
              <h1 className='text-start w-full heading mb-8'>
                About
                <span className='text-purple'> Us</span>
              </h1>
            </Fade>
            <Fade in timeout={1600}>
              <Title variant='h3' fontWeight={'bold'}></Title>
            </Fade>

            <div data-aos='fade-right'>
              <Typography variant='body1' color={'GrayText'}>
                Welcome to Repair Plus, your trusted partner in electronic
                device repairs. We are dedicated to providing high-quality
                repair services for a wide range of electronic devices,
                including smartphones, tablets, PlayStation consoles,
                e-scooters, and more. Our mission is to deliver reliable,
                efficient, and affordable repair solutions to get your devices
                back in perfect working condition.
              </Typography>

              <Typography variant='body1' color={'GrayText'} mt={1}>
                At Repair Plus, we understand the inconvenience and frustration
                that comes with a malfunctioning device. That's why our team of
                experienced and certified technicians is committed to diagnosing
                and fixing your electronic issues swiftly and accurately.
                Whether it's a cracked screen, battery issue, software problem,
                or any other technical glitch, we have the expertise to handle
                it all.
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
