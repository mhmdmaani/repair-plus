// pages/login.tsx
'use client';
import { Button, Card, TextField, Typography, styled } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, FormEvent } from 'react';

const MainContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const CustomCard = styled(Card)`
  width: 50%;
  min-width: 200px;
`;
const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid #000;
  border-radius: 5px;
  width: 100%;
`;
const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/admin/dashboard');
  }, [session, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (!result?.error) {
      router.push('/admin/dashboard');
    } else {
      router.push('/auth');
      console.error(result.error);
    }
  };

  return (
    <MainContainer>
      <CustomCard>
        <FormContainer onSubmit={handleSubmit}>
          <Typography variant='h4'>Login</Typography>
          <TextField name='username' type='text' required />
          <TextField name='password' type='password' required />
          <Button type='submit'>Login</Button>
        </FormContainer>
      </CustomCard>
    </MainContainer>
  );
};

export default Login;
