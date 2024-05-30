import { useStateValue } from '@/providers/StateContext';
import SlideModal from '@/shared/modals/SlideModal';
import { getDurationAndDistance } from '@/utils/getDurationAndDistance';
import { Box, styled } from '@mui/material';
import { Settings, TruckType } from 'prisma/prisma-client';
import * as React from 'react';
import SelectVan from '../CreateQuote/SelectVan';

const MainContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Container = styled('div')`
  width: 50vw;
  max-width: 700px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
export default function SelectTruckModel({
  open,
  setOpen,
  truckTypes,
  settings,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  truckTypes: TruckType[];
  settings: Settings;
}) {
  const { state, dispatch } = useStateValue();
  const { directions, selectedVan } = state;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <SlideModal open={open} setOpen={setOpen}>
        <MainContainer>
          <SelectVan
            selectedItem={selectedVan}
            setSelectedItem={(d: any) => {
              dispatch({
                type: 'SET_SELECTED_VAN',
                payload: d,
              });
              setOpen(false);
            }}
            vans={truckTypes}
            period={getDurationAndDistance(directions)?.duration}
            settings={settings}
          />
        </MainContainer>
      </SlideModal>
    </React.Fragment>
  );
}
