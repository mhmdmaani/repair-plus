import SlideModal from '@/shared/modals/SlideModal';
import React from 'react';

export default function RepairPopUp({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <SlideModal open={open} setOpen={setOpen}>
      {children}
    </SlideModal>
  );
}
