import {
  useCreateOrderStep,
  useGoBackStep,
  useUpdateOrderStep,
} from '@/hooks/admin/useOrderStep';
import { Box, Button, TextField, styled } from '@mui/material';
import { Stack } from '@mui/system';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale';
import { OrderStep } from 'prisma/prisma-client';
import { useEffect, useState } from 'react';

const DatesContainer = styled(Box)`
  display: flex;
  gap: 10px;
`;
export default function StepForm({
  index,
  step,
  title,
  orderId,
  isFirst,
}: {
  index: number;
  step: OrderStep;
  title: string;
  orderId: string;
  isFirst: boolean;
}) {
  const [date, setDate] = useState<any>(new Date());
  const [time, setTime] = useState<any>(new Date());
  const [comment, setComment] = useState<any>('');
  const createMutation = useCreateOrderStep();
  const updateMutation = useUpdateOrderStep();
  const goBackMutation = useGoBackStep();

  useEffect(() => {
    if (step) {
      step?.date && setDate(new Date(step?.date));
      setTime(step.time);
      setComment(step.comment);
    }
  }, [step]);

  const onSave = async () => {
    let saved = null;
    const data: any = {
      id: step.id || '',
      name: step.name,
      orderId: step.orderId,
      date,
      time,
      comment,
      index,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (step?.id) {
      saved = await updateMutation.mutateAsync(data);
    } else {
      saved = await createMutation.mutateAsync(data);
    }
  };

  const onGoBack = async () => {
    let saved = null;
    const data: any = {
      orderId,
      stepId: step.id,
    };

    saved = await goBackMutation.mutateAsync(data);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <DatesContainer>
          <DatePicker
            sx={{
              width: '100%',
            }}
            onChange={(d) => setDate(d)}
            value={date}
          />

          <TimePicker
            onChange={(t: any) => {
              setTime(t);
            }}
            value={time}
            timeSteps={{
              hours: 1,
              minutes: 30,
            }}
          />
        </DatesContainer>

        <TextField
          label='Comment'
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Stack direction={'row'} spacing={2} marginY={2}>
          {isFirst ? null : (
            <Button onClick={onGoBack} variant='contained' color='primary'>
              Back
            </Button>
          )}
          <Button onClick={onSave} variant='contained' color='primary'>
            Done
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
