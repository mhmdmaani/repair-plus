import {
  Avatar,
  Button,
  Card,
  Container,
  Fade,
  Grid,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { TbTruckDelivery } from 'react-icons/tb';

const MainContainer = styled('div')`
  margin-top: -160px;
  position: relative;
  z-index: 3;
`;

const CardContainer = styled(Card)`
  padding: 20px;
  min-height: 230px;
  transition: all 0.3s;
  transform-origin: center;
  :hover {
    transform: scale(1.05) translateY(-20px);
  }
`;
const CustomAvatar = styled(Avatar)`
  background: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.common.black
      : props.theme.palette.primary.main};
  color: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.common.white
      : props.theme.palette.common.white};
`;

const CustomButton = styled(Button)``;

export default function FeatureCards() {
  return (
    <MainContainer>
      <Fade in timeout={1500}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <CardContainer>
                <Stack direction={'column'} spacing={2}>
                  <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <CustomAvatar sizes='100'>
                      <TbTruckDelivery />
                    </CustomAvatar>

                    <Typography
                      textTransform={'uppercase'}
                      variant={'h6'}
                      fontSize={20}
                      fontWeight={'bold'}
                    >
                      Book Pickup Now
                    </Typography>
                  </Stack>
                  <Typography variant='body2' color={'GrayText'}>
                    Get your parcel picked up from your door step and delivered
                    to your location.
                  </Typography>
                  <CustomButton variant={'outlined'}>
                    <Typography variant={'button'}>Book Now</Typography>
                  </CustomButton>
                </Stack>
              </CardContainer>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardContainer>
                <Stack direction={'column'} spacing={2}>
                  <Stack direction={'row'} spacing={2}>
                    <CustomAvatar sizes='100'>
                      <TbTruckDelivery />
                    </CustomAvatar>

                    <Typography
                      textTransform={'uppercase'}
                      variant={'h6'}
                      fontSize={20}
                      fontWeight={'bold'}
                    >
                      Track Your Shipment
                    </Typography>
                  </Stack>
                  <Typography variant='body2' color={'GrayText'}>
                    Get real-time updates on your shipment and track its current
                    location.
                  </Typography>
                  <CustomButton variant={'outlined'}>
                    <Typography variant={'button'}>Track Now</Typography>
                  </CustomButton>
                </Stack>
              </CardContainer>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CardContainer>
                <Stack direction={'column'} spacing={2}>
                  <Stack direction={'row'} spacing={2}>
                    <CustomAvatar sizes='100'>
                      <TbTruckDelivery />
                    </CustomAvatar>

                    <Typography
                      textTransform={'uppercase'}
                      variant={'h6'}
                      fontSize={20}
                      fontWeight={'bold'}
                    >
                      Search Schedules
                    </Typography>
                  </Stack>
                  <Typography variant='body2' color={'GrayText'}>
                    Find the best schedules for your shipments and book them
                    instantly.
                  </Typography>
                  <CustomButton variant={'outlined'}>
                    <Typography variant={'button'}>Search</Typography>
                  </CustomButton>
                </Stack>
              </CardContainer>
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </MainContainer>
  );
}
