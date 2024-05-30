import { useCurrentOffer } from '@/hooks/admin/useOffers';
import SlideModal from '@/shared/modals/SlideModal';
import { Button, Typography, styled } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const Container = styled('div')`
  width: 100%;
  padding: 20px;
  border: 2px solid ${(props) => props.theme.palette.success.main};
  border-radius: 16px;
  margin-top: 20px;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const TitleRow = styled('div')`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  align-items: center;
`;
const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
export default function PriceMatchNote() {
  const { data, isLoading } = useCurrentOffer();
  const [displayContent, setDisplayContent] = useState(false);
  const [timeDiff, setTimeDiff] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (!data?.to) return;
      // Update the time difference every second
      const newTimeDiff = formatDistanceToNow(new Date(data?.to), {
        addSuffix: true,
      });
      setTimeDiff(newTimeDiff);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [data?.to]);

  if (isLoading || !data) return null;
  return (
    <Container>
      <Header>
        <TitleRow>
          <FiCheckCircle size={70} color='#4caf50' />
          <Typography variant='h6' fontWeight={'bold'}>
            {data?.title || 'WE PRICE MATCH'}
          </Typography>
        </TitleRow>
        {data?.displayTimer && (
          <Typography variant='body2' fontWeight={'bold'} color={'purple'}>
            {`Expires ${timeDiff}`}
          </Typography>
        )}
      </Header>

      <Typography variant='subtitle1' color={'GrayText'}>
        {data?.summery ||
          `You can claim a refund of the difference in price, if you find a similar
        offer on another site at a lower price.
         `}
      </Typography>
      <Button
        variant='text'
        color='info'
        onClick={() => setDisplayContent(true)}
      >
        READ MORE
      </Button>
      <SlideModal
        title={data?.title}
        open={displayContent}
        setOpen={setDisplayContent}
      >
        <Typography variant='body2' color={'GrayText'}>
          {data?.content ||
            `You can claim a refund of the difference in price, if you find a similar
        offer on another site at a lower price.
        To claim a refund, you must provide evidence of the lower price within 7 days of
        your purchase. The lower price must be available on the same day you make your
        claim. The lower price must be available to the general public and must be in the
        same currency as your original purchase. The lower price must be for the same
        product and the same quantity. The lower price must be available for the same
        delivery option as your original purchase. The lower price must be available from a
        retailer that is based in the same country as your original purchase. The lower
        price must be available from a retailer that is based in the same country as your
        original purchase. The lower price must be available from a retailer that is based
        in the same country as your original purchase. The lower price must be available
        from a retailer that is based in the same country as your original purchase.
         `}
        </Typography>
        <Button
          sx={{ marginTop: 2 }}
          color='success'
          fullWidth
          onClick={() => setDisplayContent(false)}
        >
          DONE
        </Button>
      </SlideModal>
    </Container>
  );
}
