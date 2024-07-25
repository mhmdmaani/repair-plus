'use client';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import {
  Button,
  Container,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  styled,
} from '@mui/material';
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

export default function SettingsPage() {
  const [currency, setCurrency] = useState('£');
  const [currencySymbol, setCurrencySymbol] = useState('GBP');
  const [vatPercentage, setVatPercentage] = useState('0');
  const [contactPhone, setContactPhone] = useState('0123456789');
  const [contactEmail, setContactEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedIn] = useState('');
  const [youtube, setYoutube] = useState('');
  const [displayEmailInSeperatePage, setDisplayEmailInSeperatePage] =
    useState(false);
  const { data } = useSettings();

  const updateMutation = useUpdateSettings();

  const onUpdate = () => {
    updateMutation.mutate({
      id: data?.id,
      currency,
      currencySymbol,
      vatPercentage: Number(vatPercentage),
      contactPhone,
      contactEmail,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      displayEmailInSeperatePage,
    });
  };

  useEffect(() => {
    if (data) {
      setCurrency(data.currency);
      setCurrencySymbol(data.currencySymbol);
      setVatPercentage(data.vatPercentage.toString());
      setContactPhone(data.contactPhone);
      setContactEmail(data.contactEmail);
      setFacebook(data.facebook);
      setInstagram(data.instagram);
      setTwitter(data.twitter);
      setLinkedIn(data.linkedin);
      setYoutube(data.youtube);
      setDisplayEmailInSeperatePage(data.displayEmailInSeperatePage);
    }
  }, [data]);

  return (
    <Container>
      <Typography sx={{ marginY: 1 }} variant='h5'>
        Settings
      </Typography>
      <FormContainer>
        <FeildContainer>
          <TextField
            label='Currency'
            variant='outlined'
            fullWidth
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </FeildContainer>
        <FeildContainer>
          <TextField
            label='Currency Symbol'
            variant='outlined'
            fullWidth
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
          />
        </FeildContainer>
        <FeildContainer>
          <TextField
            label='VAT Percentage'
            variant='outlined'
            fullWidth
            value={vatPercentage}
            onChange={(e) => setVatPercentage(e.target.value)}
            type='number'
          />
        </FeildContainer>
        <FeildContainer>
          <TextField
            label='Contact Phone'
            variant='outlined'
            fullWidth
            value={contactPhone}
            type='tel'
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </FeildContainer>
        <FeildContainer>
          <TextField
            label='Contact Email'
            variant='outlined'
            fullWidth
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </FeildContainer>
        <FeildContainer>
          <TextField
            label='Facebook'
            variant='outlined'
            fullWidth
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </FeildContainer>
        <FeildContainer>
          <TextField
            label='Instagram'
            variant='outlined'
            fullWidth
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </FeildContainer>
        <FeildContainer>
          <TextField
            label='Twitter'
            variant='outlined'
            fullWidth
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </FeildContainer>
        <FeildContainer>
          <TextField
            label='LinkedIn'
            variant='outlined'
            fullWidth
            value={linkedin}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
        </FeildContainer>
        <FeildContainer>
          <TextField
            label='Youtube'
            variant='outlined'
            fullWidth
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
          />
        </FeildContainer>

        <FeildContainer>
          <FormControlLabel
            control={
              <Switch
                color='success'
                checked={displayEmailInSeperatePage}
                onChange={(e) =>
                  setDisplayEmailInSeperatePage(e.target.checked)
                }
              />
            }
            label='Display Email Form in Seperate Page'
          />
        </FeildContainer>

        <FeildContainer>
          <Button
            sx={{
              padding: '10px',
            }}
            variant='contained'
            onClick={onUpdate}
          >
            Save
          </Button>
        </FeildContainer>
      </FormContainer>
    </Container>
  );
}
