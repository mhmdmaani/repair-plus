'use client';
import { useCreateOffer, useUpdateOffer } from '@/hooks/admin/useOffers';
import {
  Button,
  FormControlLabel,
  Switch,
  TextField,
  styled,
} from '@mui/material';
import { addMonths } from 'date-fns';
import { Offer } from 'prisma/prisma-client';
import { useEffect, useState } from 'react';

const FormContainer = styled('div')`
  border: 2px solid #efebe9;
  padding: 10px;
  border-radius: 16px;
  @media (max-width: 1000px) {
    border: none;
  }
`;

const FeildContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  @media (max-width: 1000px) {
    gap: 5px;
  }
`;
export default function OfferForm({
  offer,
  onAdd,
}: {
  offer?: Offer | null;
  onAdd?: (a: any) => void;
}) {
  const updateMutation = useUpdateOffer();
  const createMutation = useCreateOffer();
  const [title, setTitle] = useState('');
  const [summery, setSummery] = useState('');
  const [content, setContent] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [from, setFrom] = useState(new Date().toISOString().slice(0, 16));
  const [to, setTo] = useState(
    addMonths(new Date(), 1).toISOString().slice(0, 16)
  );
  const [isPercent, setIsPercent] = useState(false);
  const [amount, setAmount] = useState('0');
  const [percent, setPercent] = useState('0');
  const [displayTime, setDisplayTime] = useState(false);

  useEffect(() => {
    if (offer) {
      setTitle(offer.title);
      setSummery(offer.summery);
      setContent(offer.content);
      setIsActive(offer.isActive);
    }
  }, [offer]);

  const onSave = async () => {
    let saved = null;
    const data: any = {
      id: offer?.id || '',
      title,
      summery,
      content,
      isActive,
      from: new Date(from),
      to: new Date(to),
      isPercent,
      amount: isPercent ? 0 : Number(amount),
      percent: isPercent ? Number(percent) : 0,
      displayTimer: displayTime,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (offer?.id) {
      const saved = await updateMutation.mutate(data);
      // refetch trcuks
      //  refetch();
      onAdd && onAdd(data);
    } else {
      // create
      const saved = await createMutation.mutate(data, {
        onSuccess: (data) => {
          onAdd && onAdd(data);
        },
      });
    }
  };

  return (
    <FormContainer>
      <FeildContainer>
        <TextField
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer>
        <TextField
          label='Summery'
          value={summery}
          onChange={(e) => setSummery(e.target.value)}
          type='text'
          multiline
          rows={3}
        />
        <TextField
          label='Content'
          multiline
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type='text'
        />

        <TextField
          label='From'
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          type='dateTime-local'
          defaultValue={new Date().toISOString()}
        />
        <TextField
          label='To'
          value={to}
          onChange={(e) => setTo(e.target.value)}
          type='dateTime-local'
          defaultValue={new Date().toISOString()}
        />

        <FormControlLabel
          control={
            <Switch
              color='success'
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label='Active'
        />

        <FormControlLabel
          control={
            <Switch
              color='success'
              checked={displayTime}
              onChange={(e) => setDisplayTime(e.target.checked)}
            />
          }
          label='Display Timer'
        />

        <FormControlLabel
          control={
            <Switch
              color='primary'
              checked={isPercent}
              onChange={(e) => setIsPercent(e.target.checked)}
            />
          }
          label='Is Percentage'
        />
        {isPercent ? (
          <TextField
            label='Precent'
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            type='number'
            inputProps={{ min: 0, max: 100 }}
          />
        ) : (
          <TextField
            label='Discount Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type='number'
            inputProps={{ min: 0 }}
          />
        )}

        <Button variant='contained' onClick={onSave}>
          Submit
        </Button>
      </FeildContainer>
    </FormContainer>
  );
}
