import React from 'react';
import { BackgroundGradient } from './ui/BackgroundGradient';
import { LightingCard } from './LightingCard';
import { ContactForm } from './ContactForm';
import FadeInUp from './ui/FadeInUp';
import { Vortex } from './ui/Vortex';
export default function About() {
  return (
    <Vortex
      backgroundColor='transparent'
      className='flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full'
    >
      <FadeInUp>
        <div
          id='about'
          className='relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5'
        >
          <Vortex
            backgroundColor='transparent'
            className='flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full'
          >
            <div className='max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center'>
              <div className='relative group block p-2'>
                <div className='w-52 h-52 rounded-full flex justify-center items-center'>
                  <div className='w-44 h-44 bg-black rounded-full overflow-hidden flex justify-center items-center'>
                    <img src='./myImage.png' alt='Profile Image' />
                  </div>
                </div>
              </div>
              <div className='px-8 py-10 lg:py-20'>
                <h1 className='text-4xl lg:text-5xl font-bold'>
                  About
                  <span className='text-purple-500'> Me</span>
                </h1>
              </div>
            </div>
          </Vortex>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
            <div className='relative group block p-6 h-full w-full border-4 border-purple rounded-lg'>
              <ContactForm />
            </div>

            <div className='relative group block p-6 h-full w-full  border-4 border-purple rounded-lg'>
              <p className='text-2xl font-bold mb-6'>Summary</p>
              <ul className='list-disc list-inside gap-3'>
                <li className='mb-4'>
                  Senior Full Stack Developer with extensive expertise across
                  various programming languages and frameworks.
                </li>
                <li className='mb-4'>
                  +8 Years of In-depth Experience in developing robust web and
                  mobile applications.
                </li>
                <li className='mb-4'>
                  Proficient in JavaScript, TypeScript, ReactJS, NextJS, React
                  Native, NodeJS, NestJS, AWS Services including Lambda and
                  Serverless, Python, Java, and more.
                </li>
                <li className='mb-4'>
                  Innovative Problem Solver Adept at addressing complex
                  challenges with scalable solutions.
                </li>
                <li className='mb-4'>
                  Broad Technical Skillset emonstrates a strong foundation in
                  both front end and back end development.
                </li>
                <li className='mb-4'>
                  ommitment to Excellence Continuously seeks to improve
                  processes and technologies for optimal results.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </FadeInUp>
    </Vortex>
  );
}
