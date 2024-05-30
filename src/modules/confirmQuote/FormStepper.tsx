'use client';
import { useStateValue } from '@/providers/StateContext';
import {
  Box,
  Step,
  StepButton,
  StepConnector,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import CollectionForm from './CollectionForm';
import DropoffForm from './DropoffForm';
import WayPointForm from './WaypointForm';

const StepIconContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.palette.background.paper};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  box-shadow: 0px 0px 2px 0px #00000040;
`;

const CustomConnector = styled(StepConnector)({
  marginLeft: 20,
});

const CustomContent = styled(StepContent)({
  marginLeft: 20,
  paddingLeft: 20,
});

export default function FormStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const { state, dispatch } = useStateValue();
  const {
    originObj,
    destinationObj,
    waypoints,
    selectedVan,
    directions,
    start,
    end,
    path,
    collection,
    collectionDates,
    delivery,
    deliveryDates,
  } = state;

  return (
    <Box>
      <Stepper
        activeStep={currentStep}
        orientation='vertical'
        connector={<CustomConnector />}
      >
        <Step key={1}>
          <StepButton color='inherit' onClick={() => setCurrentStep(0)}>
            <StepLabel
              StepIconComponent={() => (
                <StepIconContainer>
                  {currentStep > 0 ? (
                    <FiCheckCircle size={20} color='#4caf50' />
                  ) : (
                    <img
                      src='./weightIcon.png'
                      style={{
                        width: '20px',
                      }}
                    />
                  )}
                </StepIconContainer>
              )}
            >
              {'Collection Details'}
            </StepLabel>
          </StepButton>

          <CustomContent>
            <CollectionForm
              onSubmit={(dt) => {
                dispatch({ type: 'SET_COLLECTION', payload: dt });
                setCurrentStep(currentStep + 1);
              }}
            />
          </CustomContent>
        </Step>
        {waypoints?.map((waypoint: any, index: number) => (
          <Step key={index + 1}>
            <StepButton
              color='inherit'
              onClick={() => setCurrentStep(index + 1)}
            >
              <StepLabel
                StepIconComponent={() => (
                  <StepIconContainer>
                    {currentStep > index + 1 ? (
                      <FiCheckCircle size={20} color='#4caf50' />
                    ) : (
                      <Typography>{index + 1}</Typography>
                    )}
                  </StepIconContainer>
                )}
              >{` Stop (${index + 1})`}</StepLabel>
            </StepButton>

            <CustomContent>
              <WayPointForm
                onSubmit={(dt) => {
                  setCurrentStep(currentStep + 1);
                }}
              />
            </CustomContent>
          </Step>
        ))}

        <Step key={4}>
          <StepButton
            color='inherit'
            onClick={() => setCurrentStep(waypoints?.length + 1)}
          >
            <StepLabel
              StepIconComponent={() => (
                <StepIconContainer>
                  {currentStep > waypoints?.length ? (
                    <FiCheckCircle size={20} color='#4caf50' />
                  ) : (
                    <img
                      src='./dist.png'
                      style={{
                        width: '20px',
                      }}
                    />
                  )}
                </StepIconContainer>
              )}
            >
              {'Dropoff Details'}
            </StepLabel>
          </StepButton>

          <CustomContent>
            <DropoffForm
              onSubmit={function (d: any): void {
                dispatch({ type: 'SET_DELIVERY', payload: d });
                setCurrentStep(currentStep + 1);
              }}
            />
          </CustomContent>
        </Step>
      </Stepper>
    </Box>
  );
}
