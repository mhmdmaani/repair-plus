'use client';
import React from 'react';
import { IconAppWindow } from '@tabler/icons-react';
import Image from 'next/image';
import { BackgroundGradient } from './ui/BackgroundGradient';

export function LightingCard({
  title,
  position,
  overview,
  dates,
  image,
  technologies,
  location,
}: {
  title: string;
  image: string;
  overview: string;
  position: string;
  dates: string;
  technologies: string[];
  location: string;
}) {
  return (
    <div>
      <BackgroundGradient className='rounded-[22px] w-full p-4 sm:p-10 bg-white dark:bg-zinc-900 group'>
        <div className='w-36 h-40 justify-center items-center flex mx-auto'>
          <img
            src={image}
            alt='jordans'
            className='w-36 h-38 object-cover rounded-lg mx-auto group-hover:scale-110 group-hover:rotate-10 transition-transform duration-300 ease-in-out'
          />
        </div>
        <p className='text-base text-center sm:text-l text-black mt-4 mb-1 dark:text-neutral-200'>
          {title}
        </p>
        <p className='text-base text-center font-bold sm:text-xl text-black mt-1 mb-2 dark:text-neutral-200'>
          {position}
        </p>
        <div className='flex justify-between items-center my-2'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {dates}
          </p>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {location}
          </p>
        </div>

        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          {overview}
        </p>
        <div className='flex flex-wrap justify-center mt-4'>
          {technologies.map((tech, index) => (
            <div
              key={index}
              className='text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-full px-2 py-1 mr-2 mb-2'
            >
              {tech}
            </div>
          ))}
        </div>
      </BackgroundGradient>
    </div>
  );
}
