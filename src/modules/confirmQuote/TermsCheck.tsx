import { useTerm } from '@/hooks/admin/useTerm';
import SlideModal from '@/shared/modals/SlideModal';
import {
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';

const Container = styled('div')``;

const CheckboxContainer = styled('div')``;

const Content = styled('div')`
  min-height: 300px;
  min-width: 300px;
  max-height: 500px;
  overflow-y: auto;
  width: 500px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

function HtmlContent({ html }: { html: string }) {
  return <Content dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function TermsCheck({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  const [displayTerms, setDisplayTerms] = useState(false);
  const { data, isLoading } = useTerm();
  return (
    <Container>
      <FormControlLabel
        control={
          <Checkbox defaultChecked checked={checked} onChange={onChange} />
        }
        label={
          <CheckboxContainer>
            <Typography variant='body2'>
              I agree to the{' '}
              <Link onClick={() => setDisplayTerms(true)}>
                Terms of Service
              </Link>{' '}
              and consent to receive emails and updates and special offers.
            </Typography>
          </CheckboxContainer>
        }
      />

      <SlideModal
        fullScreen
        open={displayTerms}
        setOpen={setDisplayTerms}
        title='Terms of Service'
      >
        <HtmlContent html={data?.content} />
      </SlideModal>
    </Container>
  );
}
