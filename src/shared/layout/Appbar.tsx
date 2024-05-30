'use client';
import { useStateValue } from '@/providers/StateContext';
import {
  ClickAwayListener,
  Container,
  Typography,
  styled,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import React from 'react';
import { FiMenu, FiMoon } from 'react-icons/fi';
import { IoSunny } from 'react-icons/io5';

const Logo = styled('img')`
  height: 50px;
  width: auto;
  @media (max-width: 768px) {
    height: 30px;
  }
`;
const Content = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: ${(props) => props.theme.palette.primary.contrastText};
`;
const MainContainer = styled('div')<{
  isFixed?: boolean;
  isTransparent?: boolean;
}>`
  padding: 13px 0;
  width: 100%;
  background: ${(props) =>
    props.isTransparent
      ? 'transparent'
      : props.theme.palette.mode === 'dark'
      ? props.theme.palette.common.black
      : props.theme.palette.common.white};
  border-bottom: 1px solid
    ${(props) =>
      props.isTransparent ? 'transparent' : props.theme.palette.grey[300]};
  position: ${(props) => (props.isFixed ? 'absolute' : 'relative')};
  top: 0;
  z-index: 100;
  @media (max-width: 768px) {
    padding: 0;
  }
`;
const LinksContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: row;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const LinkText = styled(Typography)`
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  color: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.common.white
      : props.theme.palette.common.black};
  :hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const MobileIcon = styled(IconButton)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
`;

const MobileMenu = styled('div')<{
  open?: boolean;
}>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    position: absolute;
    z-index: 20;
    top: 100%;
    transform: ${(props) => (props.open ? 'scaleY(1)' : 'scaleY(0)')};
    transform-origin: top;
    transition: 0.5s ease-in-out;
    left: 0;
    width: 100%;
    background: ${(props) =>
      props.theme.palette.mode === 'dark'
        ? props.theme.palette.common.black
        : props.theme.palette.common.white};
  }
`;

export default function Appbar({
  isFixed,
  isTransparent,
}: {
  isFixed?: boolean;
  isTransparent?: boolean;
}) {
  const { state, dispatch } = useStateValue();
  const { mode } = state;
  const [open, setOpen] = React.useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <MainContainer isFixed={isFixed} isTransparent={isTransparent}>
        <Container>
          <Content>
            <Logo src={mode === 'dark' ? 'nq.png' : 'NQC.png'} />

            <LinksContainer>
              <CustomLink href='/'>
                <LinkText variant='body2'>Home</LinkText>
              </CustomLink>
              <CustomLink href='/about'>
                <LinkText variant='body2'>About</LinkText>
              </CustomLink>
              <CustomLink href='/fleets'>
                <LinkText variant='body2'>Our Fleets</LinkText>
              </CustomLink>
              <CustomLink href='/contact'>
                <LinkText variant='body2'>Contact</LinkText>
              </CustomLink>

              <CustomLink href='/terms'>
                <LinkText variant='body2'>Terms</LinkText>
              </CustomLink>
              <CustomLink href='/privacy'>
                <LinkText variant='body2'>Privacy</LinkText>
              </CustomLink>

              <IconButton
                onClick={() =>
                  dispatch({
                    type: 'SET_MODE',
                    payload: mode === 'dark' ? 'light' : 'dark',
                  })
                }
              >
                {mode === 'dark' ? <FiMoon /> : <IoSunny />}
              </IconButton>
            </LinksContainer>
            <MobileIcon onClick={() => setOpen(!open)}>
              <FiMenu />
            </MobileIcon>
          </Content>
        </Container>
        <MobileMenu open={open}>
          <CustomLink href='/'>
            <LinkText variant='body2'>Home</LinkText>
          </CustomLink>
          <CustomLink href='/about'>
            <LinkText variant='body2'>About</LinkText>
          </CustomLink>
          <CustomLink href='/fleets'>
            <LinkText variant='body2'>Our Fleets</LinkText>
          </CustomLink>
          <CustomLink href='/contact'>
            <LinkText variant='body2'> Contact</LinkText>
          </CustomLink>

          <CustomLink href='/terms'>
            <LinkText variant='body2'>Terms</LinkText>
          </CustomLink>
          <CustomLink href='/privacy'>
            <LinkText variant='body2'>Privacy</LinkText>
          </CustomLink>
          <IconButton
            onClick={() =>
              dispatch({
                type: 'SET_MODE',
                payload: mode === 'dark' ? 'light' : 'dark',
              })
            }
          >
            {mode === 'dark' ? <FiMoon /> : <IoSunny />}
          </IconButton>
        </MobileMenu>
      </MainContainer>
    </ClickAwayListener>
  );
}
