import {
  Avatar,
  StepConnector,
  Typography,
  stepConnectorClasses,
  styled,
} from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { format } from 'date-fns';
import { OrderStep, StopPoint } from 'prisma/prisma-client';
import * as React from 'react';
import { FaTruck } from 'react-icons/fa6';
import { FiCalendar, FiCheckCircle, FiClock } from 'react-icons/fi';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  fontWeight: 'bold',
}));

const DatesContainer = styled(Box)`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const DateItem = styled(Box)`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CommentContainer = styled(Box)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 0;
`;

const StepIconRender = (
  index: number,
  activeStepIndex: number,
  stepsLength: number
) => {
  if (index <= activeStepIndex) {
    return <FiCheckCircle color={'green'} size={30} />;
  }
  if (index === 0) {
    return <FaTruck size={30} />;
  }
  if (index === 1) {
    return <Avatar src='../../pickup.png'></Avatar>;
  }
  if (index >= stepsLength - 1) {
    return <Avatar src='../../dropoff.png'></Avatar>;
  }

  return <Avatar>{index - 1}</Avatar>;
};

export default function ForClientOrderStatus({
  stopPoints,
  steps,
  orderId,
}: {
  stopPoints: StopPoint[];
  steps: OrderStep[];
  orderId: string;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  React.useEffect(() => {
    const currentStep = steps.find((step) => step.isCurrent);
    if (currentStep) {
      setActiveStep(currentStep.index);
    }
  }, [steps]);
  return (
    <Box
      sx={{
        paddingRight: '10px',
      }}
    >
      <Stepper
        activeStep={activeStep}
        orientation='vertical'
        connector={<QontoConnector />}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            sx={{
              width: '100%',
            }}
          >
            <CustomStepLabel
              StepIconComponent={() =>
                StepIconRender(step.index, activeStep, steps.length)
              }
            >
              {step.name}
            </CustomStepLabel>
            <StepContent>
              <DatesContainer>
                <DateItem>
                  <FiCalendar size={20} />
                  <Typography variant='caption' color={'GrayText'}>
                    {step.date}
                  </Typography>
                </DateItem>

                <DateItem>
                  <FiClock size={20} />
                  <Typography variant='caption' color={'GrayText'}>
                    {format(new Date(step.time as string), 'hh:mm')}
                  </Typography>
                </DateItem>
              </DatesContainer>
              {step.comment && step.comment !== '' && (
                <CommentContainer>
                  <Typography variant='caption'>{step.comment}</Typography>
                </CommentContainer>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
