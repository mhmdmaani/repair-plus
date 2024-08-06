import {
  Button,
  Container,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { BsSend } from 'react-icons/bs';

const CustomButton = styled(Button)`
  height: 50px;
  width: 100%;
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
const MainFormSection = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormSection = styled('div')`
  margin-top: 30px;
  max-width: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default function SubscribeSection() {
  return (
    <div className='h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
      <Container>
        <TitleContainer>
          <Tagline
            data-aos='fade-up'
            variant='h5'
            color={'primary'}
            fontWeight={'bold'}
          >
            Håll dig uppdaterad med det senaste
          </Tagline>
          <Title data-aos='fade-up' variant='h3' fontWeight={'bold'}>
            nyheter och uppdateringar
          </Title>
          <Divider data-aos='fade-up' />
          <Typography data-aos='fade-up' variant='body1' color={'GrayText'}>
            Prenumerera nu för exklusivt innehåll och erbjudanden!
          </Typography>
        </TitleContainer>
        <MainFormSection>
          <FormSection data-aos={'fade-up'}>
            <TextField label='Email' variant='outlined' fullWidth />
            <CustomButton>
              prenumerera
              <BsSend />
            </CustomButton>
          </FormSection>
        </MainFormSection>
      </Container>
    </div>
  );
}
