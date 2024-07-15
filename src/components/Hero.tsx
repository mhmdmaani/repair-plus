import { FaLocationArrow } from 'react-icons/fa6';

import MagicButton from './MagicButton';
import { Spotlight } from './ui/Spotlight';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import { BackgroundBeams } from './ui/BackgroundBeam';
import HeroSection from '@/modules/home/HeroSection';
import { styled } from '@mui/material';
import Link from 'next/link';

const CustomVideo = styled('video')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Hero = () => {
  return (
    <div className='pb-20 relative flex justify-center items-center h-screen'>
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div className='absolute top-0 left-0 h-screen w-full z-0'>
        <CustomVideo autoPlay playsInline muted loop poster='./videoPoster.png'>
          <source src='/homeVideo.mp4' type='video/mp4' />
          Your browser does not support HTML5 video.
        </CustomVideo>
      </div>

      <div>
        <Spotlight
          className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen z-30'
          fill='white'
        />
        <Spotlight
          className='h-[80vh] w-[50vw] top-10 left-full z-30'
          fill='purple'
        />
        <Spotlight
          className='left-80 top-28 h-[80vh] w-[50vw] z-30'
          fill='blue'
        />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className='h-screen w-full dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center z-20'
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-30'
        />
      </div>

      <div className=' h-full flex justify-center relative my-20 z-30'>
        <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words='  Repair Plus'
            className='text-center text-[30px] md:text-5xl lg:text-6xl'
          />

          <TextGenerateEffect
            words=' Your One-Stop Solution for All Electronic Devices'
            className='text-center text-2 md:text-1xl lg:text-2xl'
          />
          <Link href='/fix/categories' download>
            <MagicButton
              title='Explore Repairs'
              icon={<FaLocationArrow />}
              position='right'
            />
          </Link>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Hero;
