import React from 'react';
import { BackgroundGradientAnimation } from '@/components/ui/GradientBg';
import { motion } from 'framer-motion';
import { LightingCard } from './LightingCard';
import FadeInUp from './ui/FadeInUp';

export default function Projects() {
  return (
    <div id='projects' className={'h-auto relative w-full mb-20'}>
      <FadeInUp>
        <div w-full h-full>
          <h1 className='heading'>
            Our Projects <span className='text-purple'>for Development</span>
          </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 py-10'>
          <LightingCard
            image={'./NationalLogo.png'}
            title='National Quick Courier'
            position={'Full Stack Developer'}
            dates={'04/02/2024 - 10/3/2024'}
            overview={`Developed a comprehensive platform for booking couriers, enabling users to schedule, track, and manage courier services efficiently.`}
            technologies={[
              'Next JS',
              'React JS',
              'Node JS',
              'PostgresSQL',
              'Prisma',
              'Styled-Components',
              'Vercel',
              'Stripe',
            ]}
            location='United Kingdom'
          />

          <LightingCard
            image={'./AmoajiLogo.png'}
            title='Amoaji'
            position={'Free Lancing Developer'}
            dates={'12/03/2024 - 13/5/2024'}
            overview={
              'Developed a mobile application to facilitate the booking of boats, providing users with a seamless experience for searching, and reserving marine excursions.'
            }
            technologies={[
              'React Native',
              'React JS',
              'Nest JS',
              'Prisma',
              'PostgrsSQL',
              'Google Maps API',
              'Stripe',
            ]}
            location='United Arab Emirates'
          />

          <LightingCard
            image={'./FinstreetLogo.svg'}
            title='Finstreet'
            position={'Lead Full Stack Developer'}
            dates={'07/11/2022 - 14/12/2023'}
            overview={
              'Finstreet is a financial services company that offers a range of financial products and services.I have worked on custom trading platform and on services.'
            }
            technologies={[
              'Next JS',
              'React JS',
              'Node JS',
              'Nest JS',
              'MongoDB',
              'PostgresSQL',
              'Styled-Components',
              'Kafka',
              'MicroServices',
              'AWS',
              'Docker',
              'Storybook',
            ]}
            location='United Arab Emirates'
          />
          <LightingCard
            image={'./GoozoLogo.jpeg'}
            title='Goozo'
            position={'Full Stack Developer'}
            dates={'2015 - 2022'}
            overview={`The HR platform automates HR tasks to boost profitability, proposing timely measures for the right groups, leading to increased profit margins.`}
            technologies={[
              'Next JS',
              'React JS',
              'Node JS',
              'Nest JS',
              'MongoDB',
              'PostgresSQL',
              'Tailwind CSS',
              'MicroServices',
              'AWS',
              'Docker',
            ]}
            location='Sweden'
          />
        </div>
      </FadeInUp>
    </div>
  );
}
