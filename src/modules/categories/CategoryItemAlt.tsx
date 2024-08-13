import React from 'react';
import Link from 'next/link';
import { Typography, Avatar } from '@mui/material';
import { FiChevronRight } from 'react-icons/fi';
import { Category } from 'prisma/prisma-client';

export default function CategoryItemAlt({ category }: { category: Category }) {
  return (
    <Link key={category?.id} href={`/fix/category/${category?.id}`}>
      <div
        className={` h-72 group p-4 flex row w-full rounded-xl  bg-black-100 cursor-pointer border-2
                              group-hover:animate-pulse transition duration-300 ease-in-out
                `}
      >
        <div className='flex justify-center w-1/2 p-3 group-hover:animate-pulse transition duration-300 ease-in-out items-center'>
          {category?.image ? (
            <img src={category?.image || ''} className='w-full h-auto' />
          ) : (
            <Avatar
              style={{
                width: 150,
                height: 150,
              }}
            >
              <Typography variant='h4' fontWeight='bold'>
                {category?.name.charAt(0).toUpperCase()}
              </Typography>
            </Avatar>
          )}
        </div>
        <div className='flex  justify-between items-center w-2/3'>
          <div className='flex flex-col w-2/3 pt-3 group-hover:animate-bounce'>
            <h1 className='text-3xl font-bold'>{category?.name}</h1>
          </div>
          <div className='p-2 group-hover:animate-pulse group-hover:-translate-x-1 transition duration-300 ease-in-out'>
            <FiChevronRight size={30} />
          </div>
        </div>
      </div>
    </Link>
  );
}
