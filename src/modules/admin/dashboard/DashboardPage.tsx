import { Container, Grid } from '@mui/material';
import { BiSolidOffer } from 'react-icons/bi';
import { FaCogs, FaTruck } from 'react-icons/fa';
import { FaTruckFast, FaUserTie } from 'react-icons/fa6';
import { LiaFileContractSolid } from 'react-icons/lia';
import { MdLibraryBooks } from 'react-icons/md';
import DashboardCard from './DashboardCard';
import { MdAlternateEmail } from 'react-icons/md';

export default function DashboardPage() {
  return (
    <Container
      sx={{
        minHeight: 'calc(100vh - 65px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        spacing={3}
      >
        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<FaTruck />}
            title='Truck types'
            link={`/admin/trucktypes`}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<MdLibraryBooks />}
            title='orders'
            link={`/admin/orders`}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<FaUserTie />}
            title='Drivers'
            link={`/admin/driver`}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<FaTruckFast />}
            title='Trucks'
            link={`/admin/truck`}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<BiSolidOffer />}
            title='Offers'
            link={`/admin/offers`}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<MdAlternateEmail />}
            title='Subscriptions'
            link={`/admin/subscriptions`}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<FaCogs />}
            title='Settings'
            link={`/admin/settings`}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<LiaFileContractSolid />}
            title='Terms & Conditions'
            link={`/admin/term`}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
