import { Grid, Typography, styled } from '@mui/material';
import { format } from 'date-fns';
import { FiCalendar, FiClock, FiPhone } from 'react-icons/fi';

const LocationSection = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const LocationIcon = styled('img')`
  width: 60px;
  height: 60px;
`;

const Row = styled('div')`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Column = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Link = styled('a')`
  color: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.common.white
      : props.theme.palette.common.black};
`;

export default function MainPoint({ point }: { point: any }) {
  return (
    <LocationSection>
      <Grid container>
        <Grid item lg={8} md={8} sm={12}>
          <Column>
            <Typography variant='body2' fontWeight={'bold'}>
              {point.address}
            </Typography>
            <Row>
              <Typography variant='body2' fontWeight={'bold'}>
                {point.name}
              </Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {point.company}
              </Typography>
            </Row>
            <Row>
              <Typography variant='body2' fontWeight={'bold'}>
                {point.city}
              </Typography>
              <Typography variant='body2' fontWeight={'bold'}>
                {point.postal}
              </Typography>
            </Row>
            {point.additional && point.additional !== '' && (
              <Row>
                <Typography variant='body2' fontWeight={'bold'}>
                  {`Note: ${point.additional}`}
                </Typography>
              </Row>
            )}
          </Column>
        </Grid>
        <Grid item lg={4} md={4} sm={12}>
          <Column>
            <Row>
              <Link href={`tel:${point.phone}`}>
                <Row>
                  <FiPhone />
                  <Typography variant='caption' fontWeight={'bold'}>
                    {point.phone}
                  </Typography>
                </Row>
              </Link>
            </Row>
            <Row>
              <FiCalendar />
              <Typography variant='caption' fontWeight={'bold'}>
                {format(new Date(point.date), 'yyyy-dd-mm')}
              </Typography>
            </Row>
            <Row>
              <FiClock />
              {point.timeType === 'ASAP' && (
                <Typography variant='caption' fontWeight={'bold'}>
                  ASAP
                </Typography>
              )}
              {point.timeType === 'at' && (
                <Typography variant='caption' fontWeight={'bold'}>
                  {' '}
                  {` At ${point.fromTime}`}
                </Typography>
              )}

              {point.timeType === 'before' && (
                <Typography variant='caption' fontWeight={'bold'}>
                  {' '}
                  {`Before ${point.fromTime}`}
                </Typography>
              )}

              {point.timeType === 'between' && (
                <Typography variant='caption' fontWeight={'bold'}>
                  {` Between ${point.fromTime} - ${point.toTime}`}
                </Typography>
              )}
            </Row>
          </Column>
        </Grid>
      </Grid>
    </LocationSection>
  );
}
