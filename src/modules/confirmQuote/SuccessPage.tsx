import { useStateValue } from '@/providers/StateContext';
import { Box, Button, Card, Modal, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FiCheckCircle } from 'react-icons/fi';

const MainContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Container = styled(Card)`
  width: 50vw;
  max-width: 700px;
  padding: 20px;
  border-radius: 12px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const IconContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled('h2')`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
`;
const MainSection = styled('div')`
  margin-top: 20px;
  font-size: 20px;
`;
const CustomButton = styled(Button)`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 8px;
  text-transform: none;
`;
export default function SuccessPage({ open }: { open: boolean }) {
  const { state, dispatch } = useStateValue();
  const router = useRouter();
  return (
    <Modal
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <MainContainer>
        <Container>
          <IconContainer>
            <FiCheckCircle size={100} color={'#4CAF50'} />
          </IconContainer>
          <Title>Quote Confirmed</Title>
          <MainSection>
            Your quote has been confirmed. We will send you reciept and tracking
            details to your email.
          </MainSection>
          <CustomButton
            variant='contained'
            color='success'
            onClick={() => {
              dispatch({ type: 'RESET' });
              router.back();
            }}
          >
            Done
          </CustomButton>
        </Container>
      </MainContainer>
    </Modal>
  );
}
