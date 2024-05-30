import { Typography, styled } from '@mui/material';

const Container = styled('div')`
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 10;
`;
const LabelValue = styled('div')`
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.palette.background.paper};
  padding: 10px;
  gap: 10px;
  margin: 10px 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  h3 {
    font-size: 12px;
    color: ${(props) => props.theme.palette.grey[600]};
    margin: 0;
  }
  p {
    font-size: 14px;
    margin: 0;
  }
`;

const DurationSection = styled('div')``;
export default function DistanceAndDurationSection({
  distance,
  duration,
}: {
  distance?: string;
  duration?: string;
}) {
  return (
    <Container>
      <LabelValue>
        <Typography variant='caption' fontWeight={'bold'}>
          <Typography
            component={'span'}
            color={'green'}
            fontWeight={'bold'}
          >{`${duration}`}</Typography>
          <Typography component={'span'} color={'black'}>
            {' '}
            {`(${distance})`}
          </Typography>
        </Typography>
      </LabelValue>
    </Container>
  );
}
