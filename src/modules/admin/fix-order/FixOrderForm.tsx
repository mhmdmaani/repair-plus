'use client';

import { Grid } from '@mui/material';
import React from 'react';
import UserSection from './UserSection';
import DevicesSection from './DevicesSection';
import ProblemsSection from './ProblemsSection';
import NoteSection from './NoteSection';
import RepairsSection from './RepairsSection';
import FixSection from './FixSection';
import ExpectedDateSection from './ExpectedDateSection';
import StatusSection from './StatusSection';
import ReviewOrder from './ReviewOrder';

export default function FixOrderForm({ id }: { id: string | undefined }) {
  const [user, setUser] = React.useState(null);
  const [devices, setDevices] = React.useState([]);
  const [problems, setProblems] = React.useState([]);
  const [userNote, setUserNote] = React.useState('');
  const [expectedDateToFix, setExpectedDateToFix] = React.useState('');
  const [maintenanceNote, setMaintenanceNote] = React.useState('');
  const [repairs, setRepairs] = React.useState([]);
  const [fixes, setFixes] = React.useState([]);
  const [status, setStatus] = React.useState('WAITING');
  const [discount, setDiscount] = React.useState(0);
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={4} sm={12}>
        <UserSection user={user} setUser={setUser} />
        <DevicesSection devices={devices} setDevices={setDevices} />
        <ProblemsSection problems={problems} setProblems={setProblems} />
        <NoteSection
          title='User Note'
          label='User Note'
          value={userNote}
          onChange={(e) => setUserNote(e.target.value)}
          placeholder={''}
        />
        <ExpectedDateSection
          value={expectedDateToFix}
          onChange={(e) => setExpectedDateToFix(e.target.value)}
          title={'Expected Date to Fix'}
          label={''}
          placeholder={''}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12}>
        <StatusSection status={status} setStatus={setStatus} />
        <RepairsSection
          devices={devices}
          repairs={repairs}
          setRepairs={setRepairs}
        />
        <FixSection fixes={fixes} setFixes={setFixes} />
        <NoteSection
          title='Maintenance Note'
          label='Maintenance Note'
          value={maintenanceNote}
          onChange={(e) => setMaintenanceNote(e.target.value)}
          placeholder={''}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12}>
        <ReviewOrder
          user={user}
          devices={devices}
          repairs={repairs}
          problems={problems}
          userNote={userNote}
          expectedDateToFix={expectedDateToFix}
          maintenanceNote={maintenanceNote}
          fixes={fixes}
          status={status}
          fixOrderId={id}
          discount={discount}
          setDiscount={setDiscount}
        />
      </Grid>
    </Grid>
  );
}
