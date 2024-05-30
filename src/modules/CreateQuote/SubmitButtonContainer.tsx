import { Button, Card, Typography, styled } from '@mui/material';

const MainContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 10px;
  @media (max-width: 1000px) {
    bottom: 75px;
  }
`;
const Container = styled(Card)`
  width: 33%;
  padding: 15px;
  background: ${(props) => props.theme.palette.background.paper};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  @media (max-width: 1000px) {
    border-radius: 0;
    padding: 5px;
    width: 100%;
  }
`;

const CustomButton = styled(Button)`
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  padding: 12px;
  &:disabled {
    opacity: 0.5;
  }
  @media (max-width: 1000px) {
    padding: 5px;
  }
`;
export default function SubmitButtonContainer({
  selectedItem,
  onSubmit,
}: {
  selectedItem: any;
  onSubmit: () => void;
}) {
  return (
    <MainContainer>
      {selectedItem && (
        <Container>
          <CustomButton
            onClick={onSubmit}
            disabled={!selectedItem}
            variant='contained'
          >
            <Typography variant='h6' fontWeight={'bold'}>
              {selectedItem
                ? `Request ${selectedItem?.name}`
                : 'Select a truck'}
            </Typography>
          </CustomButton>
        </Container>
      )}
    </MainContainer>
  );
}
