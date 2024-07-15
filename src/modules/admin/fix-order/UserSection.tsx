import { useSearchUsers, useSearchUsersByName } from '@/hooks/admin/useUsers';
import InputWithSugession from '@/shared/inputs/InputWithSugession';
import { Button, FormControl, styled, Typography } from '@mui/material';
import { User } from 'prisma/prisma-client';
import React, { useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import NewUserForm from './NewUserForm';

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

const Title = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const InputContainer = styled(FormControl)`
  width: 100%;
`;
export default function UserSection({
  user,
  setUser,
}: {
  user: User | null;
  setUser: (user: any) => void;
}) {
  const [usernameKey, setUsernameKey] = React.useState('');
  const { data } = useSearchUsersByName(usernameKey);
  const [displayNewUserForm, setDisplayNewUserForm] = React.useState(false);

  useEffect(() => {
    if (user) {
      setUsernameKey(user?.name);
    }
  }, [user]);

  return (
    <Container>
      <Title>Customer</Title>
      <InputContainer>
        <InputWithSugession
          label='name'
          value={usernameKey}
          onChange={(e) => setUsernameKey(e.target.value)}
          placeholder='Customer Name'
          suggestions={data || []}
          onSelectSuggesstion={(suggestion: any) => {
            setUsernameKey(suggestion?.description);
            setUser(suggestion);
          }}
          icon={<FiUser />}
        />
      </InputContainer>

      <Button
        onClick={() => {
          setDisplayNewUserForm(!displayNewUserForm);
        }}
      >
        {displayNewUserForm ? 'Cancel' : 'New User'}
      </Button>
      {displayNewUserForm && (
        <NewUserForm user={null} onSubmit={(us: any) => setUser(us)} />
      )}
    </Container>
  );
}
