import { useCreateSubscription } from '@/hooks/useSubscription';
import { useStateValue } from '@/providers/StateContext';
import Appbar from '@/shared/layout/Appbar';
import {
  Avatar,
  Button,
  Card,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';

const MainContainer = styled('div')`
  width: 100%;
  height: calc(100vh - 97px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/heroImg.jpg');
  background-size: cover;
  position: relative;
  @media (max-width: 768px) {
    height: calc(100vh - 57px);
  }
`;

const Overlay = styled('div')`
  background: linear-gradient(179deg, #333333 50%, #000000 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
`;
const Content = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
`;
const CustomCard = styled(Card)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  max-width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
  @media (max-width: 400px) {
    width: 95%;
  }
`;

const EmailIconContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const IconAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  background: #d42b22;
`;

export default function EmailForm({
  onSubmit,
  settings,
}: {
  onSubmit: () => void;
  settings: any;
}) {
  const createMutation = useCreateSubscription();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useStateValue();
  const handleSubmit = async () => {
    setIsLoading(true);
    await createMutation.mutateAsync({ email: email });
    localStorage.setItem('email', email);
    dispatch({ type: 'SET_EMAIL', payload: email });
    setIsLoading(false);
    onSubmit();
  };
  return (
    <>
      <Appbar />
      <MainContainer>
        <Overlay />
        {settings?.displayEmailInSeperatePage === true && (
          <Content>
            <CustomCard>
              <EmailIconContainer>
                <IconAvatar>
                  <FiMail fontSize={50} />
                </IconAvatar>
              </EmailIconContainer>
              <Typography textAlign={'center'} variant='h5'>
                Enter Your Email
              </Typography>
              <TextField
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                disabled={isLoading || email === ''}
                onClick={handleSubmit}
                variant='outlined'
              >
                Quick Quote
                <FiSend />
              </Button>
            </CustomCard>
          </Content>
        )}
      </MainContainer>
    </>
  );
}
