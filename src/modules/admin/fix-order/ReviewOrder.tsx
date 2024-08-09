import React, { useMemo } from 'react';
import {
  styled,
  Typography,
  Stack,
  Avatar,
  Divider,
  Button,
  TextField,
} from '@mui/material';
import { FiMail, FiPhone, FiUser, FiVoicemail } from 'react-icons/fi';
import { User } from 'prisma/prisma-client';
import { useSettings } from '@/hooks/useSettings';
import {
  useCreateFixOrder,
  useUpdateFixOrder,
} from '@/hooks/admin/useFixOrders';
const Container = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  flex-grow: 1;
  gap: 10px;
  border: 1px solid #f0f0f0;
  padding: 20px;
  border-radius: 10px;
`;
const Title = styled('div')`
  font-size: 2rem;
  margin-bottom: 20px;
`;
const InputContainer = styled('div')`
  width: 100%;
`;

const Section = styled('div')`
  margin-bottom: 20px;
  width: 100%;
`;
const SectionTitle = styled('div')`
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LabelValue = styled('div')`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Label = styled(Typography)`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.secondary};
`;
const Value = styled(Typography)`
  font-weight: bold;
`;

const UnstyledLink = styled('a')`
  text-decoration: none;
  color: inherit;
`;

const Image = styled('img')`
  width: 60px;
  height: auto;
  margin-right: 10px;
`;

const Status = styled('div')`
  position: absolute;
  top: 20px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const calcTotalCost = (repairs: any, fixes: any) => {
  let total = 0;
  repairs.forEach((repair: any) => {
    total += parseFloat(repair?.sellPrice + repair.repairingPrice);
  });
  fixes.forEach((fix: any) => {
    total += parseFloat(fix.price);
  });
  return total;
};

const calcExpectedTime = (repairs: any, fixes: any) => {
  let total = 0;
  repairs.forEach((repair: any) => {
    total += parseInt(repair?.repairingTimeMinutes);
  });
  fixes.forEach((fix: any) => {
    total += parseInt(fix?.repairingTimeMinutes, 0);
  });
  return total;
};

const calcVat = (total: number, vatPercentage: number) => {
  return (total * vatPercentage) / 100;
};

