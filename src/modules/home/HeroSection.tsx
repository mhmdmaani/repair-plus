import { Container, Typography, keyframes, styled } from '@mui/material';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { MdOutlineDoubleArrow } from 'react-icons/md';

const MainContainer = styled('div')`
  width: 100%;
  height: calc(100vh - 160px);
  position: relative;
  overflow: hidden;
  background: transparent;
`;

const ContentContainer = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Title = styled(Typography)`
  color: ${(props) => props.theme.palette.common.white};
  font-size: 4rem;
  font-weight: bold;
  @media (max-width: 1200px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
const Content = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 220px);
`;

const animateLargeText = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300%);
  }
`;
const LargeText = styled('div')`
  font-size: 20vw;
  color: ${(props) => props.theme.palette.common.white};
  position: absolute;
  fond-weight: bolder;
  opacity: 0.4;
  bottom: 0px;
  animation: ${animateLargeText} 5s infinite;
  z-index: 1;
`;

const Description = styled(Typography)`
  color: ${(props) => props.theme.palette.common.white};
  font-size: 1.5rem;
  margin-top: 5px;
`;
const CustomButton = styled(Link)`
  height: 50px;
  width: 250px;
  border-radius: 25px;
  text-decoration: none;
  margin-top: 20px;
  padding: 0 10px;
  position: relative;
  background: #d42b22;
  border: 2px solid ${(props) => props.theme.palette.common.white};
  color: ${(props) => props.theme.palette.common.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
  gap: 10px;
  transition: all 0.5s ease-in-out;
  z-index: 1;
  overflow: hidden;
  :before {
    content: '';
    position: absolute;
    background: ${(props) => props.theme.palette.common.white};
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translateX(-100%);
    transform-origin: 0 50%;
    transition: transform 0.3s;
  }
  :hover:before {
    transform: translateX(0);
  }
  :hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const CustomVideo = styled('video')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export default function HeroSection() {
  return (
    <MainContainer>
      <LargeText>
        <img src='nq.png' />
      </LargeText>

      <CustomVideo autoPlay playsInline muted loop poster='./videoPoster.png'>
        <source src='homeVideo.mp4' type='video/mp4' />
        Your browser does not support HTML5 video.
      </CustomVideo>

      <ContentContainer data-aos='fade'>
        <Container>
          <Content data-aos='fade-zoom-in'>
            <Title variant='h1' fontWeight={'semi-bold'}>
              Repair Plus
            </Title>
            <Title variant='h1' fontWeight={'semi-bold'}>
              Your One-Stop Solution for All Electronic Repairs
            </Title>

            <CustomButton href={'/quote'}>
              <Typography fontWeight={'bold'}>Get Quote Now</Typography>
              <MdOutlineDoubleArrow />
            </CustomButton>
          </Content>
        </Container>
      </ContentContainer>
    </MainContainer>
  );
}
