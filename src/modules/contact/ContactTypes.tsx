import { useSettings } from '@/hooks/useSettings';
import { Grid, keyframes, styled, useTheme } from '@mui/material';
import React from 'react';
import { BiSolidComment } from 'react-icons/bi';
import { BsPhoneFill, BsWhatsapp } from 'react-icons/bs';

const RingAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(5deg) scale(1.1);
  }
   50% {
    transform: rotate(-10deg) scale(1.1);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
`;

const MainContainer = styled('div')`
  padding: 60px 0;
`;

const SectionContainer = styled('div')<{
  color: string;
}>`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 40px;
  cursor: pointer;
  border: 2px solid ${(props) => props.color || 'green'};
  :hover {
    animation: ${RingAnimation} 0.5s;
  }
`;

const SectionTitle = styled('h2')``;

const IconContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
`;

const UnstyledLink = styled('a')`
  text-decoration: none;
  color: inherit;
`;
export default function ContactTypes() {
  const theme = useTheme();
  const { data } = useSettings();
  return (
    <MainContainer>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4} lg={4}>
          <UnstyledLink href={`https://wa.me/${data?.contactPhone}`}>
            <SectionContainer color='green'>
              <IconContainer>
                <BsWhatsapp color={theme.palette.success.main} />
              </IconContainer>
              Whatsapp ({data?.contactPhone})
            </SectionContainer>
          </UnstyledLink>
        </Grid>

        <Grid item sm={12} md={4} lg={4}>
          <UnstyledLink href={`tel:${data?.contactPhone}`}>
            <SectionContainer color={theme.palette.error.main}>
              <IconContainer>
                <BsPhoneFill color={theme.palette.error.main} />
              </IconContainer>
              Call({data?.contactPhone})
            </SectionContainer>
          </UnstyledLink>
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <UnstyledLink href={`sms:${data?.contactPhone}`}>
            <SectionContainer color={theme.palette.info.main}>
              <IconContainer>
                <BiSolidComment color={theme.palette.info.main} />
              </IconContainer>
              SMS({data?.contactPhone})
            </SectionContainer>
          </UnstyledLink>
        </Grid>
      </Grid>
    </MainContainer>
  );
}
