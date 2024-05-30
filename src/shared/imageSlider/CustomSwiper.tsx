import { styled } from '@mui/material';
import React from 'react';
const Container = styled('div')`
  width: 100%;
  position: relative;
`;

const ScrolledSection = styled('div')<{
  index: number;
  itemsLength: number;
}>`
  width: ${({ itemsLength }: { itemsLength: number }) => itemsLength * 100}%;
  transition: transform 1s ease;
  transform: translate3d(
    ${({ itemsLength, index }: { itemsLength: number; index: number }) =>
      (-index * 100) / itemsLength}%,
    0,
    0
  );

  flex-direction: row;
`;
const Slide = styled('div')<{
  index: number;
  currentIndex: number;
}>`
  width: 100%;
  padding: 10px;
  visibility: ${({
    index,
    currentIndex,
  }: {
    index: number;
    currentIndex: number;
  }) => (index === currentIndex ? 'visible' : 'hidden')};
  opacity: ${(props: { index: number; currentIndex: number }) =>
    props.index === props.currentIndex ? 1 : 0};
  transition: all 0.5s ease-in-out;
  transform: scale(
    ${(props: { index: number; currentIndex: number }) =>
      props.index === props.currentIndex ? 1 : 0.8}
  );
`;

export default function CustomSwiper({
  children,
  currentIndex,
  setCurrentIndex,
}: {
  children: any[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) {
  const scrolledRef = React.useRef(null);

  return (
    <Container>
      <ScrolledSection
        ref={scrolledRef}
        itemsLength={children.length}
        index={currentIndex}
      >
        {children.map((slide, index) => (
          <Slide key={index} index={index} currentIndex={currentIndex}>
            {slide}
          </Slide>
        ))}
      </ScrolledSection>
    </Container>
  );
}
