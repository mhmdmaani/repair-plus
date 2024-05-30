'use client';
import { Button, Grid, Typography, styled } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ItemContainerProps {
  selected?: boolean;
}

const ItemContaine = styled('div')<ItemContainerProps>`
  flex-direction: column;
  display: flex;
  padding: 10px;
  position: relative;
  border-bottom: 2px solid
    ${(props) =>
      props.selected
        ? props.theme.palette.mode === 'dark'
          ? props.theme.palette.info.main
          : props.theme.palette.common.black
        : '#efebe9'};
  margin-bottom: 40px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 15px;
  width: 100%;
  &:hover img {
    transform: translate(10px, 0);
    filter: none;
  }
  @media (max-width: 1700px) {
    flex-direction: column;
  }
  @media (max-width: 1000px) {
    padding: 5px;
    border-bottom: 1px solid
      ${(props) =>
        props.selected ? props.theme.palette.primary.main : '#efebe9'};
    margin-bottom: 10px;
  }
`;
const ImageContainer = styled('div')`
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 1700px) {
    justify-content: center;
    height: auto;
  }
  @media (max-width: 1000px) {
    height: auto;
    display: flex;
    align-items: center;
    border-radius: 8px;
  }
`;
const Image = styled('img')`
  width: 70%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  filter: grayscale(100%);
  @media (max-width: 1000px) {
    height: auto;
  }
`;
const ContentSection = styled('div')`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 1000px) {
    padding: 5px;
  }
`;

const Title = styled(Typography)`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 25px;
  font-weight: bolder;
  margin: 10px 0;
  @media (max-width: 1000px) {
    font-size: 16px;
    margin: 5px 0;
  }
`;
const LabelValue = styled(Typography)`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 10px 0;
  @media (max-width: 1000px) {
    gap: 10px;
    padding: 5px;
    margin: 0;
    font-size: 10px;
  }
`;

const Label = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.grey[600]};
  @media (max-width: 1000px) {
    font-size: 12px;
  }
`;
const Value = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.common.white
      : props.theme.palette.common.black};
  font-weight: bolder;
  @media (max-width: 1000px) {
    font-size: 12px;
  }
`;

const Price = styled(Typography)`
  color: ${(props) => props.theme.palette.success.main};
  font-size: 30px;
  font-weight: bolder;
  text-align: left;
  width: 100%;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;
export default function FleetItem({
  name,
  width,
  height,
  length,
  maxLoad,
  carries = '14x Standard Pallets',
  price = '£100',
  selected,
  image,
  style,
}: {
  name: string;
  width: string;
  height: string;
  length: string;
  maxLoad: string;
  carries: string;
  price: string;
  selected?: boolean;
  onClick?: () => void;
  image?: string;
  style?: any;
}) {
  const router = useRouter();
  const onBook = () => {
    router.push('/quote');
  };
  return (
    <ItemContaine style={style}>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <Title>{name}</Title>
      <ContentSection>
        <Grid container>
          <Grid item sm={6} md={12} lg={6}>
            <LabelValue>
              <Label>Length:</Label>
              <Value>{length}M</Value>
            </LabelValue>
          </Grid>
          <Grid item sm={6} md={12} lg={6}>
            <LabelValue>
              <Label>Height:</Label>
              <Value>{height}M</Value>
            </LabelValue>
          </Grid>

          <Grid item sm={6} md={12} lg={6}>
            <LabelValue>
              <Label>Width:</Label>
              <Value>{width}M</Value>
            </LabelValue>
          </Grid>
          <Grid item sm={6} md={12} lg={6}>
            <LabelValue>
              <Label>Load:</Label>
              <Value>{maxLoad}KG</Value>
            </LabelValue>
          </Grid>
          <Grid item xs={12}>
            <LabelValue>
              <Label>Carries</Label>
              <Value>{carries}</Value>
            </LabelValue>
          </Grid>
          <Grid item xs={12}>
            <LabelValue>
              <Price>{price}</Price>
            </LabelValue>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={onBook}
              fullWidth
              variant='contained'
              color='primary'
            >
              <Typography variant='h6' color='inherit' fontWeight={'bold'}>
                Book a Quote
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </ContentSection>
    </ItemContaine>
  );
}
