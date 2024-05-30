'use client';
import { useCreateTerm, useTerm } from '@/hooks/admin/useTerm';
import { Button, Container, Typography } from '@mui/material';
import ReactQuill from 'react-quill';

import { useEffect, useState } from 'react';

export default function Term() {
  const { data, isLoading } = useTerm();
  const saveMutation = useCreateTerm();
  const [currentTerm, setCurrentTerm] = useState<any>('my <b>HTML</b>');

  useEffect(() => {
    if (data) {
      setCurrentTerm(data?.content);
    } else {
      setCurrentTerm('');
    }
  }, [data]);

  return (
    <Container>
      <Typography variant='h4'>Terms & Conditions</Typography>
      <ReactQuill
        value={currentTerm}
        onChange={setCurrentTerm}
        style={{
          height: '500px',
          backgroundColor: 'white',
        }}
      />
      <Button
        onClick={() =>
          saveMutation.mutate({
            content: currentTerm,
          })
        }
      >
        Save
      </Button>
    </Container>
  );
}
