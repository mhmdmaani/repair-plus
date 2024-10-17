import { Category } from 'prisma/prisma-client';
import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CustomCard = styled(Card)`
  background: rgba(17, 25, 40, 1);
  border-width: 2px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    border-color: #cbacf9;
  }
  :hover img {
    transform: scale(1.1);
  }
`;

const CustomImage = styled('img')`
  transition: all 0.5s ease-in-out;
`;

export default function CategoryItem({ category }: { category: Category }) {
  return (
    <UnstyledLink href={`/fix/category/${category.id}`}>
      <CustomCard
        sx={{
          height: '100%',
          cursor: 'pointer',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <CardMedia
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!category.image ? (
            <Avatar
              style={{
                width: 150,
                height: 150,
              }}
            >
              <Typography textAlign='center' variant='h4' fontWeight='bold'>
                {category?.name.charAt(0).toUpperCase()}
              </Typography>
            </Avatar>
          ) : (
            <CustomImage
              src={category.image || ''}
              alt={category.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </CardMedia>
        <CardContent>
          <Typography textAlign='center' variant='h6' fontWeight={'bold'}>
            {category.name}
          </Typography>
        </CardContent>
      </CustomCard>
    </UnstyledLink>
  );
}
