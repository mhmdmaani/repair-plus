import { IconButton, styled, useMediaQuery } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { FiX } from 'react-icons/fi';

const XContainer = styled('div')`
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
`;
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function SlideModal({
  open,
  setOpen,
  children,
  title,
  fullScreen = false,
}: {
  open: boolean;
  setOpen: any;
  children: any;
  ActionButtons?: any;
  title?: string;
  fullScreen?: boolean;
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const isSmaller = useMediaQuery('(max-width:600px)');

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          minWidth: isSmaller ? 'none' : 500,
        },
      }}
    >
      <XContainer>
        <IconButton color='warning' onClick={handleClose}>
          <FiX size={30} color='red' />
        </IconButton>
      </XContainer>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          {children}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
