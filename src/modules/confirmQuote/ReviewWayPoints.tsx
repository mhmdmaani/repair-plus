import { Typography, styled } from '@mui/material';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WayPointItem = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const WayPointIcon = styled('div')`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
`;

const WaypointNumber = styled(Typography)<{
  isPickup?: boolean;
}>`
  position: absolute;
  top: 3px;
  left: 12px;
  font-size: 10px;
  color: ${(props) => (props.isPickup ? 'green' : 'red')};
`;
const WayPointDescription = styled(Typography)``;
export default function ReviewWayPoints({ waypoints }: { waypoints: any }) {
  return (
    <Container>
      {waypoints.map((waypoint: any, index: number) => (
        <WayPointItem key={index}>
          <WayPointIcon>
            <WaypointNumber isPickup={waypoint.type === 'pickup'}>
              {index + 1}
            </WaypointNumber>
            <img
              src={
                waypoint.type === 'pickup'
                  ? './pickupPoint.png'
                  : './dropoffPoint.png'
              }
              alt={waypoint.description}
            />
          </WayPointIcon>
          <WayPointDescription>{waypoint.description}</WayPointDescription>
        </WayPointItem>
      ))}
    </Container>
  );
}
