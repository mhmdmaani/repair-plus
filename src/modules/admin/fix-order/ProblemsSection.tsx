import {
  FormControl,
  List,
  ListItem,
  styled,
  TextField,
  Typography,
} from '@mui/material';
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
  margin-top: 20px;
`;

const Title = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const InputContainer = styled(FormControl)`
  width: 100%;
`;
export default function ProblemsSection({
  problems,
  setProblems,
}: {
  problems: String[] | [];
  setProblems: (user: any) => void;
}) {
  const [newProblem, setNewProblem] = React.useState('');
  return (
    <Container>
      <Title>Problems</Title>
      <InputContainer>
        <TextField
          label='name'
          value={newProblem}
          onChange={(e) => setNewProblem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setProblems([...problems, newProblem]);
              setNewProblem('');
            }
          }}
          placeholder='New Problem'
        />
      </InputContainer>
      <List>
        {problems.map((problem, index) => (
          <ListItem key={index}>{problem}</ListItem>
        ))}
      </List>
    </Container>
  );
}
