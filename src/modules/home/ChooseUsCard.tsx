import { Typography, styled } from '@mui/material';

const MainContainer = styled('div')`
  margin-top: 70px;
`;
const CardContainer = styled('div')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  padding: 20px;
  border-radius: 10px;
  background: ${(props) =>
    props.theme.palette.mode === 'dark' ? '#333333' : '#eff4f9'};
`;

const MainIconContainer = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const IconContainer = styled('div')`
  width: 100px;
  height: 100px;
  font-size: 2rem;
  color: ${(props) => props.theme.palette.primary.main};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.palette.background.paper};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -70px;
`;

const Content = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
export default function ChooseUsCard({
  Icon,
  title,
  description,
  ...props
}: {
  Icon: any;
  title: string;
  description: string;
  props?: any;
}) {
  return (
    <MainContainer {...props}>
      <CardContainer>
        <MainIconContainer>
          <IconContainer>{Icon}</IconContainer>
        </MainIconContainer>
        <Content>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='body2' color={'GrayText'}>
            {description}
          </Typography>
        </Content>
      </CardContainer>
    </MainContainer>
  );
}
