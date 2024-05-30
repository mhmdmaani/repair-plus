'use client';
import { useVerifyOrder } from '@/hooks/useVerifyOrder';
import { CircularProgress, Typography, styled } from '@mui/material';
import { FiCheckCircle } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

const MainContainer = styled('div')`
  width: 100%;
  height: 100vh;
  background-image: url('/verifyImage.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Overlay = styled('div')`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
const Content = styled('div')`
  position: relative;
  z-index: 2;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  width: 50%;
  min-height: 500px;
`;

const MainLoaderContent = styled('div')`
  height: 500px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
const Loader = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
`;
const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const MainContent = styled('div')``;
export default function VerifyOrderPage({ code }: { code: string | null }) {
  const { data, isLoading } = useVerifyOrder(code);

  return (
    <MainContainer>
      <Overlay />
      <Content>
        {isLoading ? (
          <MainLoaderContent>
            <Title>Checking Order ...</Title>
            <Loader>
              <CircularProgress
                variant='indeterminate'
                disableShrink
                size={150}
                thickness={4}
              />
            </Loader>
          </MainLoaderContent>
        ) : (
          <MainContent>
            <Title>
              {data === null
                ? 'Something Went Wrong!'
                : 'Order Verified Successfully'}
            </Title>
            <Loader>
              {data === null ? (
                <GrClose style={{ fontSize: '200px', color: 'red' }} />
              ) : (
                <FiCheckCircle
                  style={{
                    fontSize: '200px',
                    color: 'green',
                  }}
                />
              )}
            </Loader>
          </MainContent>
        )}
      </Content>
    </MainContainer>
  );
}
