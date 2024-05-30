import SlideModal from '@/shared/modals/SlideModal';
import { Typography, styled } from '@mui/material';
import React from 'react';

import { MdMarkEmailRead } from 'react-icons/md';

const Container = styled('div')`
  padding: 30px;
  text-align: center;
`;

const IconContainer = styled('div')`
  font-size: 100px;
  padding: 20px 0;
`;
export default function SuccessModel({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <SlideModal open={open} setOpen={setOpen}>
      <Container>
        <IconContainer>
          <MdMarkEmailRead color='#4caf50' />
        </IconContainer>
        <Typography variant='h4' fontWeight={'bold'}>
          Email Sent Successfully!
        </Typography>
      </Container>
    </SlideModal>
  );
}
