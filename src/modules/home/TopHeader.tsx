'use client';
import { Button, Container, styled } from '@mui/material';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import { FaInstagram, FaLinkedinIn, FaPhone } from 'react-icons/fa6';

const MainContainer = styled('div')`
  background: #d42b22;
`;
const HeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: ${(props) => props.theme.palette.primary.contrastText};
`;

const SocialContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled('img')`
  height: 50px;
  width: auto;
`;

const SocialLink = styled('a')`
  text-decoration: none;
  color: ${(props) => props.theme.palette.primary.contrastText};
  cursor: pointer;
`;

const PhoneButton = styled(Button)`
  height: 50px;
  padding: 0 10px;
  position: relative;
  background: transparent;
  border: 2px solid ${(props) => props.theme.palette.common.white};
  color: ${(props) => props.theme.palette.common.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  transition: all 0.5s ease-in-out;
  z-index: 1;
  overflow: hidden;
  :before {
    content: '';
    position: absolute;
    background: ${(props) => props.theme.palette.common.white};
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translateX(-100%);
    transform-origin: 0 50%;
    transition: transform 0.3s;
  }
  :hover:before {
    transform: translateX(0);
  }
  :hover {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export default function TopHeader() {
  return (
    <MainContainer>
      <Container>
        <HeaderContainer>
          <PhoneButton href={`tel:+447888899997`}>
            <FaPhone /> 07 8888 9999 7
          </PhoneButton>

          <SocialContainer>
            <SocialLink>
              <FaFacebookF />
            </SocialLink>
            <SocialLink>
              <FaInstagram />
            </SocialLink>
            <SocialLink>
              <FaLinkedinIn />
            </SocialLink>

            <SocialLink>
              <FaYoutube />
            </SocialLink>
          </SocialContainer>
        </HeaderContainer>
      </Container>
    </MainContainer>
  );
}
