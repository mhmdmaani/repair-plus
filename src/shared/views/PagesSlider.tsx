import { styled } from '@mui/material';
import React from 'react';

const MainContainer = styled('div')<{
  height?: string;
}>`
  width: 100%;
  height: ${(props) => props.height || '100vh'};
  overflow: hidden;
`;
const Slider = styled('div')<{ length: number; currentPage: number }>`
  width: ${(props) => props.length * 100}vw;
  height: 100%;
  display: flex;
  background: ${(props) => props.theme.palette.primary.main};
  transform: translateX(-${(props) => props.currentPage * 100}vw);
  transition: transform 0.5s;
`;

const SlideItem = styled('div')<{ isCurrent: boolean }>`
  width: 100vw;
  height: 100%;
  overflow-y: auto;
  opacity: ${(props) => (props.isCurrent ? 1 : 0)};
  transform: ${(props) => (props.isCurrent ? 'scale(1)' : 'scale(0)')};
  transition: opacity 0.5s, transform 0.5s;
  background: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.common.black
      : props.theme.palette.common.white};
  position: relative;
`;
export default function PagesSlider({
  children,
  currentPage,
  setCurrentPage,
  height,
}: {
  children: React.ReactNode;
  currentPage: number;
  height?: string;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <MainContainer height={height}>
      <Slider length={React.Children.count(children)} currentPage={currentPage}>
        {React.Children.map(children, (child, index) => {
          return (
            <SlideItem isCurrent={index === currentPage}>
              {React.cloneElement(child as React.ReactElement, {
                setCurrentPage,
              })}
            </SlideItem>
          );
        })}
      </Slider>
    </MainContainer>
  );
}
