import React from 'react';
import { FormControl, styled, TextField, Typography } from '@mui/material';

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

export default function NoteSection({
  title,
  label,
  placeholder,
  value,
  onChange,
}: {
  title: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <Container>
      <Title>{title}</Title>
      <InputContainer>
        <TextField
          multiline
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          fullWidth
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </InputContainer>
    </Container>
  );
}
