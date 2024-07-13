import React from 'react';
import { styled, Typography } from '@mui/material';
import { FiMail, FiPhone, FiUser, FiVoicemail } from 'react-icons/fi';
import { User } from 'prisma/prisma-client';
const Container = styled('div')`
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
}) {
  return (
    <Container>
      <Title>{`REVIEW ORDER`} </Title>
      {user && (
        <Section>
          <SectionTitle>
            <FiUser />
            Customer
          </SectionTitle>
          <LabelValue>
            <Label>Name:</Label>
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
    </Container>
  );
}
