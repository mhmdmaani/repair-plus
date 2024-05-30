import { useSuggestedPlaces } from '@/hooks/useSuggestedPlaces';
import { useStateValue } from '@/providers/StateContext';
import InputWithSugession from '@/shared/inputs/InputWithSugession';
import { Button, Grid, TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import SelectDate from './SelectDate';
import { useCityAndPostalCodeByPlaceId } from '@/hooks/useCityAndPostalCodeByPlaceId';

const FeildContainer = styled(Grid)`
  padding: 10px;
  @media (max-width: 1000px) {
    padding: 5px;
    width: 100%;
  }
`;

export default function DropoffForm({
  onSubmit,
}: {
  onSubmit: (d: any) => void;
}) {
  const { state, dispatch } = useStateValue();
  const {
    delivery,
    deliveryDates,
    deliveryCity,
    deliveryPostalCode,
    destinationObj,
  } = state;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [info, setInfo] = useState('');

  const { placePredictions } = useSuggestedPlaces(address);
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const { city: cityFromPlace, postalCode: postalCodeFromPlace } =
    useCityAndPostalCodeByPlaceId(destinationObj?.place_id);

  useEffect(() => {
    if (destinationObj) {
      setAddress(destinationObj.description);
    }
  }, [destinationObj]);

  useEffect(() => {
    if (delivery) {
      setName(delivery.name);
      setPhone(delivery.phone);
      setCity(delivery.city);
      setPostal(delivery.postal);
      setInfo(delivery.info);
    }
  }, [delivery]);

  useEffect(() => {
    if (deliveryCity) {
      setCity(deliveryCity);
    }
    if (deliveryPostalCode) {
      setPostal(deliveryPostalCode);
    }
  }, [deliveryCity, deliveryPostalCode]);

  useEffect(() => {
    setCity(cityFromPlace);
    setPostal(postalCodeFromPlace);
  }, [cityFromPlace, postalCodeFromPlace]);

  return (
    <Grid container>
      <FeildContainer item sm={12} md={12} lg={12} padding={2}>
        <SelectDate
          onChange={(t: any) =>
            dispatch({ type: 'SET_DELIVERY_DATE', payload: t })
          }
          values={deliveryDates}
          displayASAP
        />
      </FeildContainer>
      <FeildContainer item sm={12} md={12} lg={12} padding={2}>
        <InputWithSugession
          value={address}
          onChange={onChangeAddress}
          placeholder='Dropoff'
          suggestions={placePredictions}
          onSelectSuggesstion={(suggestion: any) => {
            setAddress(suggestion?.description);
            dispatch({
              type: 'SET_DESTINATION_OBJ',
              payload: suggestion,
            });
          }}
          icon={
            <img
              src='./dropoff.png'
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          }
        />
      </FeildContainer>

      <FeildContainer item sm={12} md={6} lg={6} padding={2}>
        <TextField
          value={city}
          onChange={(e) => setCity(e.target.value)}
          label='Town/City'
          variant='outlined'
          fullWidth
        />
      </FeildContainer>

      <FeildContainer item sm={12} md={6} lg={6} padding={2}>
        <TextField
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          label='Post Code'
          variant='outlined'
          fullWidth
        />
      </FeildContainer>

      <FeildContainer item sm={12} md={6} lg={6} padding={2}>
        <TextField
          label='Name'
          variant='outlined'
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer item sm={12} md={6} lg={6} padding={2}>
        <TextField
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label='Phone'
          variant='outlined'
          fullWidth
          type='tel'
        />
      </FeildContainer>
      <FeildContainer item sm={12} md={12} lg={12} padding={2}>
        <TextField
          label='Company Name'
          variant='outlined'
          fullWidth
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </FeildContainer>
      <FeildContainer item sm={12} md={12} lg={12} padding={2}>
        <TextField
          label='Additional Info'
          variant='outlined'
          fullWidth
          multiline
          rows={3}
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
      </FeildContainer>

      <FeildContainer item sm={12} md={12} lg={12} padding={2}>
        <Button
          onClick={() =>
            onSubmit({
              name: name,
              phone: phone,
              city: city,
              postal: postal,
              address: address,
              info: info,
            })
          }
          disabled={!name || !phone || !city || !postal || !address}
          variant='contained'
          fullWidth
        >
          <Typography variant='button'>Confirm</Typography>
          Confirm
        </Button>
      </FeildContainer>
    </Grid>
  );
}