export default function ReviewOrder({
  user,
  devices,
  repairs,
  fixes,
  problems,
  userNote,
  maintenanceNote,
  expectedDateToFix,
  status,
  fixOrderId,
  discount,
  setDiscount,
}: {
  user: User | null;
  devices: any;
  repairs: any;
  fixes: any;
  problems: any;
  userNote: string;
  maintenanceNote: string;
  expectedDateToFix: string;
  status: string;
  fixOrderId: string | undefined;
  discount: number;
  setDiscount: any;
}) {
  const { data: settings } = useSettings();
  const createMutation = useCreateFixOrder();
  const subTotalCost = useMemo(
    () => calcTotalCost(repairs, fixes) - (parseInt(discount.toString()) || 0),
    [repairs, fixes, discount]
  );

  const vat = useMemo(
    () => calcVat(subTotalCost, settings?.vatPercentage || 0),
    [subTotalCost, settings?.vatPercentage]
  );

  const totalCost = useMemo(() => subTotalCost + vat, [subTotalCost, vat]);

  const totalTimeToFix = useMemo(
    () => calcExpectedTime(repairs, fixes),
    [repairs, fixes]
  );

  const handleSave = () => {
    createMutation.mutate({
      id: fixOrderId,
      user: user,
      status,
      userNote,
      maintenanceNote,
      expectedDateToFix,
      problems,
      devices: devices,
      repairs: repairs,
      fixes: fixes,
      price: subTotalCost,
      timeToFixMinutes: calcExpectedTime(repairs, fixes),
      vat: vat,
      totalPrice: totalCost,
    });
  };
  return (
    <Container>
      <Title>{`REVIEW ORDER`} </Title>
      <div>
        <Value>Status: {status}</Value>
      </div>
      <Status>
        <Button onClick={handleSave} variant='contained' color='primary'>
          Save
        </Button>
      </Status>
      {user && (
        <Section>
          <SectionTitle>Customer</SectionTitle>
          <LabelValue>
            <Label>
              <FiUser />
            </Label>
            <Value>{user?.name}</Value>
          </LabelValue>
          <UnstyledLink href={`mailto:${user?.email}`}>
            <LabelValue>
              <Label>
                <FiMail />
              </Label>
              <Value>{user?.email}</Value>
            </LabelValue>
          </UnstyledLink>
          <UnstyledLink href={`tel:${user?.tel}`}>
            <LabelValue>
              <Label>
                <FiPhone />
              </Label>
              <Value>{user?.tel}</Value>
            </LabelValue>
          </UnstyledLink>
        </Section>
      )}

      {devices.length > 0 && (
        <Section>
          <SectionTitle>Devices</SectionTitle>
          {devices.map((device: any) => (
            <LabelValue key={device.id}>
              <Label>
                <Image src={device?.image} alt='repair' />
              </Label>
              <Value>{device.name}</Value>
            </LabelValue>
          ))}
        </Section>
      )}
      {problems.length > 0 && (
        <Section>
          <SectionTitle>Problems</SectionTitle>
          {problems.map((problem: any, index: number) => (
            <LabelValue key={index}>
              <Label>{`${index + 1}-`}</Label>
              <Value>{problem}</Value>
            </LabelValue>
          ))}
        </Section>
      )}
      {repairs.length > 0 && (
        <Section>
          <SectionTitle>Repairs</SectionTitle>
          {repairs.map((repair: any, index: number) => (
            <Stack direction={'row'} alignItems={'center'} marginBottom={2}>
              {repair?.image ? (
                <Image src={repair?.image} alt='repair' />
              ) : (
                <Avatar>{repair.name.charAt(0).toUpperCase()}</Avatar>
              )}

              <div className='w-full ml-3'>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  style={{ width: '100%' }}
                >
                  <div>
                    <Typography variant='body2'>{repair.name}</Typography>
                  </div>
                  <div>
                    <Typography variant='body2'>
                      {parseFloat(
                        repair?.sellPrice + repair.repairingPrice
                      ).toFixed(2)}
                      {settings?.currencySymbol}
                    </Typography>
                  </div>
                </Stack>
              </div>
            </Stack>
          ))}
        </Section>
      )}
      {fixes.length > 0 && (
        <Section>
          <SectionTitle>Fixes</SectionTitle>
          {fixes.map((fix: any, index: number) => (
            <Stack
              direction={'row'}
              alignItems={'center'}
              marginBottom={2}
              gap={2}
            >
              <Avatar>{fix.name?.length > 0 ? fix.name[0] : 'F'}</Avatar>
              <div className='w-full'>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  style={{ width: '100%' }}
                >
                  <div>
                    <Typography variant='body2'>{fix.name}</Typography>
                  </div>
                  <div>
                    <Typography variant='body2'>
                      {parseFloat(fix.price).toFixed(2)}{' '}
                      {settings?.currencySymbol}
                    </Typography>
                  </div>
                </Stack>
              </div>
            </Stack>
          ))}
        </Section>
      )}

      <Section>
        <Divider />

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          marginTop={2}
        >
          <Label>Discount</Label>
          <Value>
            <TextField
              value={discount}
              onChange={(e) => setDiscount(parseInt(e.target.value))}
              placeholder='Discount'
              style={{
                textAlign: 'right',
              }}
              type='number'
            />
          </Value>
        </Stack>

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          marginTop={2}
        >
          <Label>Sub Total</Label>
          <Value>
            {subTotalCost} {settings?.currencySymbol}
          </Value>
        </Stack>

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          marginTop={2}
        >
          <Label>{`VAT(${settings?.vatPercentage}%)`}</Label>
          <Value>
            {vat}
            {settings?.currencySymbol}
          </Value>
        </Stack>

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          marginTop={2}
        >
          <Label>TOTAL</Label>
          <Value>
            {totalCost} {settings?.currencySymbol}
          </Value>
        </Stack>

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          marginTop={2}
        >
          <Label>Expected Time To Fix</Label>
          <Value>{totalTimeToFix} Min</Value>
        </Stack>
      </Section>
    </Container>
  );
}
