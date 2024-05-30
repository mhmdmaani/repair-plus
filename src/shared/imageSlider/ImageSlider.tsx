'use client';
import { styled } from '@mui/material';
import { useEffect, useState } from 'react';

const Container = styled('div')`
  position: relative;
  overflow: hidden;
  min-height: 300px;
  width: 100%;
`;

const SlidesRow = styled('div')<{ index: number; total: number }>`
  width: ${(props) => props.total * 100}%;
  height: 100%;
  display: flex;
  align-items: center;
  transition: transform 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-${(props) => props.index * 100}%);
`;
const Slide = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;
const SlideImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  // run the slider every 3 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <Container>
      <SlidesRow index={index} total={images.length}>
        {images.map((image, index) => (
          <Slide key={index}>
            <SlideImage src={image} alt={image} />
          </Slide>
        ))}
      </SlidesRow>
    </Container>
  );
};
