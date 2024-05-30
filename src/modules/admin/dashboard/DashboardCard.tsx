'use client';
import { Button, Card, Typography, styled } from '@mui/material';
import Link from 'next/link';

const Container = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const IconContainer = styled('div')`
  font-size: 3rem;
  color: ${(props) => props.theme.palette.primary.main};
`;
const CustomButton = styled(Button)`
  width: 100%;
`;
export default function DashboardCard({
  icon,
  title,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  link: string;
}) {
  return (
    <Container>
      <IconContainer>{icon}</IconContainer>
      <Typography variant='h6'>{title}</Typography>
      <Link
        href={link}
        style={{
          width: '100%',
        }}
      >
        <CustomButton fullWidth>View</CustomButton>
      </Link>
    </Container>
  );
}
