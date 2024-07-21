import { Container, Grid } from '@mui/material';
import { BiSolidOffer } from 'react-icons/bi';
import { FaCogs, FaJediOrder, FaStar, FaTruck } from 'react-icons/fa';
import { FaTruckFast, FaUserTie } from 'react-icons/fa6';
import { LiaFileContractSolid } from 'react-icons/lia';
import { MdHomeRepairService, MdLibraryBooks } from 'react-icons/md';
import DashboardCard from './DashboardCard';
import { MdAlternateEmail } from 'react-icons/md';
import { SiBrandfolder } from 'react-icons/si';
import { BsFillPhoneFill } from 'react-icons/bs';
import { FiTag } from 'react-icons/fi';

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
            icon={<SiBrandfolder />}
            title='Brands'
            link={`/admin/brands`}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<FiTag />}
            title='Categories'
            link={`/admin/categories`}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<BsFillPhoneFill />}
            title='Devices'
            link={`/admin/devices`}
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

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<FaStar />}
            title='Reviews'
            link={`/admin/reviews`}
          />
        </Grid>

        <Grid item xl={6} lg={6} md={6} sm={12}>
          <DashboardCard
            icon={<MdHomeRepairService />}
            title='Fix-Orders'
            link={`/admin/fix-order`}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
