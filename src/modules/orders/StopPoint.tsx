import { Grid, Typography, styled } from '@mui/material';
import { FiPhone } from 'react-icons/fi';

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

export default function StopPoint({
  point,
  pointIndex,
}: {
  point: any;
  pointIndex: number;
}) {
  return (
    <LocationSection>
      <Grid container>
        <Grid item lg={8} md={8} sm={12}>
          <Column>
            <Typography variant='body2' fontWeight={'bold'}>
              {`${pointIndex + 1}- ${point.address}`}
            </Typography>
            {point.name && point.name !== '' && (
              <Typography variant='body2' fontWeight={'bold'}>
                {point.name}
              </Typography>
            )}
          </Column>
        </Grid>
        {point.phone && point.phone !== '' && (
          <Grid item lg={4} md={4} sm={12}>
            <Column>
              <Row>
                <a href={`tel:${point.phone}`}>
                  <Row>
                    <FiPhone />
                    <Typography variant='caption' fontWeight={'bold'}>
                      {point.phone}
                    </Typography>
                  </Row>
                </a>
              </Row>
            </Column>
          </Grid>
        )}
      </Grid>
    </LocationSection>
  );
}
